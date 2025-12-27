import React from 'react';
import IDCard from './IDCard';

const PrintLayout = ({ employees, photos }) => {
  // We need to chunk employees into groups of 4 for each page
  const chunks = [];
  for (let i = 0; i < employees.length; i += 4) {
    chunks.push(employees.slice(i, i + 4));
  }

  // A4 dimensions are 210mm x 297mm
  // We want to center the grid on the page

  return (
    <div id="print-area" className="print:block hidden bg-white">
      {chunks.map((chunk, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {/* Front Page */}
          <div className="w-[210mm] h-[297mm] relative mx-auto p-10 page-break-after">
            <div className="grid grid-cols-2 gap-x-[10mm] gap-y-[10mm] justify-center content-start h-full pt-[20mm]">
              {chunk.map((emp, idx) => {
                  const photo = photos.find(p => p.id === emp.id.toString());
                  return (
                    <div key={`front-${emp.id}`} className="flex justify-center">
                        <IDCard employee={emp} photoUrl={photo?.url} side="front" />
                    </div>
                  );
              })}
            </div>
            {/* Cut marks or guides could be added here */}
            <div className="absolute bottom-5 left-0 w-full text-center text-xs text-gray-400">
                Page {pageIndex * 2 + 1} (Front)
            </div>
          </div>

          {/* Back Page */}
          <div className="w-[210mm] h-[297mm] relative mx-auto p-10 page-break-after">
            <div className="grid grid-cols-2 gap-x-[10mm] gap-y-[10mm] justify-center content-start h-full pt-[20mm]">
               {/*
                  Standard Double-Sided Printing (Long-Edge Binding):
                  Front Page:
                  1 | 2
                  3 | 4

                  Back Page (Physical sheet flipped):
                  2 | 1
                  4 | 3

                  So we need to reorder the chunk for the back page display
                  [1, 2, 3, 4] -> [2, 1, 4, 3]
               */}
               {chunk.length > 0 && [
                   chunk[1] || null, // Slot 1 gets Card 2
                   chunk[0] || null, // Slot 2 gets Card 1
                   chunk[3] || null, // Slot 3 gets Card 4
                   chunk[2] || null  // Slot 4 gets Card 3
               ].map((emp, idx) => {
                   if (!emp) return <div key={`back-empty-${idx}`} className="w-[85.6mm] h-[54mm]"></div>; // Empty placeholder
                   return (
                     <div key={`back-${emp.id}`} className="flex justify-center">
                         <IDCard employee={emp} side="back" />
                     </div>
                   );
               })}
            </div>
            <div className="absolute bottom-5 left-0 w-full text-center text-xs text-gray-400">
                Page {pageIndex * 2 + 2} (Back - Standard Duplex)
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default PrintLayout;
