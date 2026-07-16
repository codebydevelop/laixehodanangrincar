"use client"

import { useState, useEffect, useRef } from 'react'
import { MapPin, Navigation } from 'lucide-react'

interface AddressInputProps {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  icon: 'navigation' | 'mappin'
  onGetCurrentLocation?: () => void
  isGettingLocation?: boolean
  error?: string
}

export default function AddressInput({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  icon,
  onGetCurrentLocation,
  isGettingLocation,
  error
}: AddressInputProps) {
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loading, setLoading] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Debounced search
  useEffect(() => {
    if (!value || !showSuggestions) {
      setSuggestions([])
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      
      let searchQuery = value;
      const lowerVal = value.toLowerCase();
      if (!lowerVal.includes('đà nẵng') && !lowerVal.includes('da nang') && 
          !lowerVal.includes('hội an') && !lowerVal.includes('hoi an') && 
          !lowerVal.includes('hà nội') && !lowerVal.includes('ha noi') && 
          !lowerVal.includes('hcm') && !lowerVal.includes('hồ chí minh')) {
        searchQuery = `${value}, Đà Nẵng`;
      }

      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&addressdetails=1&limit=5&countrycodes=vn`, {
          headers: {
            'Accept-Language': 'vi-VN'
          }
        })
        const data = await res.json()
        setSuggestions(data)
      } catch (error) {
        console.error('Error fetching address:', error)
      } finally {
        setLoading(false)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [value, showSuggestions])

  const handleSelect = (address: string) => {
    onChange(address)
    setShowSuggestions(false)
  }

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="block text-sm font-medium mb-2 text-blue-100">{label} <span className="text-red-400">*</span></label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon === 'navigation' ? (
            <Navigation size={18} className="text-blue-300 group-focus-within:text-blue-500 transition-colors" />
          ) : (
            <MapPin size={18} className="text-red-400 group-focus-within:text-red-500 transition-colors" />
          )}
        </div>
        <input 
          type="text" 
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
            setShowSuggestions(true)
          }}
          onFocus={() => {
            if (value) setShowSuggestions(true)
          }}
          className={`w-full pl-10 py-3.5 rounded-xl border border-white/20 bg-white/5 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all placeholder:text-slate-400 text-white ${onGetCurrentLocation ? 'pr-12' : 'pr-4'}`}
          placeholder={placeholder}
        />
        {onGetCurrentLocation && (
          <button 
            onClick={onGetCurrentLocation}
            disabled={isGettingLocation}
            className="absolute inset-y-0 right-2 pr-2 flex items-center text-blue-300 hover:text-blue-100 transition-colors disabled:opacity-50"
            title="Lấy vị trí hiện tại"
            type="button"
          >
            {isGettingLocation ? (
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : (
              <MapPin size={20} />
            )}
          </button>
        )}
      </div>
      {error && <p className="text-red-400 text-xs mt-1.5 font-medium">{error}</p>}

      {/* Dropdown Suggestions */}
      {showSuggestions && (suggestions.length > 0 || loading) && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden text-slate-800">
          {loading ? (
            <div className="p-4 text-center text-sm text-slate-500">Đang tìm kiếm...</div>
          ) : (
            <ul>
              {suggestions.map((item, index) => (
                <li 
                  key={index}
                  onClick={() => handleSelect(item.display_name)}
                  className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-slate-50 last:border-0 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium line-clamp-1">{item.display_name.split(',')[0]}</p>
                      <p className="text-xs text-slate-500 line-clamp-1">{item.display_name}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
