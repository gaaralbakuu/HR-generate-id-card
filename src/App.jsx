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
import { DataImportSection } from "@/components/DataImportSection"

export function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0])
  const [selectedEmployeeIndex, setSelectedEmployeeIndex] = useState(0)
  const [employeesList, setEmployeesList] = useState([
    {
      name: "John Doe",
      position: "Software Engineer",
      department: "IT Department",
      id: "EMP001",
      email: "john.doe@company.com",
      validUntil: "Dec 2026",
      photo: null
    }
  ])
  const [photoMap, setPhotoMap] = useState({})

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
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Menubar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 shadow-sm">
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
              <MenubarItem>Export as PNG</MenubarItem>
              <MenubarItem>Export as PDF</MenubarItem>
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
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Templates */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-800">Templates</h2>
            <p className="text-sm text-gray-500 mt-1">Choose a template for your ID card</p>
          </div>
          
          <ScrollArea className="flex-1 p-4">
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
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedTemplate.id === template.id
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
                    className={`p-3 cursor-pointer transition-all ${
                      selectedEmployeeIndex === idx
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
          </ScrollArea>
        </div>

        {/* Right Side - Preview */}
        <div className="flex-1 flex flex-col bg-gradient-to-br from-gray-100 to-gray-200">
          <div className="p-6 border-b border-gray-300 bg-white/50 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Preview</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Live preview of your ID card - {selectedTemplate.name}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print
                </Button>
              </div>
            </div>
          </div>

          {/* Preview Area */}
          <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
            <div className="transform transition-transform hover:scale-105">
              <TemplateComponent employee={employeeData} />
            </div>
          </div>

          {/* Footer Info */}
          <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-gray-300">
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Size:</span>
                <span>350 × 550 px</span>
              </div>
              <div className="h-4 w-px bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Format:</span>
                <span>ID Card</span>
              </div>
              <div className="h-4 w-px bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Template:</span>
                <span>{selectedTemplate.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App