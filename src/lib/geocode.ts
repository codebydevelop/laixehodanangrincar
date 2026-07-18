// Bounding box mở rộng bao gồm Đà Nẵng + Hội An + Quảng Nam lân cận
// lat min 15.7 để bao phủ Hội An (15.88), Duy Xuyên, v.v.
const DA_NANG_VIEWBOX = '107.7,15.7,108.5,16.4'

const CITY_KEYWORDS = [
  'đà nẵng', 'da nang', 'hội an', 'hoi an',
  'hà nội', 'ha noi', 'hcm', 'hồ chí minh', 'ho chi minh',
  'huế', 'hue', 'quảng nam', 'quang nam'
]

const NOMINATIM_HEADERS = {
  'Accept-Language': 'vi-VN,vi;q=0.9',
  'User-Agent': 'RincarApp/1.0 (laixehodanang.com)'
}

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
    headers: NOMINATIM_HEADERS
  })

  // Nominatim trả về plain text nếu bị block, parse an toàn
  const text = await res.text()
  try {
    return JSON.parse(text)
  } catch {
    console.error('Nominatim search error response:', text)
    return []
  }
}

/**
 * Reverse geocoding: tọa độ → địa chỉ ngắn gọn
 * Gọi qua server-side proxy /api/geocode/reverse để đảm bảo User-Agent header hợp lệ
 */
export async function reverseGeocode(lat: number, lon: number): Promise<string> {
  try {
    const res = await fetch(`/api/geocode/reverse?lat=${lat}&lon=${lon}`)
    const text = await res.text()
    let data: NominatimResult
    try {
      data = JSON.parse(text)
    } catch {
      console.error('Reverse geocode proxy error:', text)
      return `${lat}, ${lon}`
    }

    if (data && data.display_name) {
      return formatAddress(data)
    }
  } catch (e) {
    console.error('Reverse geocode error:', e)
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
