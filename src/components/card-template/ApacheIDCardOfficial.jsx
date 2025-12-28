// Apache Employee ID Card - Official Employee Card

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
        className="flex-1 flex flex-col justify-between p-3 bg-white text-gray-900 border border-blue-600"
        style={{
          width: _options.width,
          height: _options.height
        }}
      >
        {/* Top Blue Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-600"></div>
        
        {/* Header */}
        <div className="text-center mt-1">
          <div className="text-xs font-bold leading-tight">
            <div>CÔNG TY TNHH GIÀY APACHE VIỆT NAM</div>
            <div className="text-xs">Apache Footwear VietNam Co., ltd</div>
          </div>
          <div className="border-b-2 border-blue-600 my-1"></div>
          <div className="text-[10px] font-semibold text-blue-700">
            <div>THẺ NHÂN VIÊN CHÍNH THỨC</div>
            <div className="text-xs">Official Employee Card</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex gap-2">
          {/* Left content */}
          <div className="flex-1 space-y-0.5 text-xs">
            {/* Row 1 */}
            <div className="flex gap-2">
              <div className="w-16">
                <div className="text-[9px] font-semibold">Họ Tên</div>
                <div className="text-[9px] text-gray-600">Name</div>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm">{employee?.name || "PHÙNG NGUYỄN TƯỜNG VY"}</div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex gap-2">
              <div className="w-16">
                <div className="text-[9px] font-semibold">Chức vụ</div>
                <div className="text-[9px] text-gray-600">Position</div>
              </div>
              <div className="flex-1">
                <div className="font-semibold">{employee?.position || "NHÂN VIÊN"}</div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex gap-2">
              <div className="w-16">
                <div className="text-[9px] font-semibold">Phòng ban</div>
                <div className="text-[9px] text-gray-600">Department</div>
              </div>
              <div className="flex-1">
                <div className="font-semibold">{employee?.department || "PRODUCTION"}</div>
              </div>
            </div>
          </div>

          {/* Photo */}
          <div className="w-14 h-full bg-gray-200 rounded flex items-center justify-center border-2 border-blue-600 flex-shrink-0">
            {employee?.photo ? (
              <img src={employee.photo} alt="photo" className="w-full h-full object-cover rounded" />
            ) : (
              <span className="text-[9px] text-gray-500 text-center">Ảnh</span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2 items-end justify-between border-t-2 border-blue-600 pt-1">
          <div className="font-mono font-bold text-sm text-blue-700">{employee?.id || "0029387"}</div>
          <div className="text-[9px] text-center">
            <div className="text-[9px] font-semibold">Ngày vào</div>
            <div className="text-[9px] text-gray-600">Joined date</div>
            <div className="text-sm font-bold">{employee?.joinedDate || "10/12/2025"}</div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-px bg-blue-600"></div>

      {/* Back Side */}
      <div 
        className="flex-1 flex flex-col justify-between p-3 bg-white text-gray-900 border border-blue-600"
        style={{
          width: _options.width,
          height: _options.height
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-600"></div>
        
        {/* Header */}
        <div className="text-center mt-1">
          <div className="text-xs font-bold leading-tight">
            <div>CÔNG TY TNHH GIÀY APACHE VIỆT NAM</div>
            <div className="text-xs">Apache Footwear VietNam Co., ltd</div>
          </div>
          <div className="border-b-2 border-blue-600 my-1"></div>
          <div className="text-[10px] font-semibold text-blue-700">
            <div>THÔNG TIN NHÂN VIÊN</div>
            <div className="text-xs">Employee Information</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex gap-2">
          {/* Left content */}
          <div className="flex-1 space-y-0.5 text-xs">
            {/* Row 1 */}
            <div className="flex gap-2">
              <div className="w-16">
                <div className="text-[9px] font-semibold">Họ Tên</div>
                <div className="text-[9px] text-gray-600">Name</div>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm">{employee?.name || "PHÙNG NGUYỄN TƯỜNG VY"}</div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex gap-2">
              <div className="w-16">
                <div className="text-[9px] font-semibold">Email</div>
                <div className="text-[9px] text-gray-600">Email</div>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-[9px]">{employee?.email || "vy.phuong@apache.com"}</div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex gap-2">
              <div className="w-16">
                <div className="text-[9px] font-semibold">Ngày hết hạn</div>
                <div className="text-[9px] text-gray-600">Valid Until</div>
              </div>
              <div className="flex-1">
                <div className="font-semibold">{employee?.validUntil || "31/12/2028"}</div>
              </div>
            </div>
          </div>

          {/* Photo */}
          <div className="w-14 h-full bg-gray-200 rounded flex items-center justify-center border-2 border-blue-600 flex-shrink-0">
            {employee?.photo ? (
              <img src={employee.photo} alt="photo" className="w-full h-full object-cover rounded" />
            ) : (
              <span className="text-[9px] text-gray-500 text-center">Ảnh</span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2 items-end justify-between border-t-2 border-blue-600 pt-1">
          <div className="font-mono font-bold text-sm text-blue-700">{employee?.id || "0029387"}</div>
          <div className="text-[9px] text-center">
            <div className="text-[9px] font-semibold">Chữ ký</div>
            <div className="text-[9px] text-gray-600">Signature</div>
            <div className="border-t border-gray-400 w-16 mt-2"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const ApacheIDCardOfficial = {
  id: 'apache-official',
  name: 'Apache Official Card',
  component: template,
  thumbnail: '💼'
}
