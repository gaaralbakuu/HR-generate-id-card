import { useState } from 'react';

// Predefined colors constant
const CARD_COLORS = [
  { hex: "#ff0000", label: "Red" },
  { hex: "#0000ff", label: "Blue" },
  { hex: "#00ff00", label: "Green" },
  { hex: "#ffff00", label: "Yellow" },
  { hex: "#000000", label: "Black" },
  { hex: "#ffffff", label: "White" },
  { hex: "#ff9900", label: "Orange" },
];

export function CardColorSelector({ selectedColor, onColorChange }) {
  const [customColor, setCustomColor] = useState(selectedColor);

  const handleColorClick = (color) => {
    onColorChange(color);
    setCustomColor(color);
  };

  const handleCustomColorChange = (e) => {
    const color = e.target.value;
    setCustomColor(color);
    onColorChange(color);
  };

  return (
    <div className='space-y-3 overflow-hidden'>
      <h3 className='text-sm font-bold text-gray-800'>Card Color</h3>
      
      {/* Color Swatches */}
      <div className='flex flex-wrap gap-2'>
        {CARD_COLORS.map((color) => (
          <button
            key={color.hex}
            onClick={() => handleColorClick(color.hex)}
            title={color.label}
            className={`w-10 h-10 rounded-lg transition-all hover:scale-110 cursor-pointer ${
              selectedColor === color.hex
                ? 'ring-2 ring-offset-2 ring-gray-400 scale-110'
                : 'ring-1 ring-gray-300 hover:ring-gray-400'
            }`}
            style={{ backgroundColor: color.hex }}
            aria-label={`Select ${color.label} color`}
          />
        ))}
      </div>

      {/* Custom Color Picker */}
      <div className='flex items-center gap-2 p-2 bg-gray-50 rounded-lg'>
        <label className='text-xs font-semibold text-gray-700'>Custom:</label>
        <input
          type='color'
          value={customColor}
          onChange={handleCustomColorChange}
          className='w-10 h-10 cursor-pointer rounded border border-gray-300 hover:border-gray-400'
          title='Pick a custom color'
        />
        <span className='text-xs text-gray-600 flex-1 truncate'>{customColor.toUpperCase()}</span>
      </div>
    </div>
  );
}
