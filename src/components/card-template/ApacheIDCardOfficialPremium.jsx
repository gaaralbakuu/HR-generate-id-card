// Apache Employee ID Card - Premium Official Style

export const template = ({ employee, options, images = {}, cardColor = '#ffffff' }) => {
  const _options = {
    width: '92mm',
    height: '57.94mm',
    ...options
  }

  return (
    <div className="flex h-full">
      {/* Front Side */}
      <div 
        className="flex-1 relative overflow-hidden text-white border border-slate-900"
        style={{
          width: _options.width,
          height: _options.height,
          backgroundColor: cardColor,
          background: cardColor !== '#ffffff' && cardColor !== '#000000' 
            ? `linear-gradient(135deg, ${cardColor}cc 0%, ${cardColor}99 100%)`
            : cardColor === '#000000'
            ? 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)'
            : cardColor
        }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500 opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
        
        {/* Gold accent bar */}
        <div className="h-2 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600"></div>
        
        <div className="relative z-10 p-4 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="text-[11px] font-black uppercase tracking-wide text-yellow-400">
                APACHE FOOTWEAR
              </div>
              <div className="text-[7px] text-slate-300">
                Vietnam Co., Ltd - Est. 2025
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-2.5 py-1 rounded-md shadow-lg border border-blue-500">
              <div className="text-[8px] font-bold text-center">OFFICIAL</div>
              <div className="text-[6px] opacity-90">正式员工</div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex gap-3">
            {/* Info side */}
            <div className="flex-1 flex flex-col justify-center space-y-2.5">
              {/* Name */}
              <div className="space-y-0.5">
                <div className="text-[7px] uppercase tracking-widest text-yellow-400 font-bold">Full Name</div>
                <div className="text-[14px] font-black leading-tight text-white">
                  {employee?.name || "PHÙNG NGUYỄN TƯỜNG VY"}
                </div>
              </div>

              {/* Details card */}
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-2.5 border border-white/20 space-y-1.5">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-[7px] text-slate-300 uppercase tracking-wide">Position</div>
                    <div className="text-[9px] font-bold text-white">{employee?.position || "NHÂN VIÊN"}</div>
                  </div>
                  <div>
                    <div className="text-[7px] text-slate-300 uppercase tracking-wide">Department</div>
                    <div className="text-[9px] font-bold text-white">{employee?.department || "PRODUCTION"}</div>
                  </div>
                </div>
                
                <div className="h-px bg-white/20"></div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-[7px] text-slate-300 uppercase tracking-wide">Employee ID</div>
                    <div className="text-[9px] font-bold text-yellow-400">{employee?.id || "0029387"}</div>
                  </div>
                  <div>
                    <div className="text-[7px] text-slate-300 uppercase tracking-wide">Joined</div>
                    <div className="text-[9px] font-bold text-white">{employee?.joinedDate || "10/12/2025"}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo side */}
            <div className="flex flex-col items-center justify-center gap-2 flex-shrink-0">
              <div className="relative">
                <div className="w-16 h-20 bg-white rounded-lg overflow-hidden shadow-2xl border-2 border-yellow-500">
                  {employee?.photo ? (
                    <img src={employee.photo} alt="photo" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100">
                      <span className="text-[9px] text-slate-400 font-bold">PHOTO</span>
                    </div>
                  )}
                </div>
                <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full border-2 border-slate-900 shadow-md flex items-center justify-center">
                  <span className="text-[8px] font-black text-slate-900">✓</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto flex justify-between items-center pt-2 border-t border-white/20">
            <div className="text-[7px] text-slate-400">
              Valid: <span className="text-white font-semibold">{employee?.validUntil || "31/12/2028"}</span>
            </div>
            <div className="text-[8px] font-bold text-yellow-400 tracking-wider">
              EMPLOYEE CARD
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-px bg-slate-700"></div>

      {/* Back Side */}
      <div 
        className="flex-1 flex flex-col text-slate-800 border border-slate-200"
        style={{
          width: _options.width,
          height: _options.height,
          backgroundColor: cardColor
        }}
      >
        <div className="h-2 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800"></div>
        
        <div className="p-4 flex flex-col h-full">
          {/* Header */}
          <div className="mb-3 flex items-center gap-2">
            <div className="w-1 h-10 bg-gradient-to-b from-yellow-500 to-yellow-600 rounded"></div>
            <div>
              <div className="text-[11px] font-black text-slate-900">EMPLOYEE INFORMATION</div>
              <div className="text-[7px] text-slate-500">Thông tin nhân viên</div>
            </div>
          </div>

          {/* Info sections */}
          <div className="flex-1 space-y-2.5">
            <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200">
              <div className="text-[8px] font-bold text-slate-700 mb-1.5">Personal Details</div>
              <div className="space-y-1 text-[7px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Full Name:</span>
                  <span className="font-semibold text-slate-900">{employee?.name || "PHÙNG NGUYỄN TƯỜNG VY"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Email:</span>
                  <span className="font-semibold text-slate-900">{employee?.email || "vy.phuong@apache.com"}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-2.5 border border-blue-200">
              <div className="text-[8px] font-bold text-blue-900 mb-1.5">Access & Security</div>
              <ul className="text-[7px] text-slate-700 space-y-0.5 list-disc pl-3">
                <li>Full facility access with authorized clearance</li>
                <li>Swipe card enabled for entry systems</li>
                <li>Registered in security database</li>
              </ul>
            </div>

            <div className="bg-yellow-50 rounded-lg p-2 border border-yellow-200">
              <div className="text-[7px] text-yellow-900 font-semibold">
                ⚠️ This card must be worn visibly at all times. Report loss immediately.
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-3 border-t border-slate-200 flex justify-between items-center">
            <div>
              <div className="text-[8px] font-bold text-slate-900">APACHE VIETNAM</div>
              <div className="text-[6px] text-slate-400">Authorized Employee Identification</div>
            </div>
            <div className="w-10 h-10 border-2 border-yellow-500 rounded-lg p-1 bg-yellow-50">
              <div className="w-full h-full bg-white flex items-center justify-center text-[6px] text-slate-400">QR</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const ApacheIDCardOfficialPremium = {
  id: 'apache-official-premium',
  name: 'Apache Official Premium',
  component: template,
  thumbnail: '⭐'
}
