import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import * as XLSX from "xlsx"
import { HugeiconsIcon } from "@hugeicons/react"
import { GoogleSheetIcon, Image02Icon } from "@hugeicons/core-free-icons/index"

export function DataImportSection({ onEmployeesImported, onPhotosImported, onPhotoSelect }) {
  const [excelFile, setExcelFile] = useState(null)
  const [photoFolder, setPhotoFolder] = useState(null)
  const [importStatus, setImportStatus] = useState("")

  const handleExcelImport = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setImportStatus("Đang xử lý file Excel...")
      const reader = new FileReader()
      
      reader.onload = (e) => {
        const data = e.target?.result
        const workbook = XLSX.read(data, { type: "array" })
        const worksheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonData = XLSX.utils.sheet_to_json(worksheet)

        // Transform Excel data to employee format
        const employees = jsonData.map((row, index) => ({
          id: row["ID"] || row["Employee ID"] || row["Mã nhân viên"] || `EMP${String(index + 1).padStart(3, "0")}`,
          name: row["Name"] || row["Full Name"] || row["Tên"] || `Employee ${index + 1}`,
          position: row["Position"] || row["Job Title"] || row["Chức vụ"] || "Staff",
          department: row["Department"] || row["Phòng ban"] || "General",
          email: row["Email"] || row["E-mail"] || row["Email công ty"] || "",
          validUntil: row["Valid Until"] || row["Hết hạn"] || "Dec 2026",
          photo: null,
        }))

        onEmployeesImported(employees)
        setImportStatus(`✓ Đã nhập thành công ${employees.length} nhân viên!`)
        setExcelFile(file.name)
        
        setTimeout(() => setImportStatus(""), 3000)
      }

      reader.readAsArrayBuffer(file)
    } catch (error) {
      setImportStatus(`✗ Lỗi: ${error.message}`)
      setTimeout(() => setImportStatus(""), 3000)
    }
  }

  const handlePhotoImport = async (event) => {
    const files = event.target.files
    if (!files) return

    try {
      setImportStatus("Đang xử lý ảnh...")
      const photoMap = {}

      // Read all image files
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const fileName = file.name.toLowerCase()
        
        // Extract employee ID or name from filename
        // Support formats: EMP001.jpg, emp_001.jpg, john_doe.jpg, etc.
        const baseName = fileName.split(".")[0]
        
        const reader = new FileReader()
        reader.onload = (e) => {
          photoMap[baseName] = {
            src: e.target?.result,
            fileName: file.name
          }
        }
        reader.readAsDataURL(file)
      }

      // Store photo map for later use
      onPhotosImported(photoMap)
      setImportStatus(`✓ Đã nhập ${files.length} ảnh thành công!`)
      setPhotoFolder(`${files.length} ảnh`)
      
      setTimeout(() => setImportStatus(""), 3000)
    } catch (error) {
      setImportStatus(`✗ Lỗi: ${error.message}`)
      setTimeout(() => setImportStatus(""), 3000)
    }
  }

  return (
    <div className="space-y-4">
      {/* Excel Import */}
      <div>
        <Label className="text-xs text-gray-600 font-semibold uppercase tracking-wide">
          <HugeiconsIcon icon={GoogleSheetIcon} /> Import Danh Sách Nhân Viên
        </Label>
        <p className="text-xs text-gray-500 mt-1 mb-2">
          Chọn file Excel (.xlsx) chứa thông tin nhân viên
        </p>
        <div className="relative">
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleExcelImport}
            className="hidden"
            id="excel-input"
          />
          <label
            htmlFor="excel-input"
            className="block"
          >
            <Button
              variant="outline"
              className="w-full cursor-pointer hover:bg-blue-50 hover:border-blue-300"
              size="sm"
              asChild
            >
              <span>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {excelFile ? `✓ ${excelFile}` : "Chọn file Excel"}
              </span>
            </Button>
          </label>
        </div>
      </div>

      {/* Photo Import */}
      <div>
        <Label className="text-xs text-gray-600 font-semibold uppercase tracking-wide">
          <HugeiconsIcon icon={Image02Icon} /> Import Ảnh Nhân Viên
        </Label>
        <p className="text-xs text-gray-500 mt-1 mb-2">
          Chọn thư mục chứa ảnh (đặt tên theo mã nhân viên: EMP001.jpg)
        </p>
        <div className="relative">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handlePhotoImport}
            className="hidden"
            id="photo-input"
          />
          <label
            htmlFor="photo-input"
            className="block"
          >
            <Button
              variant="outline"
              className="w-full cursor-pointer hover:bg-green-50 hover:border-green-300"
              size="sm"
              asChild
            >
              <span>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {photoFolder ? `✓ ${photoFolder}` : "Chọn ảnh"}
              </span>
            </Button>
          </label>
        </div>
      </div>

      {/* Status Message */}
      {importStatus && (
        <div className={`text-xs p-2 rounded ${
          importStatus.startsWith("✓") 
            ? "bg-green-100 text-green-700 border border-green-300"
            : "bg-red-100 text-red-700 border border-red-300"
        }`}>
          {importStatus}
        </div>
      )}
    </div>
  )
}
