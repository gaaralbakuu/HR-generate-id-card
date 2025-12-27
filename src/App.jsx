import React, { useState } from 'react';
import ExcelUploader from './components/ExcelUploader';
import PhotoUploader from './components/PhotoUploader';
import IDCard from './components/IDCard';
import PrintLayout from './components/PrintLayout';
import { Printer, LayoutTemplate, Users, FileSpreadsheet } from 'lucide-react';
import { cn } from './lib/utils';

function App() {
  const [employees, setEmployees] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [activeTab, setActiveTab] = useState('data'); // data, preview

  const handleExcelUpload = (data) => {
    setEmployees(data);
  };

  const handlePhotoUpload = (newPhotos) => {
    setPhotos(prev => {
        // Create a map of existing photos by ID
        const map = new Map(prev.map(p => [p.id, p]));
        // Update or add new photos
        newPhotos.forEach(p => map.set(p.id, p));
        return Array.from(map.values());
    });
  };

  const handlePrint = () => {
    window.print();
  };

  // Preview logic: Show first few cards
  const previewEmployees = employees.slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="bg-blue-600 text-white p-1.5 rounded-lg">
               <LayoutTemplate className="w-6 h-6" />
             </div>
             <h1 className="text-xl font-bold tracking-tight">ID Card Generator</h1>
          </div>
          <button
             onClick={handlePrint}
             disabled={employees.length === 0}
             className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Printer className="w-4 h-4" />
            Print Cards
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:hidden">

        {/* Tabs / Steps */}
        <div className="flex space-x-1 rounded-xl bg-gray-200 p-1 mb-8 max-w-md mx-auto">
             <button
                onClick={() => setActiveTab('data')}
                className={cn(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  activeTab === 'data'
                  ? "bg-white text-blue-700 shadow"
                  : "text-gray-600 hover:bg-white/[0.12] hover:text-gray-800"
                )}
             >
                Data & Photos
             </button>
             <button
                onClick={() => setActiveTab('preview')}
                className={cn(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  activeTab === 'preview'
                  ? "bg-white text-blue-700 shadow"
                  : "text-gray-600 hover:bg-white/[0.12] hover:text-gray-800"
                )}
             >
                Preview
             </button>
        </div>

        {activeTab === 'data' && (
            <div className="grid md:grid-cols-2 gap-8">
                {/* Excel Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <FileSpreadsheet className="w-5 h-5 text-green-600" />
                        <h2 className="text-lg font-semibold">1. Import Data</h2>
                    </div>
                    <ExcelUploader onUpload={handleExcelUpload} />

                    {employees.length > 0 && (
                        <div className="mt-4">
                            <p className="text-sm text-green-600 font-medium mb-2">Successfully loaded {employees.length} employees.</p>
                            <div className="max-h-60 overflow-y-auto border rounded text-sm">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-gray-50 sticky top-0">
                                        <tr>
                                            <th className="p-2 border-b">ID</th>
                                            <th className="p-2 border-b">Name</th>
                                            <th className="p-2 border-b">Role</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employees.map((emp, i) => (
                                            <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                                                <td className="p-2 font-mono">{emp.id}</td>
                                                <td className="p-2">{emp.name}</td>
                                                <td className="p-2 text-gray-500">{emp.position}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                {/* Photo Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Users className="w-5 h-5 text-blue-600" />
                        <h2 className="text-lg font-semibold">2. Upload Photos</h2>
                    </div>
                    <PhotoUploader onUpload={handlePhotoUpload} />

                    {photos.length > 0 && (
                         <div className="mt-4 text-sm text-gray-500">
                             {photos.length} photos uploaded.
                         </div>
                    )}
                </div>
            </div>
        )}

        {activeTab === 'preview' && (
            <div className="space-y-8">
                 <div className="flex items-center justify-between">
                     <h2 className="text-2xl font-bold">Card Preview</h2>
                     <p className="text-gray-500">Showing first 4 cards. Use Print to see all.</p>
                 </div>

                 {employees.length === 0 ? (
                     <div className="text-center py-20 bg-white rounded-xl border border-dashed">
                         <p className="text-gray-500">Please import data first.</p>
                     </div>
                 ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {previewEmployees.map((emp) => {
                            const photo = photos.find(p => p.id === emp.id.toString());
                            return (
                                <div key={emp.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center gap-4">
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium text-center text-gray-500">Front</p>
                                        <IDCard employee={emp} photoUrl={photo?.url} side="front" />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium text-center text-gray-500">Back</p>
                                        <IDCard employee={emp} side="back" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                 )}
            </div>
        )}

      </main>

      {/* Hidden Print Layout */}
      <PrintLayout employees={employees} photos={photos} />

    </div>
  );
}

export default App;
