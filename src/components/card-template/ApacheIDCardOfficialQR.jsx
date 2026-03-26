// Apache Employee ID Card Components
import { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";
import { QRCodeSVG } from "qrcode.react";
import logoImage from "@/assets/images/logo.png";
import { padEmployeeId, removeVietnameseDiacritics } from "@/lib/excelUtils";

// Function to calculate EAN13 checksum
const calculateEAN13 = (id) => {
  // Pad ID to 12 digits
  let code = String(id).padStart(12, "0");

  // Calculate checksum
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const digit = parseInt(code[i]);
    sum += i % 2 === 0 ? digit : digit * 3;
  }

  const checksum = (10 - (sum % 10)) % 10;
  return code + checksum;
};

export const template = ({
  employee,
  options,
  images = {},
  cardColor = "#ffffff",
}) => {
  const barcodeRef = useRef(null);
  const barcodeRef2 = useRef(null);
  const paddedId = padEmployeeId(employee?.id || "0000000");
  const nameWithoutDiacritics = removeVietnameseDiacritics(
    employee?.name || "",
  );
  const ean13 = calculateEAN13(employee?.id || "0000000");

  useEffect(() => {
    if (barcodeRef.current && (employee?.id || "0000000")) {
      const ean13 = calculateEAN13(employee?.id || "0000000");
      JsBarcode(barcodeRef.current, ean13, {
        format: "EAN13",
        width: 1.4,
        height: 20,
        displayValue: false,
        margin: 2,
      });
    }
  }, [employee?.id]);

  useEffect(() => {
    if (barcodeRef2.current && (employee?.id || "0000000")) {
      const ean13 = calculateEAN13(employee?.id || "0000000");
      JsBarcode(barcodeRef2.current, ean13, {
        format: "EAN13",
        width: 1.4,
        height: 20,
        displayValue: false,
        margin: 2,
      });
    }
  }, [employee?.id]);

  const _options = {
    width: "92mm",
    height: "57.94mm",
    ...options,
  };

  // console.log(options)

  return (
    <div
      className="flex h-full font-['Times_New_Roman']"
      style={{
        height: _options.height,
      }}
    >
      {/* Front Side */}
      <div
        className="flex-1 flex flex-col text-gray-900 border border-black text-[13px]"
        style={{
          width: _options.width,
          height: _options.height,
          backgroundColor: cardColor,
        }}
      >
        {/* Header */}
        <div className="text-center">
          <div
            className="leading-tight border-b border-solid border-black flex justify-between"
            style={{ height: "8.47mm" }}
          >
            <div className="">
              <div
                className="h-full p-1 flex justify-center"
                style={{ width: "12.17mm" }}
              >
                <img src={logoImage} className="h-full object-contain" />
              </div>
            </div>
            <div className="flex flex-col justify-center leading-3.5 flex-1 text-[13px] border-l border-solid border-black">
              <div className="font-bold">CÔNG TY TNHH GIÀY APACHE VIỆT NAM</div>
            </div>
          </div>
          <div
            className="font-bold border-b border-solid border-black flex text-[13px] leading-3.5"
            style={{ height: "5.47mm" }}
          >
            <div>
              <div
                style={{ width: "12.17mm" }}
                className="h-full flex justify-center items-center text-center"
              >
                {employee?.departmentAbbr}
              </div>
            </div>
            <div className="border-l border-solid border-black flex-1 flex justify-center items-center text-center">
              {employee?.parentDepartmentCode}
            </div>
            <div>
              <div
                style={{ width: "21.92mm" }}
                className="border-l border-solid border-black h-full flex justify-center items-center text-center"
              >
                {employee?.joinedDate}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="flex flex-col">
            <div className="">
              <div
                style={{ width: "19.53mm", height: "26.72mm" }}
                className="flex items-center justify-center bg-gray-100 overflow-hidden"
              >
                {images[paddedId]?.src ? (
                  <img
                    src={images[paddedId].src}
                    alt="employee"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span style={{ fontSize: "10px" }} className="text-gray-400">
                    Ảnh
                  </span>
                )}
              </div>
            </div>
            <div className="flex-1 flex flex-col leading-3 items-center justify-center font-bold border-t border-solid border-black">
              <QRCodeSVG
                value={ean13}
                size={50}
                level="L"
                includeMargin={false}
              />
            </div>
          </div>
          <div className="flex flex-col flex-1 border-l border-solid border-black">
            <div
              className="flex border-b border-solid border-black"
              style={{ height: "10.05mm" }}
            >
              <div
                className="flex flex-col items-center justify-center font-bold"
                style={{ width: "18mm" }}
              >
                Họ tên
              </div>
              <div className="flex-1 flex justify-center items-center font-bold border-l border-solid border-black text-[13px] text-center leading-3.5">
                {employee?.name}
              </div>
            </div>
            <div
              className="flex border-b border-solid border-black"
              style={{ height: "12.7mm" }}
            >
              <div
                className="flex flex-col items-center justify-center font-bold"
                style={{ width: "18mm" }}
              >
                Chuyền, tổ
              </div>
              <div className="flex-1 flex justify-center items-center font-bold border-l border-solid border-black text-[13px] text-center">
                {employee?.department}
              </div>
            </div>
            <div
              className="flex border-b border-solid border-black"
              style={{ height: "10.05mm" }}
            >
              <div
                className="flex flex-col items-center justify-center font-bold"
                style={{ width: "18mm" }}
              >
                Chức vụ
              </div>
              <div className="flex-1 flex justify-center items-center font-bold border-l border-solid border-black text-[13px] text-center">
                {employee?.position}
              </div>
            </div>
            <div className="flex flex-1">
              <div
                className="flex justify-center items-center font-bold text-[16px]"
                style={{ width: "18mm" }}
              >
                {paddedId}
              </div>
              <div className="flex-1 flex items-center justify-center border-l border-solid border-black">
                <svg ref={barcodeRef}></svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        className="bg-black w-px"
        style={{
          height: _options.height,
        }}
      ></div>

      {/* Back Side */}
      <div
        className="flex-1 flex flex-col text-gray-900 border border-black text-[13px]"
        style={{
          width: _options.width,
          height: _options.height,
          backgroundColor: cardColor,
        }}
      >
        {/* Header */}
        <div className="text-center">
          <div
            className="leading-tight border-b border-solid border-black flex justify-between"
            style={{ height: "8.47mm" }}
          >
            <div className="">
              <div
                className="h-full p-1 flex justify-center"
                style={{ width: "12.17mm" }}
              >
                <img src={logoImage} className="h-full object-contain" />
              </div>
            </div>
            <div className="flex flex-col justify-center leading-3.5 flex-1 text-[13px] border-l border-solid border-black">
              <div className="font-bold">APACHE FOOTWEAR VIETNAM CO.,LTD</div>
            </div>
          </div>
          <div
            className="font-bold border-b border-solid border-black flex text-[13px] leading-3.5"
            style={{ height: "5.47mm" }}
          >
            <div>
              <div
                style={{ width: "12.17mm" }}
                className="h-full flex justify-center items-center text-center"
              >
                {employee?.departmentAbbr}
              </div>
            </div>
            <div className="border-l border-solid border-black flex-1 flex justify-center items-center text-center">
              {employee?.parentDepartmentCodeEn}
            </div>
            <div>
              <div
                style={{ width: "21.92mm" }}
                className="border-l border-solid border-black h-full flex justify-center items-center text-center"
              >
                {employee?.joinedDate}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="flex flex-col">
            <div className="">
              <div
                style={{ width: "19.53mm", height: "26.72mm" }}
                className="flex items-center justify-center bg-gray-100 overflow-hidden"
              >
                {images[paddedId]?.src ? (
                  <img
                    src={images[paddedId].src}
                    alt="employee"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span style={{ fontSize: "10px" }} className="text-gray-400">
                    Picture
                  </span>
                )}
              </div>
            </div>
            <div className="flex-1 flex flex-col leading-3 items-center justify-center font-bold border-t border-solid border-black">
              <QRCodeSVG
                value={ean13}
                size={50}
                level="L"
                includeMargin={false}
              />
            </div>
          </div>
          <div className="flex flex-col flex-1 border-l border-solid border-black">
            <div
              className="flex border-b border-solid border-black"
              style={{ height: "10.05mm" }}
            >
              <div
                className="flex flex-col items-center justify-center font-bold"
                style={{ width: "18mm" }}
              >
                Full name
              </div>
              <div className="flex-1 flex justify-center items-center font-bold border-l border-solid border-black text-[13px] text-center leading-3.5">
                {nameWithoutDiacritics}
              </div>
            </div>
            <div
              className="flex border-b border-solid border-black"
              style={{ height: "12.7mm" }}
            >
              <div
                className="flex flex-col items-center justify-center font-bold"
                style={{ width: "18mm" }}
              >
                Unit
              </div>
              <div className="flex-1 flex justify-center items-center font-bold border-l border-solid border-black text-[13px] text-center">
                {employee?.departmentEn}
              </div>
            </div>
            <div
              className="flex border-b border-solid border-black"
              style={{ height: "10.05mm" }}
            >
              <div
                className="flex flex-col items-center justify-center font-bold"
                style={{ width: "18mm" }}
              >
                Position
              </div>
              <div className="flex-1 flex justify-center items-center font-bold border-l border-solid border-black text-[13px] text-center">
                {employee?.positionEn}
              </div>
            </div>
            <div className="flex flex-1">
              <div
                className="flex justify-center items-center font-bold text-[16px]"
                style={{ width: "18mm" }}
              >
                {paddedId}
              </div>
              <div className="flex-1 flex items-center justify-center border-l border-solid border-black">
                <svg ref={barcodeRef2}></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ApacheIDCardOfficialQR = {
  id: "apache-official-qr",
  name: "Thẻ chính thức - QR",
  component: template,
  thumbnail: "💼",
};
