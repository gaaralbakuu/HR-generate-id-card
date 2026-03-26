// Apache Employee ID Card Components
import { useEffect, useRef } from 'react'
import JsBarcode from 'jsbarcode'
import logoImage from "@/assets/images/logo.png"
import { padEmployeeId } from '@/lib/excelUtils'
import { QRCodeSVG } from 'qrcode.react'

// Function to calculate EAN13 checksum
const calculateEAN13 = (id) => {
  // Pad ID to 12 digits
  let code = String(id).padStart(12, '0')

  // Calculate checksum
  let sum = 0
  for (let i = 0; i < 12; i++) {
    const digit = parseInt(code[i])
    sum += (i % 2 === 0) ? digit : digit * 3
  }

  const checksum = (10 - (sum % 10)) % 10
  return code + checksum
}

export const template = ({ employee, options, images = {}, cardColor = '#ffffff' }) => {
  const barcodeRef = useRef(null)
  const barcodeRef2 = useRef(null)
  const paddedId = padEmployeeId(employee?.id || "0000000")
  const ean13 = calculateEAN13(employee?.id || "0000000")

  useEffect(() => {
    if (barcodeRef.current && (employee?.id || "0000000")) {
      const ean13 = calculateEAN13(employee?.id || "0000000")
      JsBarcode(barcodeRef.current, ean13, {
        format: "EAN13",
        width: 1.4,
        height: 22,
        displayValue: false,
        margin: 2
      })
    }
  }, [employee?.id])

  useEffect(() => {
    if (barcodeRef2.current && (employee?.id || "0000000")) {
      const ean13 = calculateEAN13(employee?.id || "0000000")
      JsBarcode(barcodeRef2.current, ean13, {
        format: "EAN13",
        width: 1.4,
        height: 22,
        displayValue: false,
        margin: 2
      })
    }
  }, [employee?.id])

  const _options = {
    width: '92mm',
    height: '57.94mm',
    ...options
  }

  // console.log(options)

  return (
    <div className="flex h-full font-['Times_New_Roman']" style={{
      height: _options.height
    }}>
      {/* Front Side */}
      <div
        className="flex-1 flex flex-col text-gray-900 border border-black text-[11px]"
        style={{
          width: _options.width,
          height: _options.height,
          backgroundColor: cardColor
        }}
      >
        {/* Header */}
        <div className='flex'>
          <div className="text-center">
            <div className="leading-tight border-b border-solid border-black flex" style={{ height: "9.53mm" }}>
              <div className=''>
                <div className='size-full p-1'>
                  <img src={logoImage} className='h-full object-contain' />
                </div>
              </div>
              <div className='flex flex-col justify-center text-[12px] leading-3.5 tracking-tight' style={{ padding: "0mm 1mm" }}>
                <div className='font-bold'>CÔNG TY TNHH GIÀY APACHE VIỆT NAM</div>
                <div className='font-bold'>Apache Footwear VietNam Co., ltd</div>
              </div>
            </div>
            <div className="font-bold border-b border-solid border-black flex flex-col justify-center text-[12px] leading-3" style={{ height: "8mm" }}>
              <div>THẺ THỬ VIỆC</div>
              <div className="">Probation Time</div>
            </div>
          </div>
          <div className='flex-1 border-l border-solid border-black border-b flex justify-center items-center'>
            <QRCodeSVG value={ean13} size={50} level="L" includeMargin={false} />
          </div>
        </div>

        <div className='flex flex-1 overflow-hidden'>
          <div className='flex flex-col flex-1'>
            <div className='flex border-b border-solid border-black' style={{ height: "9.26mm" }}>
              <div className='flex flex-col items-center justify-center font-bold' style={{ width: "18mm" }}>
                <div>Họ Tên</div>
                <div>Name</div>
              </div>
              <div className='flex-1 flex justify-center items-center font-bold border-l border-solid border-black text-[13px] text-center leading-3.5'>{employee?.name}</div>
            </div>
            <div className='flex border-b border-solid border-black' style={{ height: "9.53mm" }}>
              <div className='flex flex-col items-center justify-center font-bold' style={{ width: "18mm" }}>
                <div>Chức Vụ</div>
                <div>Position</div>
              </div>
              <div className='flex-1 flex justify-center items-center font-bold border-l border-solid border-black text-[13px] text-center'>{employee?.position}</div>
            </div>
            <div className='flex border-b border-solid border-black' style={{ height: "9.26mm" }}>
              <div className='flex flex-col items-center justify-center font-bold' style={{ width: "18mm" }}>
                <div>Ngày Hết Hạn</div>
                <div>Expired Date</div>
              </div>
              <div className='flex-1 flex justify-center items-center font-bold border-l border-solid border-black text-[13px] text-center'>{employee?.validUntil}</div>
            </div>
            <div className='flex flex-1'>
              <div className='flex flex-col items-center justify-center font-bold text-[16px]' style={{ width: "18mm" }}>
                {paddedId}
              </div>
              <div className='flex-1 border-l border-solid border-black flex items-center justify-center'>
                <svg ref={barcodeRef}></svg>
              </div>
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='border-l border-b border-solid border-black'>
              <div style={{ width: "19.53mm", height: "26.72mm" }} className='flex items-center justify-center bg-gray-100 overflow-hidden'>
                {images[paddedId]?.src ? (
                  <img src={images[paddedId].src} alt='employee' className='w-full h-full object-cover' />
                ) : (
                  <span style={{ fontSize: '10px' }} className='text-gray-400'>Ảnh</span>
                )}
              </div>
            </div>
            <div className='flex-1 flex flex-col text-[10px] leading-3 items-center justify-center font-bold border-l border-solid border-black'>
              <div>Ngày vào</div>
              <div>Joined date</div>
              <div>{employee?.joinedDate}</div>
            </div>
          </div>
        </div>

      </div>

      {/* Divider */}
      <div className="bg-black w-px" style={{
        height: _options.height
      }}></div>

      {/* Back Side */}
      <div
        className="flex-1 flex flex-col text-gray-900 border border-black text-[11px]"
        style={{
          width: _options.width,
          height: _options.height,
          backgroundColor: cardColor
        }}
      >
        {/* Header */}
        <div className='flex'>
          <div className="text-center">
            <div className="leading-tight border-b border-solid border-black flex" style={{ height: "9.53mm" }}>
              <div className=''>
                <div className='size-full p-1'>
                  <img src={logoImage} className='h-full object-contain' />
                </div>
              </div>
              <div className='flex flex-col justify-center text-[12px] leading-3.5 tracking-tight' style={{ padding: "0mm 1mm" }}>
                <div className='font-bold'>CÔNG TY TNHH GIÀY APACHE VIỆT NAM</div>
                <div className='font-bold'>Apache Footwear VietNam Co., ltd</div>
              </div>
            </div>
            <div className="font-bold border-b border-solid border-black flex flex-col justify-center text-[12px] leading-3" style={{ height: "8mm" }}>
              <div>THẺ THỬ VIỆC</div>
              <div className="">Probation Time</div>
            </div>
          </div>
          <div className='flex-1 border-l border-solid border-black border-b flex justify-center items-center'>
            <QRCodeSVG value={ean13} size={50} level="L" includeMargin={false} />
          </div>
        </div>

        <div className='flex flex-1 overflow-hidden'>
          <div className='flex flex-col flex-1'>
            <div className='flex border-b border-solid border-black' style={{ height: "9.26mm" }}>
              <div className='flex flex-col items-center justify-center font-bold' style={{ width: "18mm" }}>
                <div>Họ Tên</div>
                <div>Name</div>
              </div>
              <div className='flex-1 flex justify-center items-center font-bold border-l border-solid border-black text-[13px] text-center leading-3.5'>{employee?.name}</div>
            </div>
            <div className='flex border-b border-solid border-black' style={{ height: "9.53mm" }}>
              <div className='flex flex-col items-center justify-center font-bold' style={{ width: "18mm" }}>
                <div>Chức Vụ</div>
                <div>Position</div>
              </div>
              <div className='flex-1 flex justify-center items-center font-bold border-l border-solid border-black text-[13px] text-center'>{employee?.position}</div>
            </div>
            <div className='flex border-b border-solid border-black' style={{ height: "9.26mm" }}>
              <div className='flex flex-col items-center justify-center font-bold' style={{ width: "18mm" }}>
                <div>Ngày Hết Hạn</div>
                <div>Expired Date</div>
              </div>
              <div className='flex-1 flex justify-center items-center font-bold border-l border-solid border-black text-[13px] text-center'>{employee?.validUntil}</div>
            </div>
            <div className='flex flex-1'>
              <div className='flex flex-col items-center justify-center font-black text-[16px]' style={{ width: "18mm" }}>
                {paddedId}
              </div>
              <div className='flex-1 border-l border-solid border-black flex items-center justify-center'>
                <svg ref={barcodeRef2}></svg>
              </div>
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='border-l border-b border-solid border-black'>
              <div style={{ width: "19.53mm", height: "26.72mm" }} className='flex items-center justify-center bg-gray-100 overflow-hidden'>
                {images[paddedId]?.src ? (
                  <img src={images[paddedId].src} alt='employee' className='w-full h-full object-cover' />
                ) : (
                  <span style={{ fontSize: '10px' }} className='text-gray-400'>Ảnh</span>
                )}
              </div>
            </div>
            <div className='flex-1 flex flex-col text-[10px] leading-3 items-center justify-center font-bold border-l border-solid border-black'>
              <div>Ngày vào</div>
              <div>Joined date</div>
              <div>{employee?.joinedDate}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export const ApacheIDCardProbationQR = {
  id: 'apache-probation-qr',
  name: 'Thẻ thử việc - QR',
  component: template,
  thumbnail: '🏭'
}
