// Apache Employee ID Card - Elegant Minimalist Style

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
        className="flex-1 flex flex-col bg-white text-zinc-900 border border-zinc-300 overflow-hidden"
        style={{
          width: _options.width,
          height: _options.height,
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
      >
        <div className="flex h-full">
          {/* Left Accent Column */}
          <div className="w-1 bg-zinc-900 h-full"></div>
          
          <div className="flex-1 p-4 flex flex-col">
            {/* Header */}
            <div className="mb-4">
              <div className="text-[9px] font-black tracking-tighter text-zinc-900">
                APACHE FOOTWEAR VIETNAM
              </div>
              <div className="text-[7px] text-zinc-400 uppercase tracking-widest">
                Probationary Identity
              </div>
            </div>

            {/* Main Info */}
            <div className="flex-1">
              <div className="mb-3">
                <div className="text-[14px] font-light text-zinc-900 leading-tight">
                  {employee?.name || "PHÙNG NGUYỄN TƯỜNG VY"}
                </div>
                <div className="text-[8px] font-medium text-zinc-500 uppercase tracking-widest mt-0.5">
                  {employee?.position || "NHÂN VIÊN"}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-[7px] text-zinc-400 uppercase w-12">ID No.</span>
                  <span className="text-[9px] font-bold text-zinc-800">{employee?.id || "0029387"}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[7px] text-zinc-400 uppercase w-12">Expires</span>
                  <span className="text-[9px] font-medium text-zinc-800">{employee?.validUntil || "02/07/2026"}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-auto flex justify-between items-end">
              <div className="text-[7px] text-zinc-400">
                EST. 2025
              </div>
              <div className="text-[10px] font-bold text-red-600">
                PROBATION
              </div>
            </div>
          </div>

          {/* Right Photo Section */}
          <div className="w-24 bg-zinc-50 flex items-center justify-center border-l border-zinc-100">
            <div className="w-20 h-24 bg-white shadow-sm overflow-hidden border border-zinc-200">
              {employee?.photo ? (
                <img src={employee.photo} alt="photo" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-zinc-100">
                  <span className="text-[8px] text-zinc-300">PHOTO</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-px bg-zinc-300"></div>

      {/* Back Side */}
      <div 
        className="flex-1 flex flex-col bg-zinc-900 text-zinc-100 border border-zinc-900 overflow-hidden"
        style={{
          width: _options.width,
          height: _options.height
        }}
      >
        <div className="p-5 flex flex-col h-full">
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-[10px] font-bold mb-4 border-b border-zinc-700 pb-1">
              TERMS & CONDITIONS
            </div>
            <div className="text-[7px] text-zinc-400 space-y-2 leading-relaxed">
              <p>1. This card is the property of Apache Footwear Vietnam and must be returned upon request or termination of employment.</p>
              <p>2. The holder is responsible for the safekeeping of this card.</p>
              <p>3. Loss of card must be reported immediately to the HR Department.</p>
            </div>
          </div>
          
          <div className="mt-auto flex justify-between items-center pt-4 border-t border-zinc-800">
            <div>
              <div className="text-[8px] font-bold">APACHE</div>
              <div className="text-[6px] text-zinc-500">Identity Management System</div>
            </div>
            <div className="w-8 h-8 bg-white rounded-sm p-0.5">
               <div className="w-full h-full bg-zinc-100 flex items-center justify-center text-[5px] text-zinc-400">QR</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const ApacheIDCardProbationElegant = {
  id: 'apache-probation-elegant',
  name: 'Apache Probation Elegant',
  component: template,
  thumbnail: '✨'
}
