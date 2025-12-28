// Apache Employee ID Card - Creative Asymmetric Style

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
        className="flex-1 relative overflow-hidden bg-slate-900 text-white border border-slate-800"
        style={{
          width: _options.width,
          height: _options.height
        }}
      >
        {/* Diagonal accent */}
        <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-br from-orange-500 to-red-600 transform rotate-12 translate-x-20 -translate-y-8"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500 opacity-20 rounded-full -translate-x-16 translate-y-16"></div>
        
        <div className="relative z-10 p-4 flex flex-col h-full">
          {/* Header with diagonal layout */}
          <div className="mb-4 flex items-start justify-between">
            <div>
              <div className="text-[12px] font-black text-white">APACHE</div>
              <div className="text-[8px] text-orange-400 font-bold">FOOTWEAR VIETNAM</div>
            </div>
            <div className="bg-orange-500 text-white px-3 py-1.5 rounded-bl-2xl rounded-tr-2xl shadow-lg transform -rotate-3">
              <div className="text-[8px] font-black text-center">PROBATION</div>
              <div className="text-[6px] opacity-90">試用期</div>
            </div>
          </div>

          {/* Main Layout */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex gap-3 items-start">
              {/* Info Section */}
              <div className="flex-1 space-y-2.5">
                <div className="space-y-0.5">
                  <div className="text-[7px] uppercase tracking-widest text-orange-400 font-bold">Employee Name</div>
                  <div className="text-[13px] font-black leading-tight">
                    {employee?.name || "PHÙNG NGUYỄN TƯỜNG VY"}
                  </div>
                </div>

                <div className="bg-slate-800 bg-opacity-60 backdrop-blur rounded-lg p-2 border border-slate-700">
                  <div className="grid grid-cols-2 gap-2 text-[8px]">
                    <div>
                      <div className="text-slate-400 uppercase text-[7px]">Position</div>
                      <div className="font-bold">{employee?.position || "NHÂN VIÊN"}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 uppercase text-[7px]">ID</div>
                      <div className="font-bold text-orange-400">{employee?.id || "0029387"}</div>
                    </div>
                  </div>
                  <div className="mt-1.5 pt-1.5 border-t border-slate-700 grid grid-cols-2 gap-2 text-[8px]">
                    <div>
                      <div className="text-slate-400 uppercase text-[7px]">Joined</div>
                      <div className="font-bold">{employee?.joinedDate || "10/12/2025"}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 uppercase text-[7px]">Expires</div>
                      <div className="font-bold">{employee?.validUntil || "02/07/2026"}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Photo with creative frame */}
              <div className="relative flex-shrink-0">
                <div className="w-16 h-20 bg-white rounded-tl-3xl rounded-br-3xl overflow-hidden shadow-xl border-2 border-orange-500">
                  {employee?.photo ? (
                    <img src={employee.photo} alt="photo" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100">
                      <span className="text-[9px] text-slate-400 font-bold">PHOTO</span>
                    </div>
                  )}
                </div>
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-orange-500 rounded-full border-2 border-slate-900"></div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto text-[7px] text-slate-400 flex justify-between items-center">
            <span>EST. 2025</span>
            <span className="text-orange-400 font-bold">IDENTITY CARD</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-px bg-slate-700"></div>

      {/* Back Side */}
      <div 
        className="flex-1 flex flex-col bg-white text-slate-800 border border-slate-200"
        style={{
          width: _options.width,
          height: _options.height
        }}
      >
        <div className="h-2 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600"></div>
        
        <div className="p-4 flex flex-col h-full">
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-8 bg-orange-500 rounded"></div>
              <div>
                <div className="text-[10px] font-black text-slate-900">CARD REGULATIONS</div>
                <div className="text-[7px] text-slate-500">Quy định sử dụng thẻ</div>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <div className="bg-orange-50 rounded-lg p-2 border-l-2 border-orange-500">
              <div className="text-[7px] text-slate-700 leading-relaxed">
                <p className="font-semibold mb-1">Probationary Period:</p>
                <p>This card is valid only during your probationary employment period with Apache Footwear Vietnam.</p>
              </div>
            </div>

            <div className="space-y-1 text-[7px] text-slate-600">
              <div className="flex items-start gap-1.5">
                <span className="text-orange-500 font-bold">•</span>
                <span>Wear this card visibly at all times on company premises</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-orange-500 font-bold">•</span>
                <span>This card is non-transferable and company property</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-orange-500 font-bold">•</span>
                <span>Report loss or damage to HR immediately</span>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-3 border-t border-slate-200 flex justify-between items-center">
            <div>
              <div className="text-[8px] font-bold text-slate-900">APACHE VIETNAM</div>
              <div className="text-[6px] text-slate-400">Employee Management System</div>
            </div>
            <div className="w-9 h-9 bg-slate-100 border-2 border-orange-500 rounded-lg p-1">
              <div className="w-full h-full bg-white flex items-center justify-center text-[6px] text-slate-400">QR</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const ApacheIDCardProbationCreative = {
  id: 'apache-probation-creative',
  name: 'Apache Probation Creative',
  component: template,
  thumbnail: '🎨'
}
