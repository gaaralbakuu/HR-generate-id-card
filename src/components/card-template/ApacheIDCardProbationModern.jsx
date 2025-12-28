// Apache Employee ID Card - Modern Style

export const template = ({ employee, options }) => {
  const _options = {
    width: '92mm',
    height: '57.94mm',
    ...options
  }

  return (
    <div className="flex h-full">
      {/* Front Side */}
      <div 
        className="flex-1 flex flex-col bg-white text-slate-800 border border-slate-200 shadow-sm overflow-hidden"
        style={{
          width: _options.width,
          height: _options.height,
          position: 'relative'
        }}
      >
        {/* Top Accent Bar */}
        <div className="h-1.5 bg-blue-600 w-full"></div>
        
        <div className="p-3 flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <div className="text-[10px] font-bold text-blue-900 uppercase tracking-tight">
                CÔNG TY TNHH GIÀY APACHE VIỆT NAM
              </div>
              <div className="text-[8px] text-slate-500 italic">
                Apache Footwear VietNam Co., ltd
              </div>
            </div>
            <div className="bg-red-50 px-2 py-0.5 rounded border border-red-100">
              <div className="text-[8px] font-bold text-red-600 text-center leading-none">THẺ THỬ VIỆC</div>
              <div className="text-[7px] text-red-400 text-center leading-none">Probation</div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex gap-3 flex-1">
            {/* Photo */}
            <div className="w-16 h-20 bg-slate-100 rounded-md border-2 border-white shadow-sm flex-shrink-0 overflow-hidden">
              {employee?.photo ? (
                <img src={employee.photo} alt="photo" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-200">
                  <span className="text-[10px] text-slate-400">PHOTO</span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col justify-center space-y-1.5">
              <div>
                <div className="text-[7px] uppercase text-slate-400 font-bold tracking-wider">Full Name</div>
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  {employee?.name || "PHÙNG NGUYỄN TƯỜNG VY"}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-1">
                <div>
                  <div className="text-[7px] uppercase text-slate-400 font-bold tracking-wider">Position</div>
                  <div className="text-[9px] font-semibold text-slate-700">
                    {employee?.position || "NHÂN VIÊN"}
                  </div>
                </div>
                <div>
                  <div className="text-[7px] uppercase text-slate-400 font-bold tracking-wider">ID Number</div>
                  <div className="text-[9px] font-bold text-blue-600">
                    {employee?.id || "0029387"}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[7px] uppercase text-slate-400 font-bold tracking-wider">Valid Until</div>
                <div className="text-[9px] font-semibold text-slate-700">
                  {employee?.validUntil || "02/07/2026"}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-1 border-t border-slate-100 flex justify-between items-center">
            <div className="text-[8px] text-slate-400">
              Joined: <span className="font-semibold text-slate-600">{employee?.joinedDate || "10/12/2025"}</span>
            </div>
            <div className="text-[8px] font-bold text-blue-600">APACHE FOOTWEAR</div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-px bg-slate-200"></div>

      {/* Back Side */}
      <div 
        className="flex-1 flex flex-col bg-slate-50 text-slate-800 border border-slate-200 shadow-sm overflow-hidden"
        style={{
          width: _options.width,
          height: _options.height
        }}
      >
        <div className="h-1.5 bg-slate-800 w-full"></div>
        <div className="p-4 flex flex-col h-full items-center justify-center text-center">
          <div className="mb-3">
            <div className="text-[10px] font-bold text-slate-800">QUY ĐỊNH SỬ DỤNG THẺ</div>
            <div className="text-[8px] text-slate-500">Card Regulations</div>
          </div>
          
          <ul className="text-[7px] text-left space-y-1 list-disc pl-3 text-slate-600">
            <li>Thẻ này là tài sản của Công ty Apache Việt Nam.</li>
            <li>Phải đeo thẻ trong suốt thời gian làm việc.</li>
            <li>Không được cho người khác mượn thẻ.</li>
            <li>Nếu mất thẻ phải báo ngay cho phòng Nhân sự.</li>
          </ul>

          <div className="mt-4 pt-3 border-t border-slate-200 w-full flex justify-around items-center">
             <div className="w-10 h-10 bg-white border border-slate-200 rounded p-1">
                {/* Placeholder for QR */}
                <div className="w-full h-full bg-slate-100 flex items-center justify-center text-[6px] text-slate-400">QR CODE</div>
             </div>
             <div className="text-right">
                <div className="text-[8px] font-bold">APACHE VIETNAM</div>
                <div className="text-[6px] text-slate-400">www.apachefootwear.com</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const ApacheIDCardProbationModern = {
  id: 'apache-probation-modern',
  name: 'Apache Probation Modern',
  component: template,
  thumbnail: '🏢'
}
