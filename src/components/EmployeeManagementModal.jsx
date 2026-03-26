import { useState } from 'react';
import ExcelJS from 'exceljs';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Database02Icon,
  GoogleSheetIcon,
  Image01Icon,
  Upload01Icon,
  UserIcon,
  Delete02Icon,
  PlusSignIcon,
  Download01Icon,
} from '@hugeicons/core-free-icons/index';
import {
  TABLE_FIELDS,
  downloadTemplate,
  importEmployeesFromExcel,
  createNewEmployee,
  VERIFICATION_SHEET_NAME,
} from '@/lib/excelUtils';

export function EmployeeManagementModal({
  isOpen,
  onClose,
  employees = [],
  onEmployeesChange,
  onImagesChange,
}) {
  const [activeTab, setActiveTab] = useState('employees');
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [editedEmployees, setEditedEmployees] = useState(employees);
  const [selectedEmployees, setSelectedEmployees] = useState(new Set());
  const [images, setImages] = useState({});
  const [imageErrors, setImageErrors] = useState([]);
  const [isImporting, setIsImporting] = useState(false);

  const VALID_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'];
  const ID_PATTERN = /^\d{1,7}$/;

  // Validate image files
  const validateAndProcessImages = (files) => {
    const errors = [];
    const processedImages = { ...images };

    for (let file of files) {
      const nameParts = file.name.split('.');
      const extension = nameParts[nameParts.length - 1].toLowerCase();
      const nameWithoutExt = nameParts.slice(0, -1).join('.');

      // Validate extension
      if (!VALID_IMAGE_EXTENSIONS.includes(extension)) {
        errors.push(`${file.name}: Định dạng không hợp lệ (chỉ nhận ${VALID_IMAGE_EXTENSIONS.join(', ')})`);
        continue;
      }

      // Validate name (0-9, length 1-7)
      if (!ID_PATTERN.test(nameWithoutExt)) {
        errors.push(`${file.name}: Tên file phải là số (0-9), độ dài 1-7 chữ số`);
        continue;
      }

      // Pad ID to 7 digits
      const paddedID = nameWithoutExt.padStart(7, '0');

      // Read image and store
      const reader = new FileReader();
      reader.onload = (e) => {
        processedImages[paddedID] = {
          src: e.target.result,
          name: file.name
        };
        setImages(processedImages);
        if (onImagesChange) {
          onImagesChange(processedImages);
        }
      };
      reader.readAsDataURL(file);
    }

    if (errors.length > 0) {
      setImageErrors(errors);
    }
  };

  const handleImageInputChange = (e) => {
    const files = Array.from(e.target.files || []);
    validateAndProcessImages(files);
  };

  const handleDeleteImage = (imageKey) => {
    const updatedImages = { ...images };
    delete updatedImages[imageKey];
    setImages(updatedImages);
    if (onImagesChange) {
      onImagesChange(updatedImages);
    }
  };

  const handleCellClick = (index, field, value) => {
    setEditingCell({ index, field });
    setEditValue(value);
  };

  const handleCellBlur = (index, field) => {
    if (
      editingCell &&
      editingCell.index === index &&
      editingCell.field === field
    ) {
      const updatedEmployees = [...editedEmployees];
      updatedEmployees[index] = {
        ...updatedEmployees[index],
        [field]: editValue,
      };
      setEditedEmployees(updatedEmployees);
      if (onEmployeesChange) {
        onEmployeesChange(updatedEmployees);
      }
      setEditingCell(null);
    }
  };

  const handleDeleteEmployee = (index) => {
    const updatedEmployees = editedEmployees.filter((_, i) => i !== index);
    setEditedEmployees(updatedEmployees);
    if (onEmployeesChange) {
      onEmployeesChange(updatedEmployees);
    }
  };

  const handleAddEmployee = () => {
    const newEmployee = createNewEmployee();
    const updatedEmployees = [...editedEmployees, newEmployee];
    setEditedEmployees(updatedEmployees);
    if (onEmployeesChange) {
      onEmployeesChange(updatedEmployees);
    }
  };

  const handleKeyDown = (e, index, field, fields) => {
    if (e.key === 'Enter') {
      handleCellBlur(index, field);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      handleCellBlur(index, field);

      const currentFieldIndex = fields.indexOf(field);

      if (e.shiftKey) {
        // Shift+Tab - go to previous field
        const prevField = fields[currentFieldIndex - 1];
        if (prevField) {
          setTimeout(() => {
            setEditingCell({ index, field: prevField });
            setEditValue(editedEmployees[index][prevField] || '');
          }, 0);
        }
      } else {
        // Tab - go to next field
        const nextField = fields[currentFieldIndex + 1];
        if (nextField) {
          setTimeout(() => {
            setEditingCell({ index, field: nextField });
            setEditValue(editedEmployees[index][nextField] || '');
          }, 0);
        }
      }
    }
  };

  const handleSelectEmployee = (index) => {
    const newSelected = new Set(selectedEmployees);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedEmployees(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedEmployees.size === editedEmployees.length) {
      setSelectedEmployees(new Set());
    } else {
      const allIndices = new Set(editedEmployees.map((_, i) => i));
      setSelectedEmployees(allIndices);
    }
  };

  const handleDeleteSelected = () => {
    const updatedEmployees = editedEmployees.filter(
      (_, i) => !selectedEmployees.has(i)
    );
    setEditedEmployees(updatedEmployees);
    setSelectedEmployees(new Set());
    if (onEmployeesChange) {
      onEmployeesChange(updatedEmployees);
    }
  };

  const tableFields = TABLE_FIELDS;

  // Download Excel template
  const handleDownloadTemplate = async () => {
    await downloadTemplate();
  };

  // Import Excel file
  const handleImportFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);

    try {
      // Read file with ExcelJS to verify sheet
      const buffer = await file.arrayBuffer();
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(buffer);

      // Check for verification sheet
      const verificationSheet = workbook.worksheets.find(
        (sheet) =>
          sheet.name === VERIFICATION_SHEET_NAME && sheet.state === 'veryHidden'
      );

      if (!verificationSheet) {
        toast.error('File không hợp lệ', {
          description: 'Vui lòng sử dụng template chính thức từ hệ thống.'
        });
        setIsImporting(false);
        return;
      }

      // Import employees
      const importedEmployees = await importEmployeesFromExcel(file);
      console.log(importedEmployees)
      setEditedEmployees(importedEmployees);
      if (onEmployeesChange) {
        onEmployeesChange(importedEmployees);
      }
      toast.success('Nhập thành công', {
        description: `${importedEmployees.length} nhân viên đã được nhập.`
      });

      // Reset input
      e.target.value = '';
    } catch (error) {
      toast.error('Lỗi khi nhập file', {
        description: error.message || 'Vui lòng thử lại.'
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        closeOnClickOutside={false}
        className='max-w-[90vw]! h-[90vh] flex flex-col p-0 w-330 gap-0'
      >
        <DialogHeader className='p-4 border-b gap-0'>
          <DialogTitle>
            <div className='flex items-start gap-1'>
              <HugeiconsIcon icon={Database02Icon} className='size-4' />
              Quản lý dữ liệu
            </div>
          </DialogTitle>
          <DialogDescription className='text-xs text-muted-foreground'>
            Quản lý danh sách nhân viên, hình ảnh và nhập dữ liệu từ tệp Excel.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className='flex-1 flex flex-col p-4 pt-0 overflow-hidden'
        >
          <TabsList className='flex bg-transparent h-auto p-0 w-auto justify-start gap-2 mb-0'>
            <TabsTrigger
              value='employees'
              className='flex items-center gap-1 bg-transparent data-[state=active]:bg-transparent shadow-none! border-b-2 border-transparent data-[state=active]:border-primary rounded-none pb-1.5 font-semibold! px-1! text-xs'
              id="tab-employees"
            >
              <HugeiconsIcon icon={UserIcon} className='size-4' />
              <span>Danh sách</span>
            </TabsTrigger>
            <TabsTrigger
              value='images'
              className='flex items-center gap-1 bg-transparent data-[state=active]:bg-transparent shadow-none! border-b-2 border-transparent data-[state=active]:border-primary rounded-none pb-1.5 font-semibold! px-1! text-xs'
              id="tab-images"
            >
              <HugeiconsIcon icon={Image01Icon} className='size-4' />
              <span>Hình ảnh</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab: Danh sách Nhân viên */}
          <TabsContent
            value='employees'
            className='flex-1 flex flex-col overflow-hidden'
          >
            <div className='flex-1 overflow-hidden border rounded-md bg-background'>
              {editedEmployees && editedEmployees.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className={'sticky top-0 z-50 bg-white'}>
                      <TableHead className='w-12'>
                        <Checkbox
                          checked={
                            selectedEmployees.size === editedEmployees.length &&
                              editedEmployees.length > 0
                              ? true
                              : selectedEmployees.size > 0
                                ? 'indeterminate'
                                : false
                          }
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead className='w-12'>STT</TableHead>
                      <TableHead>MSNV</TableHead>
                      <TableHead>Họ và tên</TableHead>
                      <TableHead>Ngày vào làm</TableHead>
                      <TableHead>Chức vụ</TableHead>
                      <TableHead>Phòng ban</TableHead>
                      <TableHead>Phòng ban (EN)</TableHead>
                      <TableHead>Ngày hết hạn</TableHead>
                      <TableHead>Chức vụ (ENG)</TableHead>
                      <TableHead>Mã xưởng</TableHead>
                      <TableHead>Mã bộ phận trên cấp</TableHead>
                      <TableHead>Mã bộ phận trên cấp (EN)</TableHead>
                      <TableHead className='w-12'>Xóa</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {editedEmployees.map((emp, index) => (
                      <TableRow
                        key={index}
                        className={
                          selectedEmployees.has(index) ? 'bg-muted/50' : ''
                        }
                      >
                        <TableCell className='w-12'>
                          <Checkbox
                            checked={selectedEmployees.has(index)}
                            onCheckedChange={() => handleSelectEmployee(index)}
                          />
                        </TableCell>
                        <TableCell className='font-medium'>
                          {index + 1}
                        </TableCell>
                        <TableCell
                          className='cursor-text hover:bg-muted/50 p-2 relative'
                          onClick={() => handleCellClick(index, 'id', emp.id)}
                        >
                          {editingCell?.index === index &&
                            editingCell?.field === 'id' && (
                              <Input
                                autoFocus
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onBlur={() => handleCellBlur(index, 'id')}
                                onKeyDown={(e) =>
                                  handleKeyDown(e, index, 'id', tableFields)
                                }
                                className='h-6 px-1.5 border py-1 absolute bg-white top-1/2 left-0 right-0 -translate-y-1/2'
                              />
                            )}
                          {emp.id}
                        </TableCell>
                        <TableCell
                          className='cursor-text hover:bg-muted/50 p-2 relative'
                          onClick={() =>
                            handleCellClick(index, 'name', emp.name)
                          }
                        >
                          {editingCell?.index === index &&
                            editingCell?.field === 'name' && (
                              <Input
                                autoFocus
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onBlur={() => handleCellBlur(index, 'name')}
                                onKeyDown={(e) =>
                                  handleKeyDown(e, index, 'name', tableFields)
                                }
                                className='h-6 px-1.5 border py-1 absolute bg-white top-1/2 left-0 right-0 -translate-y-1/2'
                              />
                            )}
                          {emp.name}
                        </TableCell>
                        <TableCell
                          className='cursor-text hover:bg-muted/50 p-2 relative'
                          onClick={() =>
                            handleCellClick(index, 'joinedDate', emp.joinedDate)
                          }
                        >
                          {editingCell?.index === index &&
                            editingCell?.field === 'joinedDate' && (
                              <Input
                                autoFocus
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onBlur={() => handleCellBlur(index, 'joinedDate')}
                                onKeyDown={(e) =>
                                  handleKeyDown(e, index, 'joinedDate', tableFields)
                                }
                                className='h-6 px-1.5 border py-1 absolute bg-white top-1/2 left-0 right-0 -translate-y-1/2'
                              />
                            )}
                          {emp.joinedDate}
                        </TableCell>
                        <TableCell
                          className='cursor-text hover:bg-muted/50 p-2 relative'
                          onClick={() =>
                            handleCellClick(index, 'position', emp.position)
                          }
                        >
                          {editingCell?.index === index &&
                            editingCell?.field === 'position' && (
                              <Input
                                autoFocus
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onBlur={() => handleCellBlur(index, 'position')}
                                onKeyDown={(e) =>
                                  handleKeyDown(
                                    e,
                                    index,
                                    'position',
                                    tableFields
                                  )
                                }
                                className='h-6 px-1.5 border py-1 absolute bg-white top-1/2 left-0 right-0 -translate-y-1/2'
                              />
                            )}
                          {emp.position}
                        </TableCell>
                        <TableCell
                          className='cursor-text hover:bg-muted/50 p-2 relative'
                          onClick={() =>
                            handleCellClick(index, 'department', emp.department)
                          }
                        >
                          {editingCell?.index === index &&
                            editingCell?.field === 'department' && (
                              <Input
                                autoFocus
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onBlur={() =>
                                  handleCellBlur(index, 'department')
                                }
                                onKeyDown={(e) =>
                                  handleKeyDown(
                                    e,
                                    index,
                                    'department',
                                    tableFields
                                  )
                                }
                                className='h-6 px-1.5 border py-1 absolute bg-white top-1/2 left-0 right-0 -translate-y-1/2'
                              />
                            )}
                          {emp.department}
                        </TableCell>
                        <TableCell
                          className='cursor-text hover:bg-muted/50 p-2 relative'
                          onClick={() =>
                            handleCellClick(index, 'departmentEn', emp.departmentEn)
                          }
                        >
                          {editingCell?.index === index &&
                            editingCell?.field === 'departmentEn' && (
                              <Input
                                autoFocus
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onBlur={() =>
                                  handleCellBlur(index, 'departmentEn')
                                }
                                onKeyDown={(e) =>
                                  handleKeyDown(
                                    e,
                                    index,
                                    'departmentEn',
                                    tableFields
                                  )
                                }
                                className='h-6 px-1.5 border py-1 absolute bg-white top-1/2 left-0 right-0 -translate-y-1/2'
                              />
                            )}
                          {emp.departmentEn}
                        </TableCell>
                        <TableCell
                          className='cursor-text hover:bg-muted/50 p-2 relative'
                          onClick={() =>
                            handleCellClick(index, 'validUntil', emp.validUntil)
                          }
                        >
                          {editingCell?.index === index &&
                            editingCell?.field === 'validUntil' && (
                              <Input
                                autoFocus
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onBlur={() => handleCellBlur(index, 'validUntil')}
                                onKeyDown={(e) =>
                                  handleKeyDown(e, index, 'validUntil', tableFields)
                                }
                                className='h-6 px-1.5 border py-1 absolute bg-white top-1/2 left-0 right-0 -translate-y-1/2'
                              />
                            )}
                          {emp.validUntil}
                        </TableCell>
                        <TableCell
                          className='cursor-text hover:bg-muted/50 p-2 relative'
                          onClick={() =>
                            handleCellClick(index, 'positionEn', emp.positionEn)
                          }
                        >
                          {editingCell?.index === index &&
                            editingCell?.field === 'positionEn' && (
                              <Input
                                autoFocus
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onBlur={() => handleCellBlur(index, 'positionEn')}
                                onKeyDown={(e) =>
                                  handleKeyDown(
                                    e,
                                    index,
                                    'positionEn',
                                    tableFields
                                  )
                                }
                                className='h-6 px-1.5 border py-1 absolute bg-white top-1/2 left-0 right-0 -translate-y-1/2'
                              />
                            )}
                          {emp.positionEn}
                        </TableCell>
                        <TableCell
                          className='cursor-text hover:bg-muted/50 p-2 relative'
                          onClick={() =>
                            handleCellClick(index, 'departmentAbbr', emp.departmentAbbr)
                          }
                        >
                          {editingCell?.index === index &&
                            editingCell?.field === 'departmentAbbr' && (
                              <Input
                                autoFocus
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onBlur={() =>
                                  handleCellBlur(index, 'departmentAbbr')
                                }
                                onKeyDown={(e) =>
                                  handleKeyDown(
                                    e,
                                    index,
                                    'departmentAbbr',
                                    tableFields
                                  )
                                }
                                className='h-6 px-1.5 border py-1 absolute bg-white top-1/2 left-0 right-0 -translate-y-1/2'
                              />
                            )}
                          {emp.departmentAbbr}
                        </TableCell>
                        <TableCell
                          className='cursor-text hover:bg-muted/50 p-2 relative'
                          onClick={() =>
                            handleCellClick(index, 'parentDepartmentCode', emp.parentDepartmentCode)
                          }
                        >
                          {editingCell?.index === index &&
                            editingCell?.field === 'parentDepartmentCode' && (
                              <Input
                                autoFocus
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onBlur={() =>
                                  handleCellBlur(index, 'parentDepartmentCode')
                                }
                                onKeyDown={(e) =>
                                  handleKeyDown(
                                    e,
                                    index,
                                    'parentDepartmentCode',
                                    tableFields
                                  )
                                }
                                className='h-6 px-1.5 border py-1 absolute bg-white top-1/2 left-0 right-0 -translate-y-1/2'
                              />
                            )}
                          {emp.parentDepartmentCode}
                        </TableCell>
                        <TableCell
                          className='cursor-text hover:bg-muted/50 p-2 relative'
                          onClick={() =>
                            handleCellClick(index, 'parentDepartmentCodeEn', emp.parentDepartmentCodeEn)
                          }
                        >
                          {editingCell?.index === index &&
                            editingCell?.field === 'parentDepartmentCodeEn' && (
                              <Input
                                autoFocus
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onBlur={() =>
                                  handleCellBlur(index, 'parentDepartmentCodeEn')
                                }
                                onKeyDown={(e) =>
                                  handleKeyDown(
                                    e,
                                    index,
                                    'parentDepartmentCodeEn',
                                    tableFields
                                  )
                                }
                                className='h-6 px-1.5 border py-1 absolute bg-white top-1/2 left-0 right-0 -translate-y-1/2'
                              />
                            )}
                          {emp.parentDepartmentCodeEn}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant='ghost'
                            size='sm'
                            className='h-8 w-8 p-0 text-destructive hover:text-destructive'
                            onClick={() => handleDeleteEmployee(index)}
                          >
                            <HugeiconsIcon
                              icon={Delete02Icon}
                              className='w-4 h-4'
                            />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className='text-center text-muted-foreground h-full flex items-center justify-center'>
                  <div className='flex flex-col items-center gap-4'>
                    <div>
                      <div className='size-12 rounded-full bg-gray-200 flex items-center justify-center'>
                        <HugeiconsIcon
                          icon={UserIcon}
                          className='size-6 mx-auto'
                        />
                      </div>
                    </div>
                    <div>
                      <p className='font-medium'>Chưa có nhân viên nào</p>
                      <div>
                        <Button
                          className='flex-1 h-6 px-2 flex items-center'
                          onClick={handleAddEmployee}
                        >
                          <HugeiconsIcon
                            icon={PlusSignIcon}
                            className='w-4 h-4 mr-0.5'
                          />
                          Thêm nhân viên mới
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className='flex gap-2 mt-2 justify-between'>
              <div className='flex gap-2'>
                <Button
                  className='flex-1 h-6 px-2 flex items-center'
                  onClick={handleAddEmployee}
                  id="btn-add-employee"
                >
                  <HugeiconsIcon
                    icon={PlusSignIcon}
                    className='w-4 h-4 mr-0.5'
                  />
                  Thêm nhân viên mới
                </Button>
                <Button
                  className='flex-1 h-6 px-2 flex items-center text-destructive'
                  variant='destructive'
                  disabled={selectedEmployees.size === 0}
                  onClick={handleDeleteSelected}
                >
                  <HugeiconsIcon
                    icon={Delete02Icon}
                    className='w-4 h-4 mr-0.5'
                  />
                  Xóa ({selectedEmployees.size})
                </Button>
                <div className='h-6 w-px bg-gray-300 mx-1'></div>
                <Button
                  className='flex-1 h-6 px-2 flex items-center'
                  variant='outline'
                  disabled={isImporting}
                  onClick={() =>
                    document.getElementById('excel-import').click()
                  }
                  id="btn-import-excel"
                >
                  <HugeiconsIcon
                    icon={Upload01Icon}
                    className='w-4 h-4 mr-0.5'
                  />
                  Nhập dữ liệu
                </Button>
                <Button
                  className='flex-1 h-6 px-2 flex items-center'
                  variant='outline'
                  onClick={handleDownloadTemplate}
                  id="btn-download-template"
                >
                  <HugeiconsIcon
                    icon={Download01Icon}
                    className='w-4 h-4 mr-0.5'
                  />
                  Tải template
                </Button>
              </div>
              <div className='text-xs flex items-center'>
                Dữ liệu: {editedEmployees.length} nhân viên
              </div>
            </div>

            <input
              type='file'
              accept='.xlsx'
              id='excel-import'
              className='hidden'
              onChange={handleImportFile}
            />
          </TabsContent>

          {/* Tab: Hình ảnh Nhân viên */}
          <TabsContent
            value='images'
            className='flex-1 flex flex-col overflow-hidden'
          >
            {imageErrors.length > 0 && (
              <div className='mb-4 p-3 rounded-md bg-red-50 border border-red-200'>
                <p className='text-sm font-semibold text-red-800 mb-2'>Lỗi validation:</p>
                <ul className='text-xs text-red-700 space-y-1'>
                  {imageErrors.map((error, idx) => (
                    <li key={idx}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className='flex-1 overflow-auto border rounded-md p-4 bg-background'>
              {Object.keys(images).length > 0 ? (
                <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
                  {Object.entries(images).map(([key, image]) => (
                    <div key={key} className='relative group'>
                      <div className='aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200'>
                        <img
                          src={image.src}
                          alt={image.name}
                          className='w-full h-full object-cover'
                        />
                      </div>
                      <div className='absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 text-center truncate'>
                        {key}
                      </div>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 bg-red-500 hover:bg-red-600 text-white'
                        onClick={() => handleDeleteImage(key)}
                      >
                        <HugeiconsIcon icon={Delete02Icon} className='w-4 h-4' />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className='text-center text-muted-foreground h-full flex items-center justify-center flex-col gap-4'>
                  <div className='size-12 rounded-full bg-gray-200 flex items-center justify-center'>
                    <HugeiconsIcon icon={Image01Icon} className='size-6' />
                  </div>
                  <div>
                    <p className='font-medium'>Chưa có hình ảnh nào</p>
                    <p className='text-xs text-muted-foreground mt-1'>
                      Tên file phải là số (0-9), độ dài 1-7 chữ số
                    </p>
                  </div>
                </div>
              )}
            </div>

            <input
              type='file'
              multiple
              accept='.jpg,.jpeg,.png,.gif,.webp,.bmp'
              id='image-input'
              className='hidden'
              onChange={handleImageInputChange}
            />
            <div className='flex gap-2 mt-2 justify-between'>
              <div className='flex gap-2'>
                <Button
                  variant='default'
                  className='flex-1 h-6 px-2 flex items-center'
                  onClick={() => document.getElementById('image-input').click()}
                  id="btn-select-images"
                >
                  <HugeiconsIcon icon={Upload01Icon} className='w-4 h-4 mr-2' />
                  Chọn hình ảnh
                </Button>
                <Button
                  variant='destructive'
                  className='flex-1 h-6 px-2 flex items-center'
                  disabled={Object.keys(images).length === 0}
                  onClick={() => {
                    setImages({});
                    setImageErrors([]);
                    if (onImagesChange) {
                      onImagesChange({});
                    }
                  }}
                >
                  <HugeiconsIcon icon={Delete02Icon} className='w-4 h-4 mr-2' />
                  Xóa tất cả
                </Button>
              </div>
              <div className='text-xs flex items-center'>
                Dữ liệu: {editedEmployees.length} ảnh
              </div>
            </div>
          </TabsContent>

        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
