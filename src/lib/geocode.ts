// Bounding box của Đà Nẵng (ưu tiên kết quả trong khu vực này)
const DA_NANG_VIEWBOX = '107.85,15.95,108.35,16.35'

const CITY_KEYWORDS = [
  'đà nẵng', 'da nang', 'hội an', 'hoi an',
  'hà nội', 'ha noi', 'hcm', 'hồ chí minh', 'ho chi minh',
  'huế', 'hue', 'quảng nam', 'quang nam'
]

/**
 * Chuyển display_name dài của Nominatim thành địa chỉ ngắn gọn dạng Việt Nam
 * VD: "14 Trần Phú, Hải Châu, Đà Nẵng" thay vì chuỗi dài 100 ký tự
 */
export function formatAddress(item: NominatimResult): string {
  const addr = item.address
  if (!addr) return item.display_name

  const parts: string[] = []

  // Số nhà + tên đường
  const road = addr.road || addr.pedestrian || addr.footway || addr.path || ''
  const houseNumber = addr.house_number || ''
  if (houseNumber && road) {
    parts.push(`${houseNumber} ${road}`)
  } else if (road) {
    parts.push(road)
  } else if (item.name && item.name !== addr.city) {
    parts.push(item.name)
  }

  // Phường/Xã
  const ward = addr.quarter || addr.suburb || addr.neighbourhood || addr.village || ''
  if (ward) parts.push(ward)

  // Quận/Huyện
  const district = addr.city_district || addr.district || addr.county || ''
  if (district) parts.push(district)

  // Thành phố
  const city = addr.city || addr.town || addr.state_district || ''
  if (city) parts.push(city)

  return parts.length > 0 ? parts.join(', ') : item.display_name
}

export interface NominatimResult {
  place_id: number
  display_name: string
  lat: string
  lon: string
  name?: string
  address?: {
    house_number?: string
    road?: string
    pedestrian?: string
    footway?: string
    path?: string
    quarter?: string
    suburb?: string
    neighbourhood?: string
    village?: string
    city_district?: string
    district?: string
    county?: string
    city?: string
    town?: string
    state?: string
    state_district?: string
    country?: string
  }
}

/**
 * Tìm kiếm địa chỉ với Nominatim, ưu tiên kết quả trong Đà Nẵng
 */
export async function searchAddress(query: string): Promise<NominatimResult[]> {
  const lowerVal = query.toLowerCase()
  const hasCityContext = CITY_KEYWORDS.some(k => lowerVal.includes(k))
  const searchQuery = hasCityContext ? query : `${query}, Đà Nẵng`

  const params = new URLSearchParams({
    q: searchQuery,
    format: 'json',
    addressdetails: '1',
    limit: '5',
    countrycodes: 'vn',
    viewbox: DA_NANG_VIEWBOX,
    bounded: '0', // bounded=0: ưu tiên viewbox nhưng không giới hạn cứng
  })

  const res = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
    headers: { 'Accept-Language': 'vi-VN,vi;q=0.9' }
  })
  return res.json()
}

/**
 * Reverse geocoding: tọa độ → địa chỉ ngắn gọn
 */
export async function reverseGeocode(lat: number, lon: number): Promise<string> {
  const params = new URLSearchParams({
    lat: lat.toString(),
    lon: lon.toString(),
    format: 'json',
    addressdetails: '1',
    zoom: '17', // zoom=17 cho kết quả chi tiết đến số nhà
  })

  const res = await fetch(`https://nominatim.openstreetmap.org/reverse?${params}`, {
    headers: { 'Accept-Language': 'vi-VN,vi;q=0.9' }
  })
  const data: NominatimResult = await res.json()

  if (data && data.display_name) {
    return formatAddress(data)
  }
  return `${lat}, ${lon}`
}

/**
 * Geocode địa chỉ → tọa độ (dùng cho tính khoảng cách)
 */
export async function geocodeToCoords(address: string): Promise<{ lat: number; lon: number } | null> {
  try {
    const results = await searchAddress(address)
    if (results && results.length > 0) {
      return { lat: parseFloat(results[0].lat), lon: parseFloat(results[0].lon) }
    }
  } catch (e) {
    console.error('Geocode error', e)
  }
  return null
}
