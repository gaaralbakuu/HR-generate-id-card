import React, { useState } from 'react';
import { ImagePlus, X } from 'lucide-react';

const PhotoUploader = ({ onUpload }) => {
  const [previewImages, setPreviewImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newImages = files.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file),
      id: file.name.split('.')[0] // Assume filename without extension is ID
    }));

    setPreviewImages(prev => [...prev, ...newImages]);
    onUpload(newImages);
  };

  const removeImage = (index) => {
      setPreviewImages(prev => {
          const updated = [...prev];
          updated.splice(index, 1);
          return updated;
      });
      // We might want to notify parent about removal too, but for now just appending is fine
      // as the parent logic will likely map based on ID and take the latest or all.
      // However, to keep it sync, we should probably pass the full list to onUpload or handle removal in parent.
      // For simplicity let's just allow adding for now or improve later.
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <ImagePlus className="w-10 h-10 text-gray-400 mb-2" />
        <span className="text-sm font-medium text-gray-600">
          Upload Employee Photos
        </span>
        <span className="text-xs text-gray-500 mt-1">Filename should match Employee ID</span>
      </div>

      {previewImages.length > 0 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-40 overflow-y-auto p-2 border rounded bg-white">
          {previewImages.map((img, idx) => (
            <div key={idx} className="relative group">
               <img src={img.url} alt={img.name} className="w-full h-20 object-cover rounded" />
               <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                   <span className="text-white text-[10px] truncate px-1">{img.id}</span>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoUploader;
