import React from 'react';

const IDCard = ({ employee, photoUrl, side = 'front' }) => {
  // 85.6mm x 54mm
  // We can use style for exact dimensions in mm for print.
  // Using Tailwind for styling.

  const cardStyle = {
    width: '85.6mm',
    height: '54mm',
    backgroundColor: 'white',
    // border: '1px solid #ccc', // Optional border for visibility on screen, maybe remove for print or keep as guide
    overflow: 'hidden',
    position: 'relative'
  };

  if (side === 'front') {
    return (
      <div style={cardStyle} className="flex border border-gray-200 shadow-sm print:shadow-none print:border-gray-300">
        {/* Left side: Photo */}
        <div className="w-[30mm] h-full bg-blue-50 flex items-center justify-center overflow-hidden">
          {photoUrl ? (
            <img src={photoUrl} alt={employee.name} className="w-full h-full object-cover" />
          ) : (
            <div className="text-gray-400 text-xs text-center p-2">No Photo</div>
          )}
        </div>

        {/* Right side: Info */}
        <div className="flex-1 p-3 flex flex-col justify-center">
            <h2 className="text-lg font-bold text-gray-800 uppercase leading-tight mb-1">{employee.name || 'Tên Nhân Viên'}</h2>
            <p className="text-sm font-semibold text-blue-600 mb-2">{employee.position || 'Chức vụ'}</p>
            <div className="mt-auto">
                <p className="text-xs text-gray-500">Mã NV / ID</p>
                <p className="text-base font-mono font-bold text-gray-900">{employee.id || '0000'}</p>
            </div>
        </div>

        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-8 h-8 bg-blue-600 rounded-bl-full opacity-20"></div>
      </div>
    );
  } else {
    return (
      <div style={cardStyle} className="flex flex-col items-center justify-center border border-gray-200 shadow-sm print:shadow-none print:border-gray-300 relative bg-slate-50">
          <div className="absolute top-4 left-4 w-12 h-1 bg-blue-600"></div>

          <div className="text-center">
              <h3 className="text-xl font-bold text-blue-900 mb-1">COMPANY LOGO</h3>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Company Name Ltd.</p>
          </div>

          <div className="mt-6 text-center">
              <p className="text-xs text-gray-400 uppercase">Ngày vào làm / Join Date</p>
              <p className="text-sm font-semibold text-gray-700">{employee.joinDate || 'DD/MM/YYYY'}</p>
          </div>

          <div className="absolute bottom-2 w-full text-center">
              <p className="text-[8px] text-gray-400">www.company.com | +84 123 456 789</p>
          </div>
      </div>
    );
  }
};

export default IDCard;
