import { useState } from 'react';
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
} from '@hugeicons/core-free-icons/index';

export function EmployeeManagementModal({
  isOpen,
  onClose,
  employees = [],
  onEmployeesChange,
}) {
  const [activeTab, setActiveTab] = useState('employees');
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [editedEmployees, setEditedEmployees] = useState(employees);
  const [selectedEmployees, setSelectedEmployees] = useState(new Set());

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
    const newEmployee = {
      name: 'Nhân viên mới',
      id: '',
      position: '',
      department: '',
      email: '',
      joinedDate: new Date().toLocaleDateString('vi-VN'),
      validUntil: '',
      photo: null,
    };
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

  const tableFields = ['name', 'id', 'position', 'department', 'email', 'joinedDate'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        closeOnClickOutside={false}
        className='max-w-[90vw]! h-[90vh] flex flex-col p-0 w-250 gap-0'
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
            >
              <HugeiconsIcon icon={UserIcon} className='size-4' />
              <span>Danh sách</span>
            </TabsTrigger>
            <TabsTrigger
              value='images'
              className='flex items-center gap-1 bg-transparent data-[state=active]:bg-transparent shadow-none! border-b-2 border-transparent data-[state=active]:border-primary rounded-none pb-1.5 font-semibold! px-1! text-xs'
            >
              <HugeiconsIcon icon={Image01Icon} className='size-4' />
              <span>Hình ảnh</span>
            </TabsTrigger>
            <TabsTrigger
              value='import'
              className='flex items-center gap-1 bg-transparent data-[state=active]:bg-transparent shadow-none! border-b-2 border-transparent data-[state=active]:border-primary rounded-none pb-1.5 font-semibold! px-1! text-xs'
            >
              <HugeiconsIcon icon={GoogleSheetIcon} className='size-4' />
              <span>Nhập dữ liệu</span>
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
                      <TableHead>Họ tên</TableHead>
                      <TableHead>Mã NV</TableHead>
                      <TableHead>Chức vụ</TableHead>
                      <TableHead>Phòng ban</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Ngày vào</TableHead>
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
                          className='cursor-text hover:bg-muted/50 p-2 text-xs relative'
                          onClick={() =>
                            handleCellClick(index, 'email', emp.email)
                          }
                        >
                          {editingCell?.index === index &&
                            editingCell?.field === 'email' && (
                              <Input
                                autoFocus
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onBlur={() => handleCellBlur(index, 'email')}
                                onKeyDown={(e) =>
                                  handleKeyDown(e, index, 'email', tableFields)
                                }
                                className='h-6 px-1.5 border py-1 absolute bg-white top-1/2 left-0 right-0 -translate-y-1/2'
                              />
                            )}
                          {emp.email}
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
                <div className='text-center text-muted-foreground h-full flex items-center justify-center text-xs'>
                  <div className='flex flex-col items-center gap-2'>
                    <div>
                      <div className='size-10 rounded-full bg-gray-200 flex items-center justify-center'>
                        <HugeiconsIcon
                          icon={UserIcon}
                          className='size-6 mx-auto'
                        />
                      </div>
                    </div>
                    <p>Chưa có nhân viên nào</p>
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
              )}
            </div>
            <div className='flex gap-2 mt-2 justify-between'>
              <div className='flex gap-2'>
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
              </div>
              <div className='text-xs'>
                Dữ liệu: {editedEmployees.length} nhân viên
              </div>
            </div>
          </TabsContent>

          {/* Tab: Hình ảnh Nhân viên */}
          <TabsContent
            value='images'
            className='flex-1 flex flex-col overflow-hidden'
          >
            <div className='flex-1 overflow-auto border rounded-md p-4 bg-background'>
              <div className='text-center text-muted-foreground py-8'>
                <p>Chưa có hình ảnh nào</p>
              </div>
            </div>
            <div className='flex gap-2 mt-4'>
              <input
                type='file'
                multiple
                accept='image/*'
                id='image-input'
                className='hidden'
              />
              <Button
                variant='default'
                className='flex-1'
                onClick={() => document.getElementById('image-input').click()}
              >
                Chọn hình ảnh
              </Button>
              <Button variant='outline' className='flex-1'>
                Xóa
              </Button>
            </div>
          </TabsContent>

          {/* Tab: Nhập dữ liệu */}
          <TabsContent
            value='import'
            className='flex-1 flex flex-col overflow-hidden'
          >
            <div className='flex-1 overflow-auto space-y-4 mb-4'>
              <div>
                <label className='text-sm font-medium mb-2 block'>
                  Nhập tệp Excel (.xlsx)
                </label>
                <input
                  type='file'
                  accept='.xlsx,.xls'
                  id='excel-input'
                  className='hidden'
                />
                <Button
                  variant='outline'
                  className='w-full'
                  onClick={() => document.getElementById('excel-input').click()}
                >
                  <HugeiconsIcon icon={Upload01Icon} className='w-4 h-4 mr-2' />
                  Chọn tệp Excel
                </Button>
              </div>

              <div>
                <label className='text-sm font-medium mb-2 block'>
                  Nhập hình ảnh nhân viên
                </label>
                <input
                  type='file'
                  multiple
                  accept='image/*'
                  id='bulk-image-input'
                  className='hidden'
                />
                <Button
                  variant='outline'
                  className='w-full'
                  onClick={() =>
                    document.getElementById('bulk-image-input').click()
                  }
                >
                  <HugeiconsIcon icon={Upload01Icon} className='w-4 h-4 mr-2' />
                  Chọn hình ảnh (nhiều tệp)
                </Button>
              </div>

              <div className='border rounded-md p-4 bg-muted/30'>
                <p className='text-xs text-muted-foreground'>
                  <strong>Hướng dẫn:</strong> Tệp Excel phải chứa cột ID để ghép
                  ảnh với nhân viên
                </p>
              </div>
            </div>

            <div className='flex gap-2'>
              <Button variant='default' className='flex-1'>
                Xử lý dữ liệu
              </Button>
              <Button variant='outline' className='flex-1'>
                Hủy bỏ
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
