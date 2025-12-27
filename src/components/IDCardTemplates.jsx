import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Template 1: Corporate Blue
export const CorporateBlueTemplate = ({ employee }) => {
  return (
    <div className="w-[350px] h-[550px] bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-2xl overflow-hidden relative">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm p-4 text-center">
        <h2 className="text-white font-bold text-xl">COMPANY NAME</h2>
        <p className="text-white/80 text-sm">Employee ID Card</p>
      </div>
      
      {/* Photo Section */}
      <div className="flex justify-center mt-6">
        <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white/20">
          {employee?.photo ? (
            <img src={employee.photo} alt="Employee" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white text-4xl">
              👤
            </div>
          )}
        </div>
      </div>
      
      {/* Employee Info */}
      <div className="text-center mt-4 px-6">
        <h3 className="text-white font-bold text-2xl mb-1">
          {employee?.name || "John Doe"}
        </h3>
        <p className="text-white/90 text-lg">
          {employee?.position || "Software Engineer"}
        </p>
        <Badge className="mt-2 bg-white text-blue-700">
          {employee?.department || "IT Department"}
        </Badge>
      </div>
      
      {/* Details */}
      <div className="mt-6 px-6 space-y-2">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
          <p className="text-white/70 text-xs">Employee ID</p>
          <p className="text-white font-semibold">{employee?.id || "EMP001"}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
          <p className="text-white/70 text-xs">Valid Until</p>
          <p className="text-white font-semibold">{employee?.validUntil || "Dec 2026"}</p>
        </div>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <div className="text-white/50 text-xs">This card is property of the company</div>
      </div>
    </div>
  )
}

// Template 2: Modern Minimalist
export const ModernMinimalistTemplate = ({ employee }) => {
  return (
    <div className="w-[350px] h-[550px] bg-white rounded-xl shadow-2xl overflow-hidden relative border-2 border-gray-200">
      {/* Side Accent */}
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-purple-500 to-pink-500"></div>
      
      {/* Header */}
      <div className="pt-8 pb-4 px-6">
        <h2 className="text-gray-800 font-bold text-2xl">COMPANY</h2>
        <p className="text-gray-500 text-sm">Employee Identification</p>
      </div>
      
      {/* Photo Section */}
      <div className="flex justify-center">
        <div className="w-36 h-36 rounded-2xl overflow-hidden bg-gray-100 border-4 border-purple-100">
          {employee?.photo ? (
            <img src={employee.photo} alt="Employee" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-5xl">
              👤
            </div>
          )}
        </div>
      </div>
      
      {/* Employee Info */}
      <div className="mt-6 px-6">
        <h3 className="text-gray-900 font-bold text-2xl">
          {employee?.name || "Jane Smith"}
        </h3>
        <p className="text-purple-600 font-medium text-lg mt-1">
          {employee?.position || "Product Manager"}
        </p>
      </div>
      
      {/* Details Grid */}
      <div className="mt-6 px-6 space-y-3">
        <div className="border-b border-gray-200 pb-2">
          <p className="text-gray-500 text-xs uppercase tracking-wide">Department</p>
          <p className="text-gray-900 font-medium">{employee?.department || "Product"}</p>
        </div>
        <div className="border-b border-gray-200 pb-2">
          <p className="text-gray-500 text-xs uppercase tracking-wide">Employee ID</p>
          <p className="text-gray-900 font-medium">{employee?.id || "EMP002"}</p>
        </div>
        <div className="border-b border-gray-200 pb-2">
          <p className="text-gray-500 text-xs uppercase tracking-wide">Email</p>
          <p className="text-gray-900 font-medium text-sm">{employee?.email || "jane@company.com"}</p>
        </div>
        <div className="pb-2">
          <p className="text-gray-500 text-xs uppercase tracking-wide">Valid Until</p>
          <p className="text-gray-900 font-medium">{employee?.validUntil || "Dec 2026"}</p>
        </div>
      </div>
      
      {/* QR Code Area */}
      <div className="absolute bottom-4 right-4">
        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
          QR
        </div>
      </div>
    </div>
  )
}

