import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Upload } from 'lucide-react';

const ExcelUploader = ({ onUpload }) => {
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setError('');

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const binaryString = event.target.result;
        const workbook = XLSX.read(binaryString, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Basic validation and mapping
        if (data.length < 2) {
            setError('Excel file seems empty or missing header');
            return;
        }

        const headers = data[0].map(h => h.toString().trim().toLowerCase());

        // Find indexes
        const nameIdx = headers.findIndex(h => h.includes('tên') || h.includes('name'));
        const idIdx = headers.findIndex(h => h.includes('mã') || h.includes('id'));
        const joinDateIdx = headers.findIndex(h => h.includes('ngày') || h.includes('date'));
        const positionIdx = headers.findIndex(h => h.includes('chức') || h.includes('position'));

        if (nameIdx === -1 || idIdx === -1) {
             setError('Could not find "Name" or "Employee ID" columns.');
             return;
        }

        const employees = data.slice(1).map(row => ({
          name: row[nameIdx],
          id: row[idIdx],
          joinDate: joinDateIdx !== -1 ? formatDate(row[joinDateIdx]) : '',
          position: positionIdx !== -1 ? row[positionIdx] : '',
        })).filter(emp => emp.id && emp.name); // Filter empty rows

        onUpload(employees);

      } catch (err) {
        console.error(err);
        setError('Error parsing Excel file');
      }
    };
    reader.readAsBinaryString(file);
  };

    const formatDate = (excelDate) => {
        if (!excelDate) return '';
        if (typeof excelDate === 'number') {
            const date = new Date(Math.round((excelDate - 25569) * 86400 * 1000));
            return date.toLocaleDateString('vi-VN');
        }
        return excelDate.toString();
    }

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <Upload className="w-10 h-10 text-gray-400 mb-2" />
      <span className="text-sm font-medium text-gray-600">
        {fileName ? fileName : 'Click to upload Excel file'}
      </span>
      <span className="text-xs text-gray-500 mt-1">.xlsx, .xls</span>
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
};

export default ExcelUploader;
