import { useState, useRef } from 'react';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from '@/components/ui/menubar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { templates } from '@/components/IDCardTemplates';
import { ApacheIDCardProbation } from '@/components/card-template/ApacheIDCardProbation';
import { DataImportSection } from '@/components/DataImportSection';
import { EmployeeManagementModal } from '@/components/EmployeeManagementModal';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { HugeiconsIcon } from '@hugeicons/react';
import { Cursor01Icon, Database02Icon, FourFinger03Icon } from '@hugeicons/core-free-icons/index';
import { startTour } from '@/lib/tourGuide';

const MOCK_EMPLOYEES = [
  {
    name: 'PHÙNG NGUYỄN TƯỜNG VY',
    position: 'NHÂN VIÊN',
    positionEn: 'STAFF',
    department: 'Production',
    departmentAbbr: 'SX',
    departmentEn: 'Production',
    team: 'Team A',
    teamEn: 'Team A',
    id: '0029387',
    validUntil: '2/7/2026',
    joinedDate: '10/12/2025',
    photo: null,
  }
];

export function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(
    ApacheIDCardProbation
  );
  const [selectedEmployeeIndex, setSelectedEmployeeIndex] = useState(0);
  const [employeesList, setEmployeesList] = useState(MOCK_EMPLOYEES);
  const [photoMap, setPhotoMap] = useState({});
  const [isManagementModalOpen, setIsManagementModalOpen] = useState(false);
  const [images, setImages] = useState({});
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isPanMode, setIsPanMode] = useState(false);
  const [panStart, setPanStart] = useState(null);
  const previewContainerRef = useRef(null);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 10, 50));
  };

  const handlePanStart = (e) => {
    if (!isPanMode) return;
    setPanStart({
      x: e.clientX,
      y: e.clientY,
      scrollLeft: previewContainerRef.current?.scrollLeft || 0,
      scrollTop: previewContainerRef.current?.scrollTop || 0,
    });
  };

  const handlePanMove = (e) => {
    if (!isPanMode || !panStart) return;
    const container = previewContainerRef.current;
    if (!container) return;

    const deltaX = e.clientX - panStart.x;
    const deltaY = e.clientY - panStart.y;

    container.scrollLeft = panStart.scrollLeft - deltaX;
    container.scrollTop = panStart.scrollTop - deltaY;
  };

  const handlePanEnd = () => {
    setPanStart(null);
  };

  const employeeData = employeesList[selectedEmployeeIndex];
  const TemplateComponent = selectedTemplate.component;

  const handleInputChange = (field, value) => {
    setEmployeesList((prev) => {
      const updated = [...prev];
      updated[selectedEmployeeIndex] = {
        ...updated[selectedEmployeeIndex],
        [field]: value,
      };
      return updated;
    });
  };

  const handleEmployeesImported = (employees) => {
    setEmployeesList(employees);
    setSelectedEmployeeIndex(0);
  };

  const handlePhotosImported = (photos) => {
    setPhotoMap(photos);

    // Try to match photos to employees by ID or name
    setEmployeesList((prev) =>
      prev.map((emp) => {
        const empIdLower = emp.id.toLowerCase().replace(/\s+/g, '_');
        const empNameLower = emp.name.toLowerCase().replace(/\s+/g, '_');

        // Look for matching photo
        for (const [photoKey, photoData] of Object.entries(photos)) {
          const keyLower = photoKey.toLowerCase();
          if (
            keyLower.includes(empIdLower) ||
            keyLower.includes(empNameLower)
          ) {
            return { ...emp, photo: photoData.src };
          }
        }

        return emp;
      })
    );
  };

  return (
    <div
      className='h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 select-none'
      id='app-container'
    >
      {/* Menubar */}
      <div className='hidden-on-print bg-white border-b border-gray-200 px-4 py-2 shadow-sm'>
        <Menubar className='bg-white border-0 p-0'>
          {/* <MenubarMenu>
            <MenubarTrigger className='font-semibold cursor-pointer'>
              File
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New Card</MenubarItem>
              <MenubarItem>Open Template</MenubarItem>
              <MenubarItem>Save</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Print</MenubarItem>
            </MenubarContent>
          </MenubarMenu> */}

          <MenubarMenu>
            <MenubarTrigger className='font-semibold cursor-pointer'>
              View
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={handleZoomIn}>
                Zoom In
              </MenubarItem>
              <MenubarItem onClick={handleZoomOut}>
                Zoom Out
              </MenubarItem>
              <MenubarItem onClick={() => setZoomLevel(100)}>
                Actual Size
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={() => document.documentElement.requestFullscreen()}>
                Fullscreen
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          {/* <MenubarMenu>
            <MenubarTrigger className='font-semibold cursor-pointer'>
              Help
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Documentation</MenubarItem>
              <MenubarItem>Keyboard Shortcuts</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>About</MenubarItem>
            </MenubarContent>
          </MenubarMenu> */}

          <div className='ml-auto flex items-center gap-3'>
            <Button
              onClick={() => startTour({ onOpenModal: () => setIsManagementModalOpen(true) })}
              variant='outline'
              size='sm'
              className='text-xs'
            >
              🎯 Hướng dẫn
            </Button>
            <Badge
              variant='outline'
              className='bg-blue-50 text-blue-700 border-blue-200'
            >
              ID Card Studio v1.0
            </Badge>
          </div>
        </Menubar>
      </div>

      {/* Main Content */}
      <ResizablePanelGroup
        direction='vertical'
        className='flex-1 flex overflow-hidden'
      >
        {/* Left Sidebar - Templates */}
        <ResizablePanel
          minSize={320}
          maxSize={620}
          defaultSize={320}
          className='hidden-on-print w-80 bg-white border-r border-gray-200 flex flex-col shadow-sm'
          id='sidebar-panel'
        >
          <ScrollArea className='flex-1'>
            <div className='p-4 space-y-3 overflow-hidden'>
              {/* Management Button */}
              <Button
                id='btn-management-data'
                onClick={() => setIsManagementModalOpen(true)}
                className='w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 rounded-lg transition-all shadow-md hover:shadow-lg mb-4'
              >

                <div className='flex items-start gap-1'>
                  <HugeiconsIcon icon={Database02Icon} className='size-4' />
                  Quản lý dữ liệu
                </div>
              </Button>

              {/* Templates Section */}
              <div className='space-y-3 overflow-hidden'>
                <h3 className='text-sm font-bold text-gray-800 mb-3'>
                  Templates
                </h3>
                {templates.map((template) => (
                  <Card
                    key={template.id}
                    className={`p-4 cursor-pointer transition-all overflow-hidden ${selectedTemplate.id === template.id
                      ? 'border border-blue-500 bg-blue-50'
                      : 'border border-gray-200 hover:border-gray-300'
                      }`}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <div className='flex items-center gap-3 overflow-hidden flex-1'>
                      <div className='text-3xl'>{template.thumbnail}</div>
                      <div className='flex-1 overflow-hidden'>
                        <h3 className='font-semibold text-gray-800 text-sm truncate overflow-hidden'>
                          {template.name}
                        </h3>
                        <p className='text-xs text-gray-500 mt-0.5'>
                          {selectedTemplate.id === template.id
                            ? 'Selected'
                            : 'Click to select'}
                        </p>
                      </div>
                      {selectedTemplate.id === template.id && (
                        <div className='text-blue-500'>
                          <svg
                            className='w-5 h-5'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                          >
                            <path
                              fillRule='evenodd'
                              d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                              clipRule='evenodd'
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle
          withHandle={true}
          className={'outline-0 w-px'}
          id='divider-panel'
        />
        {/* Right Side - Preview */}
        <ResizablePanel className='flex-1 flex flex-col bg-linear-to-br from-gray-100 to-gray-200'>
          <div className='p-2 border-b border-gray-300 bg-white/50 backdrop-blur-sm hidden-on-print'>
            <div className='flex items-center justify-between'>
              <div>
                <h2 className='text-sm font-bold text-gray-800'>A4 Preview</h2>
                <p className='text-xs text-gray-600'>
                  4 ID Cards (Front & Back) - Optimized for A4 printing
                </p>
              </div>
              <div className='flex gap-2 items-center'>
                <Button
                  size='sm'
                  variant={isPanMode ? 'outline' : 'default'}
                  onClick={() => setIsPanMode(false)}
                  className={`px-1.5 ${!isPanMode ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                  title='Select mode'
                >
                  <HugeiconsIcon icon={Cursor01Icon} />
                </Button>
                <Button
                  size='sm'
                  variant={isPanMode ? 'default' : 'outline'}
                  onClick={() => setIsPanMode(true)}
                  className={`px-1.5 ${isPanMode ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                  title='Drag mode'
                >
                  <HugeiconsIcon icon={FourFinger03Icon} />
                </Button>
                <div className='h-6 w-px bg-gray-300 mx-1'></div>
                <Button
                  size='sm'
                  variant='outline'
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 50}
                  className={"px-1.5"}
                >
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M20 12H4'
                    />
                  </svg>
                </Button>
                <span className='text-sm font-semibold text-gray-700 w-12 text-center'>
                  {zoomLevel}%
                </span>
                <Button
                  size='sm'
                  variant='outline'
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 200}
                  className={"px-1.5"}
                >
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 4v16m8-8H4'
                    />
                  </svg>
                </Button>
                <div className='h-6 w-px bg-gray-300 mx-1'></div>
                <Button
                  size='sm'
                  className='bg-blue-600 hover:bg-blue-700'
                  onClick={() => window.print()}
                  id='btn-print-a4'
                >
                  <svg
                    className='w-4 h-4 mr-2'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z'
                    />
                  </svg>
                  Print
                </Button>
              </div>
            </div>
          </div>

          {/* A4 Preview Area */}
          <div
            ref={previewContainerRef}
            className={`flex-1 overflow-auto bg-[#eaedee] ${isPanMode ? (panStart ? 'cursor-grabbing select-none' : 'cursor-grab') : 'cursor-auto select-text'}`}
            id='a4-preview-container'
            onMouseDown={handlePanStart}
            onMouseMove={handlePanMove}
            onMouseUp={handlePanEnd}
            onMouseLeave={handlePanEnd}
          >
            {/* Multiple A4 Pages */}
            <div className='p-4 w-full'>
              <div className='flex flex-col gap-4 mx-auto w-fit' id='printable-area' style={{ zoom: `${zoomLevel}%`}}>
                {Array.from({
                  length: Math.ceil(employeesList.length / 4),
                }).map((_, pageIndex) => (
                  <div key={pageIndex}>
                    <div
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
                      <div className='h-full flex flex-col justify-start w-full'>
                        {Array.from({ length: 4 }).map((_, rowIndex) => {
                          const cardIndex = pageIndex * 4 + rowIndex;
                          const employee = employeesList[cardIndex];

                          if (!employee) return null;

                          return (
                            <div
                              key={cardIndex}
                              className='flex justify-center'
                            >
                              <div
                                style={{ width: '184mm', height: '58.47mm' }}
                                className='bg-gray-50 border border-gray-200 overflow-hidden flex-1'
                              >
                                <TemplateComponent
                                  employee={employee}
                                  options={{ width: '92mm', height: '58mm' }}
                                  images={images}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className='hidden-on-print p-2 bg-white/80 backdrop-blur-sm border-t border-gray-300 text-sm'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-4 text-xs text-gray-600'>
                <div className='flex items-center gap-2'>
                  <span className='font-semibold'>Paper:</span>
                  <span>A4 (210 × 297 mm)</span>
                </div>
                <div className='h-4 w-px bg-gray-300'></div>
                <div className='flex items-center gap-2'>
                  <span className='font-semibold'>Card Size:</span>
                  <span>190.5 × 58.47 mm</span>
                </div>
                <div className='h-4 w-px bg-gray-300'></div>
                <div className='flex items-center gap-2'>
                  <span className='font-semibold'>Total Cards:</span>
                  <span>{employeesList.length}</span>
                </div>
                <div className='h-4 w-px bg-gray-300'></div>
                <div className='flex items-center gap-2'>
                  <span className='font-semibold'>Pages:</span>
                  <span>{Math.ceil(employeesList.length / 4)}</span>
                </div>
                <div className='h-4 w-px bg-gray-300'></div>
                <div className='flex items-center gap-2'>
                  <span className='font-semibold'>Template:</span>
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
        employees={employeesList}
        onEmployeesChange={setEmployeesList}
        onImagesChange={setImages}
      />
    </div>
  );
}

export default App;
