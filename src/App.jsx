import { useState } from "react"
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from "@/components/ui/menubar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { templates } from "@/components/IDCardTemplates"
import { ApacheIDCardProbation } from "@/components/card-template/ApacheIDCardProbation"
import { DataImportSection } from "@/components/DataImportSection"
import { EmployeeManagementModal } from "@/components/EmployeeManagementModal"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

const MOCK_EMPLOYEES = [
  {
    name: "PHÙNG NGUYỄN TƯỜNG VY",
    position: "NHÂN VIÊN",
    department: "Production",
    id: "0029387",
    email: "vy.phuong@apache.com",
    validUntil: "2/7/2026",
    joinedDate: "10/12/2025",
    photo: null
  },
  {
    name: "TRẦN VĂN AN",
    position: "QUẢN LÝ",
    department: "Sales",
    id: "0029388",
    email: "an.tran@apache.com",
    validUntil: "15/8/2026",
    joinedDate: "5/1/2025",
    photo: null
  },
  {
    name: "LÊ THỊ BÌNH",
    position: "NHÂN VIÊN",
    department: "HR",
    id: "0029389",
    email: "binh.le@apache.com",
    validUntil: "30/9/2026",
    joinedDate: "12/3/2025",
    photo: null
  },
  {
    name: "NGUYỄN HỮU CHIẾN",
    position: "KỸSƯ",
    department: "Technical",
    id: "0029390",
    email: "chien.nguyen@apache.com",
    validUntil: "20/6/2026",
    joinedDate: "1/11/2024",
    photo: null
  },
  {
    name: "HOÀNG THỊ DỊU",
    position: "NHÂN VIÊN",
    department: "Finance",
    id: "0029391",
    email: "diu.hoang@apache.com",
    validUntil: "10/7/2026",
    joinedDate: "15/2/2025",
    photo: null
  },
  {
    name: "PHẠM VĂN DỨC",
    position: "TRƯỞNG PHÒNG",
    department: "Production",
    id: "0029392",
    email: "duc.pham@apache.com",
    validUntil: "25/12/2026",
    joinedDate: "20/5/2024",
    photo: null
  },
  {
    name: "VŨ THỊ HƯƠNG",
    position: "NHÂN VIÊN",
    department: "Marketing",
    id: "0029393",
    email: "huong.vu@apache.com",
    validUntil: "5/8/2026",
    joinedDate: "8/4/2025",
    photo: null
  },
  {
    name: "ĐỖ VĂN KIÊN",
    position: "NHÂN VIÊN",
    department: "IT Support",
    id: "0029394",
    email: "kien.do@apache.com",
    validUntil: "18/9/2026",
    joinedDate: "22/1/2025",
    photo: null
  },
  {
    name: "NGUYỄN THỊ LAN",
    position: "ADMIN",
    department: "Administration",
    id: "0029395",
    email: "lan.nguyen@apache.com",
    validUntil: "12/11/2026",
    joinedDate: "9/6/2025",
    photo: null
  }
]

