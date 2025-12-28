// Apache Employee ID Card - Gradient Dynamic Style

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
        className="flex-1 flex flex-col relative overflow-hidden border border-indigo-200"
        style={{
          width: _options.width,
          height: _options.height,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full"></div>
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white opacity-10 rounded-full"></div>
        
        <div className="relative z-10 p-4 flex flex-col h-full text-white">
          {/* Header */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <div className="text-[11px] font-black uppercase tracking-tight text-white">
                APACHE FOOTWEAR
              </div>
              <div className="text-[7px] opacity-80">
                Probationary Employee
              </div>
            </div>
            <div className="bg-yellow-400 text-purple-900 px-2.5 py-1 rounded-full shadow-md">
              <div className="text-[9px] font-black">PROBATION</div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex gap-3 flex-1 items-center">
            {/* Photo with frame effect */}
            <div className="relative flex-shrink-0">
              <div className="w-20 h-24 bg-white rounded-lg shadow-lg overflow-hidden border-4 border-white">
                {employee?.photo ? (
                  <img src={employee.photo} alt="photo" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-purple-100">
                    <span className="text-[10px] text-purple-400 font-bold">PHOTO</span>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
                <span className="text-[10px] font-black text-purple-900">P</span>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 space-y-2">
              <div>
                <div className="text-[15px] font-black leading-tight text-white drop-shadow-md">
                  {employee?.name || "PHÙNG NGUYỄN TƯỜNG VY"}
                </div>
                <div className="text-[9px] font-bold text-yellow-300 uppercase tracking-wider mt-0.5">
                  {employee?.position || "NHÂN VIÊN"}
                </div>
              </div>
              
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-2 space-y-1">
                <div className="flex justify-between text-[8px]">
                  <span className="opacity-80">Employee ID</span>
                  <span className="font-bold">{employee?.id || "0029387"}</span>
                </div>
                <div className="flex justify-between text-[8px]">
                  <span className="opacity-80">Valid Until</span>
                  <span className="font-bold">{employee?.validUntil || "02/07/2026"}</span>
                </div>
                <div className="flex justify-between text-[8px]">
                  <span className="opacity-80">Joined</span>
                  <span className="font-bold">{employee?.joinedDate || "10/12/2025"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto flex justify-between items-end">
            <div className="text-[7px] opacity-70">
              © 2025 Apache Vietnam
            </div>
            <div className="text-[8px] font-bold bg-white bg-opacity-20 px-2 py-0.5 rounded">
              ID CARD
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-px bg-purple-300"></div>

      {/* Back Side */}
      <div 
        className="flex-1 flex flex-col bg-white text-gray-800 border border-gray-200"
        style={{
          width: _options.width,
          height: _options.height
        }}
      >
        <div className="h-2 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
        
        <div className="p-4 flex flex-col h-full">
          {/* Header */}
          <div className="mb-3 text-center">
            <div className="text-[10px] font-black text-gray-800">IMPORTANT NOTICE</div>
            <div className="text-[7px] text-gray-500">Lưu ý quan trọng</div>
          </div>

          {/* Rules */}
          <div className="flex-1 space-y-2">
            <div className="bg-purple-50 border-l-4 border-purple-500 p-2 rounded-r">
              <div className="text-[8px] font-bold text-purple-900 mb-1">Card Usage</div>
              <ul className="text-[7px] text-gray-600 space-y-0.5 list-disc pl-3">
                <li>Must wear visibly during work hours</li>
                <li>Non-transferable identification</li>
                <li>Report loss immediately to HR</li>
              </ul>
            </div>

            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-2 rounded-r">
              <div className="text-[8px] font-bold text-indigo-900 mb-1">Emergency Contact</div>
              <div className="text-[7px] text-gray-600">
                HR Department: ext. 101<br/>
                Security: ext. 199
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-3 border-t border-gray-200 flex justify-between items-center">
            <div className="text-[7px] text-gray-400">
              Valid during probation period only
            </div>
            <div className="w-10 h-10 border-2 border-purple-500 rounded p-1">
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-[6px] text-gray-400">QR</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const ApacheIDCardProbationGradient = {
  id: 'apache-probation-gradient',
  name: 'Apache Probation Gradient',
  component: template,
  thumbnail: '🌈'
}
