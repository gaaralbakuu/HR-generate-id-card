import * as XLSX from 'xlsx';
import ExcelJS from 'exceljs';

// Security verification sheet name
export const VERIFICATION_SHEET_NAME = 'APH_HR_VERIFY_2024';

// Table field names
export const TABLE_FIELDS = ['id', 'name', 'joinedDate', 'position', 'department', 'departmentEn', 'validUntil', 'positionEn', 'departmentAbbr', 'parentDepartmentCode', 'parentDepartmentCodeEn'];

// Column headers for Excel
export const EXCEL_HEADERS = ['MSNV', 'Họ và tên', 'Ngày vào làm', 'Chức vụ', 'Phòng ban', 'Phòng ban (EN)', 'Ngày hết hạn', 'Chức vụ (ENG)', 'Mã xưởng', 'Mã bộ phận trên cấp', 'Mã bộ phận trên cấp (EN)'];

// Column widths for Excel
export const COLUMN_WIDTHS = [
  { wch: 12 }, // MSNV
  { wch: 27 }, // Họ và tên
  { wch: 15 }, // Ngày vào làm
  { wch: 15 }, // Chức vụ
  { wch: 15 }, // Phòng ban
  { wch: 15 }, // Phòng ban (EN)
  { wch: 14 }, // Ngày hết hạn
  { wch: 15 }, // Chức vụ (ENG)
  { wch: 12 }, // Mã xưởng
  { wch: 20 }, // Mã bộ phận trên cấp
  { wch: 24 }, // Mã bộ phận trên cấp (EN)
];

// Helper: Pad employee ID to 7 digits with leading zeros (for display only)
export const padEmployeeId = (id) => {
  if (!id) return '';
  return String(id).padStart(7, '0');
};

// Helper: Remove Vietnamese diacritics (convert to English equivalent)
export const removeVietnameseDiacritics = (text) => {
  if (!text) return '';
  // Normalize to NFD (decomposed form) then remove diacritics
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
    .toUpperCase();
};

// Helper: Convert date format from YYYY/MM/DD to DD/MM/YYYY
const convertYyyyMmDdToDdMmYyyy = (dateString) => {
  if (!dateString) return '';
  
  // Match yyyy/mm/dd or yyyy-mm-dd format
  const match = dateString.match(/^(\d{4})([-\/])(\d{2})\2(\d{2})$/);
  if (match) {
    const [, year, , month, day] = match;
    return `${day}/${month}/${year}`;
  }
  
  return dateString;
};

// Helper: Parse date from Excel (handles both serial numbers and formatted dates)
export const parseExcelDate = (value) => {
  if (!value) return '';
  
  // If already contains "-" or "/", check format and convert if needed
  if (typeof value === 'string' && (value.includes('-') || value.includes('/'))) {
    // Check if it's in yyyy/mm/dd or yyyy-mm-dd format and convert to dd/mm/yyyy
    const yyyyMmDdMatch = value.match(/^(\d{4})([-\/])(\d{2})\2(\d{2})$/);
    if (yyyyMmDdMatch) {
      return convertYyyyMmDdToDdMmYyyy(value);
    }
    return value;
  }
  
  // Handle numeric values (Excel serial dates)
  const num = (typeof value === 'number') ? value : parseFloat(value);
  if (!isNaN(num)) {
    // 25569 is the number of days between 1899-12-30 and 1970-01-01 (JS Epoch)
    // Using UTC to avoid machine-specific timezone/DST issues (the "Machine B" bug)
    const msPerDay = 24 * 60 * 60 * 1000;
    const date = new Date(Math.round((num - 25569) * msPerDay));
    
    // Use UTC to format to DD/MM/YYYY to ensure consistency across all machines
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    
    return `${day}/${month}/${year}`;
  }
  
  return String(value);
};

// Create new employee template
export const createNewEmployee = () => {
  return {
    id: '',
    name: 'Nhân viên mới',
    joinedDate: new Date().toLocaleDateString('vi-VN'),
    position: '',
    department: '',
    departmentEn: '',
    validUntil: '',
    positionEn: '',
    departmentAbbr: '',
    parentDepartmentCode: '',
    parentDepartmentCodeEn: '',
    photo: null,
  };
};

// Download Excel template
export const downloadTemplate = async () => {
  const workbook = new ExcelJS.Workbook();
  
  const worksheet = workbook.addWorksheet("Nhân viên");
  
  const sampleRow = ['0029387', 'PHÙNG NGUYỄN TƯỜNG VY', '10/12/2025', 'CÔNG NHÂN', 'I.GIA CÔNG 6', 'I.ASSEMBLY 6', '2/7/2026', 'WORKER', 'I', 'GIA CÔNG', 'ASSEMBLY'];
  
  // Add headers
  worksheet.addRow(EXCEL_HEADERS);
  // Add sample row
  worksheet.addRow(sampleRow);
  
  // Define border style
  const borderStyle = getBorderStyle();
  
  // Apply border to header row (A1:K1)
  for (let col = 1; col <= 11; col++) {
    const cell = worksheet.getCell(1, col);
    cell.border = borderStyle;
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF2F2F2' } }; // Light gray background
    cell.font = { bold: true };
    cell.alignment = { horizontal: 'center', vertical: 'center', wrapText: true };
  }
  
  // Apply border to data row (A2:K2)
  for (let col = 1; col <= 11; col++) {
    const cell = worksheet.getCell(2, col);
    cell.border = borderStyle;
    cell.alignment = { horizontal: 'left', vertical: 'center' };
  }
  
  // Set column widths
  worksheet.columns = COLUMN_WIDTHS.map(col => ({ width: col.wch }));
  
  // Set row height
  worksheet.getRow(1).height = 20;
  worksheet.getRow(2).height = 20;
  
  // Add verification sheet (veryhidden) as second sheet
  const verifySheet = workbook.addWorksheet(VERIFICATION_SHEET_NAME);
  verifySheet.state = 'veryHidden'; // Very hidden - not visible but can verify existence
  verifySheet.addRow(['APH HR System Verification']); // Add some content for verification
  
  try {
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'template_nhan_vien.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Lỗi khi tải template:', error);
    throw error;
  }
};

