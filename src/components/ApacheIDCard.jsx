// Apache Employee ID Card Components

export const ApacheIDCardFront = ({ employee, options }) => {

  const _options = {
    width: '89mm',
    height: '58mm',
    ...options
  }

  // console.log(options)

  return (
    <div className="flex h-full">
      {/* Front Side */}
      <div 
        className="flex-1 flex flex-col justify-between p-3 bg-white text-gray-900 border border-black"
        style={{
          width: _options.width,
          height: _options.height
        }}
      >
        {/* Header */}
        <div className="text-center">
          <div className="text-xs font-bold leading-tight">
            <div>CÔNG TY TNHH GIÀY APACHE VIỆT NAM</div>
            <div className="text-xs">Apache Footwear VietNam Co., ltd</div>
          </div>
          <div className="border-b border-gray-400 my-1"></div>
          <div className="text-[10px] font-semibold text-red-600">
            <div>THẺ THỬ VIỆC</div>
            <div className="text-xs">Probation Time</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex gap-2">
          {/* Left content */}
          <div className="flex-1 space-y-0.5 text-xs">
            {/* Row 3 */}
            <div className="flex gap-2">
              <div className="w-16">
                <div className="text-[9px] font-semibold">Họ Tên</div>
                <div className="text-[9px] text-gray-600">Name</div>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm">{employee?.name || "PHÙNG NGUYỄN TƯỜNG VY"}</div>
              </div>
            </div>

            {/* Row 4 */}
            <div className="flex gap-2">
              <div className="w-16">
                <div className="text-[9px] font-semibold">Chức vụ</div>
                <div className="text-[9px] text-gray-600">Position</div>
              </div>
              <div className="flex-1">
                <div className="font-semibold">{employee?.position || "NHÂN VIÊN"}</div>
              </div>
            </div>

            {/* Row 5 */}
            <div className="flex gap-2">
              <div className="w-16">
                <div className="text-[9px] font-semibold">Ngày hết hạn</div>
                <div className="text-[9px] text-gray-600">Expire Date</div>
              </div>
              <div className="flex-1">
                <div className="font-semibold">{employee?.validUntil || "2/7/2026"}</div>
              </div>
            </div>
          </div>

          {/* Photo - Rowspan 3 */}
          <div className="w-14 h-full bg-gray-200 rounded flex items-center justify-center border border-gray-400 flex-shrink-0">
            {employee?.photo ? (
              <img src={employee.photo} alt="photo" className="w-full h-full object-cover rounded" />
            ) : (
              <span className="text-[9px] text-gray-500 text-center">Ảnh</span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2 items-end justify-between border-t border-black pt-1">
          <div className="font-mono font-bold text-sm">{employee?.id || "0029387"}</div>
          <div className="text-[9px] text-center">
            <div className="text-[9px] font-semibold">Ngày vào</div>
            <div className="text-[9px] text-gray-600">Joined date</div>
            <div className="text-sm font-bold">{employee?.joinedDate || "10/12/2025"}</div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="bg-black w-px"></div>

      {/* Back Side */}
      <div 
        className="flex-1 flex flex-col justify-between p-3 bg-white text-gray-900 border border-black"
        style={{
          width: _options.width,
          height: _options.height
        }}
      >
        {/* Header */}
        <div className="text-center">
          <div className="text-xs font-bold leading-tight">
            <div>CÔNG TY TNHH GIÀY APACHE VIỆT NAM</div>
            <div className="text-xs">Apache Footwear VietNam Co., ltd</div>
          </div>
          <div className="border-b border-gray-400 my-1"></div>
          <div className="text-[10px] font-semibold text-red-600">
            <div>THẺ NHÂN VIÊN back</div>
            <div className="text-xs">Employee Card</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex gap-2">
          {/* Left content */}
          <div className="flex-1 space-y-0.5 text-xs">
            {/* Row 3 */}
            <div className="flex gap-2">
              <div className="w-16">
                <div className="text-[9px] font-semibold">Họ Tên</div>
                <div className="text-[9px] text-gray-600">Name</div>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm">{employee?.name || "PHÙNG NGUYỄN TƯỜNG VY"}</div>
              </div>
            </div>

            {/* Row 4 */}
            <div className="flex gap-2">
              <div className="w-16">
                <div className="text-[9px] font-semibold">Phòng ban</div>
                <div className="text-[9px] text-gray-600">Department</div>
              </div>
              <div className="flex-1">
                <div className="font-semibold">{employee?.department || "PRODUCTION"}</div>
              </div>
            </div>

            {/* Row 5 */}
            <div className="flex gap-2">
              <div className="w-16">
                <div className="text-[9px] font-semibold">Email</div>
                <div className="text-[9px] text-gray-600">Email</div>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-[9px]">{employee?.email || "vy.phuong@apache.com"}</div>
              </div>
            </div>
          </div>

          {/* Photo - Rowspan 3 */}
          <div className="w-14 h-full bg-gray-200 rounded flex items-center justify-center border border-gray-400 flex-shrink-0">
            {employee?.photo ? (
              <img src={employee.photo} alt="photo" className="w-full h-full object-cover rounded" />
            ) : (
              <span className="text-[9px] text-gray-500 text-center">Ảnh</span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2 items-end justify-between border-t border-black pt-1">
          <div className="font-mono font-bold text-sm">{employee?.id || "0029387"}</div>
          <div className="text-[9px] text-center">
            <div className="text-[9px] font-semibold">Ngày vào</div>
            <div className="text-[9px] text-gray-600">Joined date</div>
            <div className="text-sm font-bold">{employee?.joinedDate || "10/12/2025"}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const ApacheIDCardProbation = {
  id: 'apache-probation',
  name: 'Apache Probation Card',
  component: ApacheIDCardFront,
  thumbnail: '🏭'
}
