"use client"

import { useState, useEffect, useRef } from 'react'
import { MapPin, Navigation, Clock, ShieldCheck, Banknote, Briefcase, Plane, Users, HeartPulse, ChevronRight, Phone, Timer, ClipboardCheck, CheckCircle, Star } from 'lucide-react'
import Link from 'next/link'
import AddressInput from '@/components/AddressInput'
import { getLatestNews } from '@/app/(main)/actions'

const testimonials = [
  {
    name: "Anh Hoàng Minh",
    role: "Giám đốc Doanh nghiệp, Hải Châu",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&fit=crop",
    text: "Dịch vụ <strong>lái xe hộ tại Đà Nẵng</strong> của RINCAR thực sự rất tuyệt vời. Hôm trước tôi có tiếp khách đối tác đến khuya, uống rượu bia không thể lái xe về. Tôi đặt tài xế chỉ 15 phút sau là có bạn đến đón, lái chiếc Mercedes của tôi rất mượt và cẩn thận."
  },
  {
    name: "Chị Thu Hương",
    role: "Khách du lịch từ Hà Nội",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&fit=crop",
    text: "Tôi đi du lịch cùng gia đình vào Đà Nẵng, muốn tự lái xe đi Bà Nà và Hội An chơi nhưng do đường đông và mệt nên tôi đã quyết định <strong>thuê tài xế lái xe hộ Rincar</strong>. Bạn tài xế cực kỳ thân thiện, lịch sự, đóng vai trò như hướng dẫn viên bản địa."
  },
  {
    name: "Anh Quốc Bảo",
    role: "Kinh doanh tự do, Thanh Khê",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&h=150&fit=crop",
    text: "Điều tôi tâm đắc nhất ở RINCAR là sự <strong>bảo mật thông tin riêng tư</strong> lịch trình. Thêm nữa là hãng có cam kết bảo hiểm va quẹt xe 100% nên rất an tâm giao chìa khóa xế cưng. Đây là dịch vụ <strong>tài xế lái xe hộ đưa người say về nhà</strong> đáng tin cậy nhất."
  },
  {
    name: "Anh Minh Đức",
    role: "Bác sĩ Bệnh viện Đa khoa Đà Nẵng",
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=150&h=150&fit=crop",
    text: "Mỗi lần liên hoan khoa xong, tôi luôn tin dùng <strong>dịch vụ lái xe hộ Đà Nẵng</strong> của RINCAR. Sự nhanh chóng và đúng hẹn là ưu điểm lớn nhất của hãng. Các bạn tài xế ứng xử rất nhã nhặn, chuyên nghiệp."
  },
  {
    name: "Chị Phương Thảo",
    role: "Chủ thương hiệu Spa, Sơn Trà",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&h=150&fit=crop",
    text: "Xe của mình là dòng SUV cỡ lớn khó đỗ, nhưng các bạn <strong>tài xế lái xe hộ Rincar</strong> căn lề cực chuẩn và đỗ xe rất gọn gàng. Cước phí lại được tính tự động, rõ ràng nên không bao giờ lo chặt chém."
  },
  {
    name: "Anh Văn Lâm",
    role: "Quản lý Nhà hàng, Ngũ Hành Sơn",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&h=150&fit=crop",
    text: "Tôi thường khuyên các vị khách nhậu tại nhà hàng của mình sử dụng dịch vụ <strong>lái xe hộ đưa người say về nhà</strong> của RINCAR. Vừa bảo vệ khách hàng, vừa chấp hành nghiêm chỉnh luật giao thông."
  },
  {
    name: "Anh Tiến Dũng",
    role: "Kỹ sư Công nghệ, Cẩm Lệ",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&h=150&fit=crop",
    text: "Dịch vụ cực kỳ tiện lợi! Ứng dụng đặt tài xế nhanh chóng, gọi điện xác nhận lộ trình rất mau lẹ. <strong>Tài xế lái xe hộ Rincar</strong> mặc đồng phục lịch sự, thái độ niềm nở và lái rất an toàn."
  },
  {
    name: "Chị Khánh Chi",
    role: "Trưởng phòng Nhân sự, Liên Chiểu",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&h=150&fit=crop",
    text: "Học xong thạc sĩ về mình bận rộn nhiều việc cơ quan, chồng đi làm xa. Thuê <strong>tài xế lái xe hộ</strong> đón mẹ ở ga tàu rất chu đáo. Tài xế của hãng lái xe rất điềm đạm, lễ phép, đúng giờ giấc."
  },
  {
    name: "Anh Tuấn Anh",
    role: "Giám đốc Dự án Bất động sản",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&fit=crop",
    text: "Tôi đã dùng thử nhiều dịch vụ lái xe, nhưng RINCAR vẫn là sự lựa chọn số 1. <strong>Tài xế chuyên nghiệp</strong>, cẩn thận, bảo quản tài sản trên xe của khách rất chu đáo."
  },
  {
    name: "Chị Mỹ Linh",
    role: "Chủ chuỗi cửa hàng thời trang",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&h=150&fit=crop",
    text: "Rất thích phong cách phục vụ chu đáo của các tài xế tại đây. Dịch vụ <strong>lái xe hộ đưa người say về nhà</strong> nhanh gọn, an toàn và cực kỳ bảo mật thông tin."
  }
]