// Helper: Apply border to row if it has data in column A
export const applyConditionalBorder = (worksheet, rowNumber, maxCol = 11) => {
  const firstCell = worksheet.getCell(rowNumber, 1);
  
  // Check if cell A has data
  if (firstCell.value) {
    const borderStyle = {
      top: { style: 'thin', color: { argb: 'FF000000' } },
      bottom: { style: 'thin', color: { argb: 'FF000000' } },
      left: { style: 'thin', color: { argb: 'FF000000' } },
      right: { style: 'thin', color: { argb: 'FF000000' } }
    };
    
    // Apply border to all columns in this row
    for (let col = 1; col <= maxCol; col++) {
      const cell = worksheet.getCell(rowNumber, col);
      cell.border = borderStyle;
      cell.alignment = { horizontal: 'left', vertical: 'center' };
    }
  }
};

// Define border style
const getBorderStyle = () => ({
  top: { style: 'thin', color: { argb: 'FF000000' } },
  bottom: { style: 'thin', color: { argb: 'FF000000' } },
  left: { style: 'thin', color: { argb: 'FF000000' } },
  right: { style: 'thin', color: { argb: 'FF000000' } }
});

// Export worksheet with formatting applied to rows with data
export const exportEmployeesToExcel = async (employees) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Nhân viên");
  
  // Add headers
  worksheet.addRow(EXCEL_HEADERS);
  
  // Add employee rows
  employees.forEach((emp) => {
    const row = [
      emp.id,
      emp.name,
      emp.joinedDate,
      emp.position,
      emp.department,
      emp.departmentEn,
      emp.validUntil,
      emp.positionEn,
      emp.departmentAbbr,
      emp.parentDepartmentCode || '',
      emp.parentDepartmentCodeEn || '',
    ];
    worksheet.addRow(row);
  });
  
  const borderStyle = getBorderStyle();
  
  // Apply border to header row
  for (let col = 1; col <= 11; col++) {
    const cell = worksheet.getCell(1, col);
    cell.border = borderStyle;
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF2F2F2' } };
    cell.font = { bold: true };
    cell.alignment = { horizontal: 'center', vertical: 'center', wrapText: true };
  }
  
  // Apply conditional border: only to rows with data in column A
  for (let rowNum = 2; rowNum <= employees.length + 1; rowNum++) {
    applyConditionalBorder(worksheet, rowNum, 11);
  }
  
  // Set column widths
  worksheet.columns = [
    { width: 12 }, // MSNV
    { width: 25 }, // Họ và tên
    { width: 15 }, // Ngày vào làm
    { width: 15 }, // Chức vụ
    { width: 15 }, // Phòng ban
    { width: 15 }, // Phòng ban (EN)
    { width: 12 }, // Ngày hết hạn
    { width: 15 }, // Chức vụ (ENG)
    { width: 12 }, // Mã xưởng
    { width: 18 }, // Mã bộ phận trên cấp
    { width: 22 }, // Mã bộ phận trên cấp (EN)
  ];
  
  // Set row height
  worksheet.getRow(1).height = 45;
  
  try {
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'danh_sach_nhan_vien.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Lỗi khi xuất file:', error);
    throw error;
  }
};

export const importEmployeesFromExcel = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Verify verification sheet exists using Workbook.Sheet
        const hasVerificationSheet = workbook.SheetNames.includes(VERIFICATION_SHEET_NAME);
        if (!hasVerificationSheet) {
          reject(new Error('File không hợp lệ. Vui lòng sử dụng template chính thức từ hệ thống.'));
          return;
        }
        
        // Read from "Nhân viên" sheet specifically
        const nhNhanVienSheet = workbook.Workbook.Sheets.find(
          (sheet) => sheet.name === 'Nhân viên'
        );
        if (!nhNhanVienSheet) {
          reject(new Error('Không tìm thấy sheet dữ liệu "Nhân viên".'));
          return;
        }

        // Get the actual worksheet data from workbook.Sheets
        const worksheet = workbook.Sheets['Nhân viên'];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 0 });
        
        // Map Excel columns to employee fields
        const employees = jsonData.map((row) => {
          return {
            id: row['MSNV'] || '',
            name: row['Họ và tên'] || '',
            joinedDate: parseExcelDate(row['Ngày vào làm']),
            position: row['Chức vụ'] || '',
            department: row['Phòng ban'] || '',
            departmentEn: row['Phòng ban (EN)'] || '',
            validUntil: parseExcelDate(row['Ngày hết hạn']),
            positionEn: row['Chức vụ (ENG)'] || '',
            departmentAbbr: row['Mã xưởng'] || '',
            parentDepartmentCode: row['Mã bộ phận trên cấp'] || '',
            parentDepartmentCodeEn: row['Mã bộ phận trên cấp (EN)'] || '',
            photo: null,
          };
        });
        
        resolve(employees);
      } catch (error) {
        reject(new Error(`Lỗi khi đọc file: ${error.message}`));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Lỗi khi đọc file'));
    };
    
    reader.readAsArrayBuffer(file);
  });
};