// Template 3: Premium Gold
export const PremiumGoldTemplate = ({ employee }) => {
  return (
    <div className="w-[350px] h-[550px] bg-gradient-to-br from-amber-50 to-yellow-100 rounded-xl shadow-2xl overflow-hidden relative border border-amber-300">
      {/* Gold Header */}
      <div className="bg-gradient-to-r from-amber-600 to-yellow-600 p-6 text-center relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400"></div>
        <h2 className="text-white font-bold text-xl tracking-wider">PREMIUM CORP</h2>
        <p className="text-amber-100 text-sm mt-1">Executive Member</p>
      </div>
      
      {/* Photo Section */}
      <div className="flex justify-center -mt-16">
        <div className="w-32 h-32 rounded-full border-4 border-amber-400 overflow-hidden bg-white shadow-xl">
          {employee?.photo ? (
            <img src={employee.photo} alt="Employee" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-amber-600 text-4xl">
              👤
            </div>
          )}
        </div>
      </div>
      
      {/* Employee Info */}
      <div className="text-center mt-4 px-6">
        <h3 className="text-gray-900 font-bold text-2xl">
          {employee?.name || "Robert Chen"}
        </h3>
        <p className="text-amber-700 font-semibold text-lg mt-1">
          {employee?.position || "Chief Technology Officer"}
        </p>
        <Badge className="mt-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white border-0">
          {employee?.department || "Executive"}
        </Badge>
      </div>
      
      {/* Decorative Line */}
      <div className="flex items-center justify-center my-4">
        <div className="h-px w-20 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
      </div>
      
      {/* Details */}
      <div className="px-6 space-y-3">
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-amber-200">
          <p className="text-amber-800 text-xs font-semibold uppercase tracking-wide">Employee ID</p>
          <p className="text-gray-900 font-bold text-lg">{employee?.id || "EMP003"}</p>
        </div>
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-amber-200">
          <p className="text-amber-800 text-xs font-semibold uppercase tracking-wide">Email</p>
          <p className="text-gray-900 font-medium">{employee?.email || "robert@company.com"}</p>
        </div>
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-amber-200">
          <p className="text-amber-800 text-xs font-semibold uppercase tracking-wide">Valid Period</p>
          <p className="text-gray-900 font-medium">{employee?.validUntil || "Dec 2026"}</p>
        </div>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center">
        <div className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white text-xs py-1 px-4 rounded-full">
          Premium Access
        </div>
      </div>
    </div>
  )
}

// Template 4: Tech Dark
export const TechDarkTemplate = ({ employee }) => {
  return (
    <div className="w-[350px] h-[550px] bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-xl shadow-2xl overflow-hidden relative border border-cyan-500/30">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      {/* Header */}
      <div className="relative bg-gradient-to-r from-cyan-600/20 to-blue-600/20 backdrop-blur-sm p-4 border-b border-cyan-500/30">
        <h2 className="text-cyan-400 font-bold text-xl tracking-wider">TECH COMPANY</h2>
        <p className="text-cyan-300/70 text-sm">Access Card</p>
      </div>
      
      {/* Photo Section */}
      <div className="relative flex justify-center mt-6">
        <div className="w-32 h-32 rounded-lg border-2 border-cyan-500 overflow-hidden bg-gray-800 shadow-lg shadow-cyan-500/20">
          {employee?.photo ? (
            <img src={employee.photo} alt="Employee" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-cyan-400 text-4xl">
              👤
            </div>
          )}
        </div>
        {/* Corner Accents */}
        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-500"></div>
        <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-500"></div>
        <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-500"></div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-500"></div>
      </div>
      
      {/* Employee Info */}
      <div className="relative text-center mt-6 px-6">
        <h3 className="text-white font-bold text-2xl mb-1">
          {employee?.name || "Alex Johnson"}
        </h3>
        <p className="text-cyan-400 font-medium text-lg">
          {employee?.position || "Senior Developer"}
        </p>
        <Badge className="mt-3 bg-cyan-600/30 text-cyan-300 border border-cyan-500/50">
          {employee?.department || "Engineering"}
        </Badge>
      </div>
      
      {/* Details */}
      <div className="relative mt-6 px-6 space-y-2">
        <div className="bg-gradient-to-r from-cyan-600/10 to-blue-600/10 backdrop-blur-sm rounded-lg p-3 border border-cyan-500/20">
          <p className="text-cyan-400/70 text-xs font-mono uppercase">ID</p>
          <p className="text-white font-semibold font-mono">{employee?.id || "EMP004"}</p>
        </div>
        <div className="bg-gradient-to-r from-cyan-600/10 to-blue-600/10 backdrop-blur-sm rounded-lg p-3 border border-cyan-500/20">
          <p className="text-cyan-400/70 text-xs font-mono uppercase">Access Level</p>
          <p className="text-white font-semibold">LEVEL 5 - FULL ACCESS</p>
        </div>
        <div className="bg-gradient-to-r from-cyan-600/10 to-blue-600/10 backdrop-blur-sm rounded-lg p-3 border border-cyan-500/20">
          <p className="text-cyan-400/70 text-xs font-mono uppercase">Valid Until</p>
          <p className="text-white font-semibold">{employee?.validUntil || "2026-12-31"}</p>
        </div>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0">
        <div className="flex items-center justify-center gap-2">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500"></div>
          <div className="text-cyan-500/50 text-xs font-mono">AUTHORIZED PERSONNEL</div>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500"></div>
        </div>
      </div>
    </div>
  )
}

export const templates = [
  {
    id: 'corporate-blue',
    name: 'Corporate Blue',
    component: CorporateBlueTemplate,
    thumbnail: '🔵'
  },
  {
    id: 'modern-minimalist',
    name: 'Modern Minimalist',
    component: ModernMinimalistTemplate,
    thumbnail: '⚪'
  },
  {
    id: 'premium-gold',
    name: 'Premium Gold',
    component: PremiumGoldTemplate,
    thumbnail: '🟡'
  },
  {
    id: 'tech-dark',
    name: 'Tech Dark',
    component: TechDarkTemplate,
    thumbnail: '⚫'
  }
]