export default function HomeContainer() {
  const phoneInputRef = useRef<HTMLInputElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -380, behavior: 'smooth' })
    }
  }

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 380, behavior: 'smooth' })
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current
    if (!container) return
    
    container.classList.remove('scroll-smooth')
    const startX = e.pageX - container.offsetLeft
    const scrollLeft = container.scrollLeft
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const x = moveEvent.pageX - container.offsetLeft
      const walk = (x - startX) * 1.5 // Scroll sensitivity
      container.scrollLeft = scrollLeft - walk
    }
    
    const handleMouseUp = () => {
      container.classList.add('scroll-smooth')
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }


  const [phone, setPhone] = useState('')
  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [serviceType, setServiceType] = useState('1 Chuyến')
  const [timeFrame, setTimeFrame] = useState('Từ 10h đến 23h')
  const [waitingTime, setWaitingTime] = useState('')
  const [isScheduled, setIsScheduled] = useState(false)
  const [scheduleTime, setScheduleTime] = useState('')
  const [errors, setErrors] = useState<{ phone?: string, pickup?: string, dropoff?: string, schedule?: string }>({})

  const [distance, setDistance] = useState<number | null>(null)
  const [price, setPrice] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [isGettingDropoffLocation, setIsGettingDropoffLocation] = useState(false)
  const [latestNews, setLatestNews] = useState<any[]>([])
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [booked, setBooked] = useState(false)

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 5000)
  }

  // Auto-focus if coming from Header button & load news
  useEffect(() => {
    // 1. Check hash or trigger for focusing
    const focusAndScroll = (delay = 100) => {
      setTimeout(() => {
        if (phoneInputRef.current) {
          phoneInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
          phoneInputRef.current.focus({ preventScroll: true })
        }
      }, delay)
    }

    if (window.location.hash === '#booking-phone-input') {
      focusAndScroll(500)
    }

    // Listen to custom focus event from Header
    const handleFocusEvent = () => {
      focusAndScroll()
    }
    window.addEventListener('focus-booking-phone', handleFocusEvent)

    // 2. Load latest news
    getLatestNews().then(data => {
      if (data) setLatestNews(data)
    }).catch(err => console.error("Error loading news:", err))

    return () => {
      window.removeEventListener('focus-booking-phone', handleFocusEvent)
    }
  }, [])

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsGettingLocation(true)
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          try {
            // Reverse Geocoding via Nominatim
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`, {
              headers: { 'Accept-Language': 'vi-VN' }
            })
            const data = await res.json()
            if (data && data.display_name) {
              setPickup(data.display_name)
            } else {
              setPickup(`${latitude}, ${longitude}`)
            }
          } catch (error) {
            console.error('Error in reverse geocoding', error)
            setPickup(`${latitude}, ${longitude}`)
          } finally {
            setIsGettingLocation(false)
          }
        },
        (error) => {
          alert('Không thể lấy vị trí hiện tại. Vui lòng cấp quyền truy cập vị trí.')
          setIsGettingLocation(false)
        }
      )
    } else {
      alert('Trình duyệt của bạn không hỗ trợ lấy vị trí.')
    }
  }

  const handleGetDropoffLocation = () => {
    if (navigator.geolocation) {
      setIsGettingDropoffLocation(true)
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`, {
              headers: { 'Accept-Language': 'vi-VN' }
            })
            const data = await res.json()
            if (data && data.display_name) {
              setDropoff(data.display_name)
            } else {
              setDropoff(`${latitude}, ${longitude}`)
            }
          } catch (error) {
            console.error('Error in reverse geocoding', error)
            setDropoff(`${latitude}, ${longitude}`)
          } finally {
            setIsGettingDropoffLocation(false)
          }
        },
        () => {
          alert('Không thể lấy vị trí hiện tại. Vui lòng cấp quyền truy cập vị trí.')
          setIsGettingDropoffLocation(false)
        }
      )
    } else {
      alert('Trình duyệt của bạn không hỗ trợ lấy vị trí.')
    }
  }

  const calculatePrice = (km: number) => {
    if (km <= 5) return 120000
    // Lấy phần vượt quá 5km, làm tròn lên (VD: 5.2km -> tính thêm 1km)
    return 120000 + Math.ceil(km - 5) * 12000
  }

  const validateForm = () => {
    const newErrors: typeof errors = {}

    if (!phone) {
      newErrors.phone = 'Vui lòng nhập số điện thoại.'
    } else if (!/^(0|\+84)[0-9]{9}$/.test(phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ (VD: 0906499078)'
    }
    if (!pickup) {
      newErrors.pickup = 'Vui lòng nhập điểm đón.'
    }
    if (!dropoff) {
      newErrors.dropoff = 'Vui lòng nhập điểm đến.'
    }
    // Kiểm tra điểm đón và điểm đến không được trùng nhau
    if (pickup && dropoff && pickup.trim().toLowerCase() === dropoff.trim().toLowerCase()) {
      newErrors.dropoff = 'Điểm đến không được trùng với điểm đón.'
    }
    if (isScheduled && !scheduleTime) {
      newErrors.schedule = 'Vui lòng chọn thời gian hẹn.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const geocodeAddress = async (address: string) => {
    try {
      let searchQuery = address;
      const lowerVal = address.toLowerCase();
      if (!lowerVal.includes('đà nẵng') && !lowerVal.includes('da nang') &&
        !lowerVal.includes('hội an') && !lowerVal.includes('hoi an') &&
        !lowerVal.includes('hà nội') && !lowerVal.includes('ha noi') &&
        !lowerVal.includes('hcm') && !lowerVal.includes('hồ chí minh')) {
        searchQuery = `${address}, Đà Nẵng`;
      }

      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1&countrycodes=vn`, {
        headers: { 'Accept-Language': 'vi-VN' }
      })
      const data = await res.json()
      if (data && data.length > 0) {
        return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) }
      }
    } catch (e) {
      console.error('Geocode error', e)
    }
    return null
  }

  const getRouteDistance = async (lat1: number, lon1: number, lat2: number, lon2: number) => {
    try {
      const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=false`)
      const data = await res.json()
      if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
        return data.routes[0].distance // trả về mét
      }
    } catch (e) {
      console.error('Routing error', e)
    }
    return null
  }

  const handleCalculate = async () => {
    if (!validateForm()) return
    setLoading(true)
    try {
      // Bước 1: Geocode địa chỉ
      const pickupCoords = await geocodeAddress(pickup)
      if (!pickupCoords) {
        showToast('Không tìm thấy tọa độ Điểm đón. Vui lòng chọn địa chỉ rõ ràng hơn.', 'error')
        setLoading(false); return
      }
      await new Promise(resolve => setTimeout(resolve, 1000))
      const dropoffCoords = await geocodeAddress(dropoff)
      if (!dropoffCoords) {
        showToast('Không tìm thấy tọa độ Điểm đến. Vui lòng chọn địa chỉ rõ ràng hơn.', 'error')
        setLoading(false); return
      }

      // Bước 2: Tính khoảng cách
      const distanceMeters = await getRouteDistance(pickupCoords.lat, pickupCoords.lon, dropoffCoords.lat, dropoffCoords.lon)
      if (distanceMeters === null) {
        showToast('Không thể tính được lộ trình. Vui lòng thử lại.', 'error')
        setLoading(false); return
      }
      const distanceKm = Number((distanceMeters / 1000).toFixed(1))
      if (distanceKm < 0.2) {
        setErrors(prev => ({ ...prev, dropoff: 'Điểm đến không được trùng với điểm đón.' }))
        setLoading(false); return
      }
      const calculatedPrice = calculatePrice(distanceKm)
      setDistance(distanceKm)
      setPrice(calculatedPrice)
    } catch {
      showToast('Có lỗi xảy ra khi tính toán khoảng cách.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleBooking = async () => {
    if (!validateForm()) return
    setLoading(true)
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone, pickup, dropoff,
          service_type: serviceType,
          time_frame: timeFrame,
          waiting_time: waitingTime,
          is_scheduled: isScheduled,
          schedule_time: scheduleTime,
          distance: distance,
          price: price
        })
      })
      if (res.ok) {
        setBooked(true)
        showToast(`Đặt tài xế thành công! Tổng đài RINCAR sẽ gọi lại ${phone} trong ít phút.`, 'success')
      } else {
        const errorData = await res.json()
        showToast('Lỗi: ' + (errorData.error || 'Vui lòng thử lại sau.'), 'error')
      }
    } catch {
      showToast('Không thể kết nối đến máy chủ. Vui lòng thử lại.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Toast Alert */}
      {toast && (
        <div className={`fixed top-24 right-4 z-50 p-4 rounded-xl shadow-xl transition-all animate-in slide-in-from-right-10 duration-300 ${
          toast.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {toast.message}
        </div>
      )}

      {/* Hero Section with Form */}
      <section className="relative bg-slate-950 text-white pb-20 overflow-hidden">
        {/* Ảnh nền Cầu Vàng */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-45 pointer-events-none animate-ken-burns"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1920&q=80')",
          }}
        ></div>
        {/* Lớp phủ gradient tối màu giúp chữ dễ đọc */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/30 pointer-events-none"></div>

        <div className="container relative z-20 mx-auto px-4 py-16 lg:py-24 flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="order-2 lg:order-1 inline-block px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 font-semibold mb-6 border border-blue-500/30 backdrop-blur-sm">
              🌟 Dịch vụ 24/7 Nhanh Chóng - Uy Tín
            </div>
            <h1 className="order-1 lg:order-2 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-normal mb-6 tracking-tight">
              LÁI XE HỘ TẠI <span className="inline-block py-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-200">ĐÀ NẴNG</span>
            </h1>
            <p className="order-3 text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Bạn say rượu? Bạn mệt mỏi? Hãy để đội ngũ <strong>tài xế lái xe hộ chuyên nghiệp</strong> của RINCAR đưa bạn và xe về nhà an toàn. Giải pháp di chuyển tiện lợi, tiết kiệm nhất.
            </p>
            <div className="order-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="tel:0906499078" className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold py-4 px-8 rounded-full text-lg transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] flex items-center justify-center gap-2">
                <Phone className="animate-pulse" />
                GỌI NGAY: 0906.499.078
              </a>
              <a href="https://zalo.me/0906499078" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-4 px-8 rounded-full text-lg transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-6 h-6 fill-current shrink-0">
                  <path d="M24 4C13.51 4 5 11.61 5 21c0 5.24 2.66 9.87 6.84 12.87-.22.95-.79 3.51-1.04 4.54-.33 1.34.52 1.31 1.22.86 1.05-.68 4.28-2.77 5.76-3.72A20.73 20.73 0 0024 38c10.49 0 19-7.61 19-17S34.49 4 24 4zm4.26 23.36h-7.85l7.07-8.15v-.6h-8.88v2.19h6.81l-7.07 8.16v.59h9.92v-2.19zm8.56.09c-.61 0-1.12-.22-1.54-.66-.42-.44-.63-1.04-.63-1.8v-5.26h-2.12v5.26c0 1.36.37 2.43 1.11 3.2s1.77 1.15 3.09 1.15 2.37-.38 3.12-1.14 1.13-1.83 1.13-3.2v-5.27h-2.12v5.26c0 .76-.2 1.36-.61 1.8-.41.44-.92.66-1.53.66zm-20.91-.09v-7.67h-2.12v7.67h2.12z"/>
                </svg>
                Liên hệ ngay
              </a>
            </div>
          </div>

          {/* Glassmorphism Booking Form */}
          <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-6 lg:p-8 text-white border border-white/20">
            <h2 className="text-2xl font-bold text-center mb-6">ĐẶT TÀI XẾ NHANH</h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-blue-100">Số điện thoại liên hệ <span className="text-red-400">*</span></label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone size={18} className="text-green-400 group-focus-within:text-green-500 transition-colors" />
                  </div>
                  <input
                    ref={phoneInputRef}
                    id="booking-phone-input"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9+]/g, '')
                      setPhone(val)
                      if (errors.phone) setErrors({ ...errors, phone: undefined })
                    }}
                    className={`w-full pl-10 py-3.5 rounded-xl border ${errors.phone ? 'border-red-400 bg-red-400/10' : 'border-white/20 bg-white/5'} focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all placeholder:text-slate-400 text-white`}
                    placeholder="Nhập số điện thoại của bạn"
                  />
                </div>
                {errors.phone && <p className="text-red-400 text-xs mt-1.5 font-medium">{errors.phone}</p>}
              </div>

              <AddressInput
                label="Điểm đón của bạn"
                placeholder="Vị trí hiện tại hoặc địa chỉ"
                value={pickup}
                onChange={(v) => {
                  setPickup(v)
                  if (errors.pickup) setErrors({ ...errors, pickup: undefined })
                }}
                icon="navigation"
                onGetCurrentLocation={handleGetCurrentLocation}
                isGettingLocation={isGettingLocation}
                error={errors.pickup}
              />

              <AddressInput
                label="Điểm đến"
                placeholder="Nhập địa chỉ đến"
                value={dropoff}
                onChange={(v) => {
                  setDropoff(v)
                  if (errors.dropoff) setErrors({ ...errors, dropoff: undefined })
                }}
                icon="mappin"
                onGetCurrentLocation={handleGetDropoffLocation}
                isGettingLocation={isGettingDropoffLocation}
                error={errors.dropoff}
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-blue-100">Dịch vụ <span className="text-red-400">*</span></label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-white/20 bg-white/5 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-white appearance-none [&>option]:text-slate-900"
                  >
                    <option value="1 Chuyến">1 Chuyến</option>
                    <option value="Theo giờ">Theo giờ</option>
                    <option value="Theo ngày">Theo ngày</option>
                    <option value="Đường dài">Đường dài</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-blue-100">Khung giờ <span className="text-red-400">*</span></label>
                  <select
                    value={timeFrame}
                    onChange={(e) => setTimeFrame(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-white/20 bg-white/5 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-white appearance-none [&>option]:text-slate-900"
                  >
                    <option value="Từ 10h đến 23h">Từ 10h đến 23h</option>
                    <option value="Từ 23h đến 06h">Từ 23h đến 06h</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-blue-100">Thời gian chờ</label>
                <input
                  type="text"
                  value={waitingTime}
                  onChange={(e) => setWaitingTime(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-white/20 bg-white/5 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all placeholder:text-slate-400 text-white"
                  placeholder="Thời gian chờ chỉ tính từ 15 phút trở đi"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-5 h-5 rounded border border-white/40 bg-white/5 group-hover:bg-white/10 transition-colors">
                    <input
                      type="checkbox"
                      checked={isScheduled}
                      onChange={(e) => setIsScheduled(e.target.checked)}
                      className="absolute opacity-0 cursor-pointer w-full h-full z-10"
                    />
                    {isScheduled && (
                      <svg className="w-3 h-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm font-medium text-blue-100 select-none">Đặt lịch hẹn</span>
                </label>

                {isScheduled && (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                    <input
                      type="datetime-local"
                      value={scheduleTime}
                      onChange={(e) => {
                        setScheduleTime(e.target.value)
                        if (errors.schedule) setErrors({ ...errors, schedule: undefined })
                      }}
                      className={`w-full px-4 py-3.5 rounded-xl border ${errors.schedule ? 'border-red-400 bg-red-400/20' : 'border-blue-400/50 bg-blue-900/20'} focus:bg-blue-900/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-white [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert`}
                    />
                    {errors.schedule && <p className="text-red-400 text-xs mt-1.5 font-medium">{errors.schedule}</p>}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 mt-6">
                <button
                  onClick={handleCalculate}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-all disabled:opacity-50 shadow-lg shadow-blue-900/50 flex justify-center items-center gap-2"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Đang tính toán...
                    </span>
                  ) : 'XEM BÁO GIÁ'}
                </button>

                {/* Price card */}
                {distance !== null && price !== null && (
                  <div className="my-2 p-5 bg-white/10 backdrop-blur-md rounded-xl border border-blue-400/30 animate-in fade-in zoom-in duration-300 shadow-xl">
                    <div className="flex justify-between items-center mb-3 pb-3 border-b border-white/10">
                      <span className="text-blue-100 font-medium">Khoảng cách lộ trình:</span>
                      <span className="font-bold text-lg text-white">{distance} km</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-100 font-medium">Cước phí tạm tính:</span>
                      <span className="font-bold text-2xl text-yellow-400">{price.toLocaleString('vi-VN')} đ</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleBooking}
                  disabled={loading || booked}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-900/50 flex justify-center items-center gap-2"
                >
                  {booked ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      ĐÃ ĐẶT THÀNH CÔNG
                    </>
                  ) : 'ĐẶT TÀI XẾ NGAY'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Features */}
      <section className="py-24 bg-white relative z-20 -mt-10 rounded-t-[3rem]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Lợi Ích Dịch Vụ Lái Xe Hộ RINCAR Đà Nẵng</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Chúng tôi mang lại giải pháp thay thế hoàn hảo để bạn không phải tự lái xe trong những hoàn cảnh không thuận lợi.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/50 transition-colors group">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Tiết Kiệm Thời Gian</h3>
              <p className="text-slate-600 leading-relaxed">Không cần lo tìm bãi đỗ xe hay đối mặt với kẹt xe. Tài xế sẽ đưa đón bạn đúng giờ, giúp bạn tận dụng thời gian nghỉ ngơi trên xe.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-red-100 hover:bg-red-50/50 transition-colors group">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">An Toàn Tuyệt Đối</h3>
              <p className="text-slate-600 leading-relaxed">Tài xế chuyên nghiệp, giàu kinh nghiệm, am hiểu đường phố và luật lệ. Đảm bảo an toàn 100% cho bạn và xế cưng trong mọi tình huống.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-emerald-100 hover:bg-emerald-50/50 transition-colors group">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                <Banknote size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Chi Phí Hợp Lý</h3>
              <p className="text-slate-600 leading-relaxed">Minh bạch giá cước ngay từ đầu. Cước khởi điểm 5km chỉ với 120k. Giải pháp kinh tế hơn nhiều so với rủi ro khi tự lái lúc mệt mỏi/say xỉn.</p>
            </div>
          </div>
        </div>
      </section>

      {/* When to use */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">Khi Nào Nên Sử Dụng Dịch Vụ Lái Xe Hộ?</h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Dịch vụ <strong>lái xe hộ Đà Nẵng</strong> không chỉ dành cho những lúc "quá chén" mà còn phục vụ vô vàn các tình huống đặc biệt khác trong cuộc sống để đảm bảo <strong>an toàn giao thông</strong> cho bạn và gia đình.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-white shadow-sm rounded-xl text-blue-600 mt-1">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">Đi Công Tác</h4>
                    <p className="text-sm text-slate-500">Tập trung làm việc, nghỉ ngơi trên xe, tài xế sẽ đưa bạn đến điểm họp an toàn.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-white shadow-sm rounded-xl text-pink-600 mt-1">
                    <Plane size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">Du Lịch</h4>
                    <p className="text-sm text-slate-500">Thoải mái tận hưởng Đà Nẵng, Bà Nà, Hội An mà không lo lạc đường, tìm chỗ đỗ.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-white shadow-sm rounded-xl text-amber-500 mt-1">
                    <Users size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">Đưa Đón Người Thân</h4>
                    <p className="text-sm text-slate-500">Khi bạn bận rộn, hãy để chúng tôi lái xe của bạn đón gia đình tại sân bay chuẩn xác.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-white shadow-sm rounded-xl text-red-500 mt-1">
                    <HeartPulse size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">Vấn Đề Sức Khoẻ</h4>
                    <p className="text-sm text-slate-500">Không đủ điều kiện sức khoẻ tự lái? Chỉ cần giao vô lăng, chúng tôi sẽ đưa bạn về.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 relative">
              <div className="absolute -inset-4 bg-blue-100 rounded-[3rem] transform rotate-3 -z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070"
                alt="Tài xế chuyên nghiệp lái xe hộ Đà Nẵng"
                className="rounded-[2.5rem] shadow-xl w-full object-cover h-[500px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quy trình đặt tài xế */}
      <section className="py-24 bg-white relative z-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold text-sm uppercase tracking-wider block mb-2">Cách thức hoạt động</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Quy Trình Đặt Tài Xế Lái Xe Hộ</h2>
            <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded"></div>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center relative group">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <MapPin size={28} className="mx-auto" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-800">1. Nhập lộ trình</h3>
              <p className="text-sm text-slate-500 leading-relaxed px-4">
                Điền điểm đón và điểm đến để kiểm tra <strong>cước phí minh bạch</strong> trực tiếp trên màn hình.
              </p>
            </div>

            <div className="text-center relative group">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <ClipboardCheck size={28} className="mx-auto" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-800">2. Xác nhận yêu cầu</h3>
              <p className="text-sm text-slate-500 leading-relaxed px-4">
                Ấn đặt xe hoặc gọi hotline. Nhân viên <strong>Rincar</strong> sẽ liên hệ xác nhận lộ trình sau 1-3 phút.
              </p>
            </div>

            <div className="text-center relative group">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <Timer size={28} className="mx-auto" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-800">3. Đón khách siêu tốc</h3>
              <p className="text-sm text-slate-500 leading-relaxed px-4">
                <strong>Tài xế chuyên nghiệp</strong> của chúng tôi di chuyển đến điểm hẹn đón bạn trong vòng 15-30 phút.
              </p>
            </div>

            <div className="text-center relative group">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <CheckCircle size={28} className="mx-auto" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-800">4. Trở về an toàn</h3>
              <p className="text-sm text-slate-500 leading-relaxed px-4">
                Tài xế lái xe của bạn đưa bạn về tận nơi an toàn. Hoàn tất hành trình và thanh toán cước phí.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cam kết chất lượng dịch vụ */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold text-sm uppercase tracking-wider block mb-2">Cam kết vàng</span>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">RINCAR Cam Kết Chất Lượng 5 Sao</h2>
            <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                <ShieldCheck size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-slate-800">Bảo hiểm trách nhiệm 100%</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Chúng tôi cam kết chịu trách nhiệm bồi thường hoàn toàn <strong>100% giá trị sửa chữa xe</strong> tại các hãng xe chính hãng nếu phát sinh va chạm, trầy xước do lỗi của tài xế RINCAR.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
                <Users size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-slate-800">Tài xế dày dặn kinh nghiệm</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Đội ngũ tài xế sở hữu bằng lái hạng B2/C trở lên, lý lịch sạch trong sạch, trên <strong>5 năm kinh nghiệm lái xe thực tế</strong> và được kiểm tra tay lái cực kỳ nghiêm ngặt định kỳ.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl shrink-0">
                <Clock size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-slate-800">Phục vụ 24/7 mọi lúc</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Chúng tôi sẵn sàng phục vụ bất kể đêm khuya, ngày lễ tết hay thời tiết mưa gió. Chỉ cần bạn yêu cầu, <strong>tài xế lái xe hộ đưa người say về nhà</strong> sẽ xuất phát ngay.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="p-3 bg-sky-50 text-sky-600 rounded-xl shrink-0">
                <Navigation size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-slate-800">Tuyệt đối bảo mật thông tin</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  RINCAR tôn trọng và cam kết <strong>bảo mật thông tin riêng tư</strong>, lộ trình di chuyển cũng như công việc cá nhân của mỗi khách hàng trong suốt quá trình đồng hành.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white relative z-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-12">
            <div className="text-center sm:text-left mb-6 sm:mb-0">
              <span className="text-blue-600 font-bold text-sm uppercase tracking-wider block mb-2">Đánh giá thực tế</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Khách Hàng Nói Gì Về Chúng Tôi?</h2>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleScrollLeft} 
                className="w-12 h-12 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 hover:text-blue-600 shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronRight size={24} className="rotate-180" />
              </button>
              <button 
                onClick={handleScrollRight} 
                className="w-12 h-12 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 hover:text-blue-600 shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          <div 
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scroll-smooth no-scrollbar cursor-grab active:cursor-grabbing select-none"
          >
            {testimonials.map((item, index) => (
              <div 
                key={index}
                className="w-[280px] sm:w-[360px] bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow snap-center shrink-0"
              >
                <div>
                  <div className="flex gap-1 mb-4 text-amber-400">
                    <Star size={18} fill="currentColor" />
                    <Star size={18} fill="currentColor" />
                    <Star size={18} fill="currentColor" />
                    <Star size={18} fill="currentColor" />
                    <Star size={18} fill="currentColor" />
                  </div>
                  <p 
                    className="text-slate-600 italic leading-relaxed text-sm mb-6"
                    dangerouslySetInnerHTML={{ __html: item.text }}
                  />
                </div>
                <div className="flex items-center gap-4 border-t border-slate-200/60 pt-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-slate-200">
                    <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{item.name}</h4>
                    <span className="text-xs text-slate-500">{item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-end mb-12 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">Tin Tức & Cẩm Nang Lái Xe Hộ Mới Nhất</h2>
              <p className="text-slate-500 mt-2">Cập nhật những thông tin và mẹo hay khi lái xe.</p>
            </div>
            <Link href="/tin-tuc" className="hidden sm:flex items-center text-blue-600 font-semibold hover:text-blue-800 transition">
              Xem tất cả <ChevronRight size={18} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestNews.length > 0 ? (
              latestNews.map((item, index) => (
                <Link href={`/tin-tuc/${item.slug}`} key={index} className="group cursor-pointer block">
                  <div className="overflow-hidden rounded-2xl mb-4 aspect-[4/3] bg-slate-100 relative">
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-200 group-hover:scale-105 transition-transform duration-500">
                        <img src="/images/logo.png" className="w-16 h-16 opacity-30 grayscale" alt="No image" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2">
                    {item.excerpt}
                  </p>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center text-slate-500 py-8">
                Đang tải tin tức...
              </div>
            )}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/tin-tuc" className="inline-block px-6 py-3 border border-slate-200 rounded-full font-semibold text-slate-700 hover:bg-slate-50">
              Xem Tất Cả Tin Tức
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