export function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(ApacheIDCardProbation)
  const [selectedEmployeeIndex, setSelectedEmployeeIndex] = useState(0)
  const [employeesList, setEmployeesList] = useState(MOCK_EMPLOYEES)
  const [photoMap, setPhotoMap] = useState({})
  const [isManagementModalOpen, setIsManagementModalOpen] = useState(false)

  const employeeData = employeesList[selectedEmployeeIndex]
  const TemplateComponent = selectedTemplate.component

  const handleInputChange = (field, value) => {
    setEmployeesList(prev => {
      const updated = [...prev]
      updated[selectedEmployeeIndex] = { ...updated[selectedEmployeeIndex], [field]: value }
      return updated
    })
  }

  const handleEmployeesImported = (employees) => {
    setEmployeesList(employees)
    setSelectedEmployeeIndex(0)
  }

  const handlePhotosImported = (photos) => {
    setPhotoMap(photos)

    // Try to match photos to employees by ID or name
    setEmployeesList(prev => prev.map(emp => {
      const empIdLower = emp.id.toLowerCase().replace(/\s+/g, "_")
      const empNameLower = emp.name.toLowerCase().replace(/\s+/g, "_")

      // Look for matching photo
      for (const [photoKey, photoData] of Object.entries(photos)) {
        const keyLower = photoKey.toLowerCase()
        if (keyLower.includes(empIdLower) || keyLower.includes(empNameLower)) {
          return { ...emp, photo: photoData.src }
        }
      }

      return emp
    }))
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100" id="app-container">
      {/* Menubar */}
      <div className="hidden-on-print bg-white border-b border-gray-200 px-4 py-2 shadow-sm">
        <Menubar className="bg-white border-0 p-0">
          <MenubarMenu>
            <MenubarTrigger className="font-semibold cursor-pointer">
              File
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New Card</MenubarItem>
              <MenubarItem>Open Template</MenubarItem>
              <MenubarItem>Save</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Print</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="font-semibold cursor-pointer">
              Edit
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Undo</MenubarItem>
              <MenubarItem>Redo</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Cut</MenubarItem>
              <MenubarItem>Copy</MenubarItem>
              <MenubarItem>Paste</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="font-semibold cursor-pointer">
              View
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Zoom In</MenubarItem>
              <MenubarItem>Zoom Out</MenubarItem>
              <MenubarItem>Actual Size</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Fullscreen</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="font-semibold cursor-pointer">
              Help
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Documentation</MenubarItem>
              <MenubarItem>Keyboard Shortcuts</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>About</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <div className="ml-auto flex items-center gap-3">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              ID Card Studio v1.0
            </Badge>
          </div>
        </Menubar>
      </div>

      {/* Main Content */}
      <ResizablePanelGroup direction="vertical" className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Templates */}
        <ResizablePanel minSize={320} maxSize={620} defaultSize={400} className="hidden-on-print w-80 bg-white border-r border-gray-200 flex flex-col shadow-sm" id="sidebar-panel">

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-3">
            {/* Management Button */}
            <Button
              onClick={() => setIsManagementModalOpen(true)}
              className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 rounded-lg transition-all shadow-md hover:shadow-lg mb-4"
            >
              <svg className="w-5 h-5 mr-2 inline" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.5 1.5H3.75A2.25 2.25 0 001.5 3.75v12.5A2.25 2.25 0 003.75 18.5h12.5a2.25 2.25 0 002.25-2.25V9.5M10.5 1.5v4M10.5 1.5L19.5 10.5M10.5 5.5h4M4 11.5h8M4 14.5h6" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
              Quản Lý Nhân Viên
            </Button>

            {/* Import Section */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <DataImportSection
                onEmployeesImported={handleEmployeesImported}
                onPhotosImported={handlePhotosImported}
              />
            </div>

            {/* Templates Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-800 mb-3">Templates</h3>
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${selectedTemplate.id === template.id
                    ? 'border-2 border-blue-500 bg-blue-50'
                    : 'border border-gray-200 hover:border-gray-300'
                    }`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{template.thumbnail}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-sm">{template.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {selectedTemplate.id === template.id ? 'Selected' : 'Click to select'}
                      </p>
                    </div>
                    {selectedTemplate.id === template.id && (
                      <div className="text-blue-500">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {/* Employees List Section */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-bold text-gray-800 mb-3">
                Danh Sách Nhân Viên ({employeesList.length})
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {employeesList.map((emp, idx) => (
                  <Card
                    key={idx}
                    className={`p-3 cursor-pointer transition-all ${selectedEmployeeIndex === idx
                      ? 'border-2 border-green-500 bg-green-50'
                      : 'border border-gray-200 hover:border-gray-300'
                      }`}
                    onClick={() => setSelectedEmployeeIndex(idx)}
                  >
                    <div className="flex items-center gap-2">
                      {emp.photo && (
                        <img
                          src={emp.photo}
                          alt={emp.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-800 truncate">{emp.name}</p>
                        <p className="text-xs text-gray-500 truncate">{emp.id}</p>
                      </div>
                      {selectedEmployeeIndex === idx && (
                        <div className="text-green-600">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Employee Data Form */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-bold text-gray-800 mb-3">Chỉnh Sửa Thông Tin</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="name" className="text-xs text-gray-600">Full Name</Label>
                  <Input
                    id="name"
                    value={employeeData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="position" className="text-xs text-gray-600">Position</Label>
                  <Input
                    id="position"
                    value={employeeData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="department" className="text-xs text-gray-600">Department</Label>
                  <Input
                    id="department"
                    value={employeeData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="id" className="text-xs text-gray-600">Employee ID</Label>
                  <Input
                    id="id"
                    value={employeeData.id}
                    onChange={(e) => handleInputChange('id', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-xs text-gray-600">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={employeeData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="validUntil" className="text-xs text-gray-600">Valid Until</Label>
                  <Input
                    id="validUntil"
                    value={employeeData.validUntil}
                    onChange={(e) => handleInputChange('validUntil', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-xs text-gray-600">Photo</Label>
                  <Button variant="outline" className="w-full mt-1" size="sm">
                    Upload Photo
                  </Button>
                </div>
              </div>
            </div>
            </div>
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle={true} className={"outline-0 w-px"} id="divider-panel" />
        {/* Right Side - Preview */}
        <ResizablePanel className="flex-1 flex flex-col bg-linear-to-br from-gray-100 to-gray-200">
          <div className="p-2 border-b border-gray-300 bg-white/50 backdrop-blur-sm hidden-on-print">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-gray-800">A4 Preview</h2>
                <p className="text-xs text-gray-600">
                  4 ID Cards (Front & Back) - Optimized for A4 printing
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => window.print()}>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print
                </Button>
              </div>
            </div>
          </div>

          {/* A4 Preview Area */}
          <div className="flex-1 overflow-auto bg-[#eaedee]" id="a4-preview-container">
            {/* Multiple A4 Pages */}
            <div className="flex justify-center p-4 w-full">
            <div className="flex flex-col gap-4" id="printable-area">
              {Array.from({ length: Math.ceil(employeesList.length / 4) }).map((_, pageIndex) => (
                <div>
                  <div
                    key={pageIndex}
                    style={{
                      width: '210mm',
                      height: '297mm',
                      padding: '16mm',
                      boxSizing: 'border-box',
                      backgroundColor: 'white',
                      border: '1px solid #b7b7b7',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    {/* Card Layout - 4 rows per page */}
                    <div className="h-full flex flex-col gap-2.5 justify-start w-full">
                      {Array.from({ length: 4 }).map((_, rowIndex) => {
                        const cardIndex = pageIndex * 4 + rowIndex
                        const employee = employeesList[cardIndex]

                        if (!employee) return null

                        return (
                          <div key={cardIndex} className="flex justify-center">
                            <div style={{ width: '184mm', height: '58.47mm' }} className="bg-gray-50 rounded border border-gray-200 overflow-hidden">
                              <TemplateComponent employee={employee} options={{ width: "92mm", height: "57.94mm" }} />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="hidden-on-print p-2 bg-white/80 backdrop-blur-sm border-t border-gray-300 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Paper:</span>
                  <span>A4 (210 × 297 mm)</span>
                </div>
                <div className="h-4 w-px bg-gray-300"></div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Card Size:</span>
                  <span>190.5 × 58.47 mm</span>
                </div>
                <div className="h-4 w-px bg-gray-300"></div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Total Cards:</span>
                  <span>{employeesList.length}</span>
                </div>
                <div className="h-4 w-px bg-gray-300"></div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Pages:</span>
                  <span>{Math.ceil(employeesList.length / 4)}</span>
                </div>
                <div className="h-4 w-px bg-gray-300"></div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Template:</span>
                  <span>{selectedTemplate.name}</span>
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Employee Management Modal */}
      <EmployeeManagementModal
        isOpen={isManagementModalOpen}
        onClose={() => setIsManagementModalOpen(false)}
      />
    </div>
  )
}

export default App