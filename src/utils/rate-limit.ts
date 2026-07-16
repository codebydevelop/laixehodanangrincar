/**
 * Sliding Window Rate Limiter với Burst Detection.
 *
 * Cơ chế: Mỗi request của một IP đều được ghi lại timestamp.
 * Khi có request mới, hệ thống tính số lần trong "cửa sổ trượt" (sliding window).
 * Nếu trong khoảng windowMs vừa qua có nhiều hơn maxRequests → chặn.
 *
 * Ưu điểm so với fixed window: Phát hiện burst thực sự (5 request trong 3s bị chặn),
 * không phải chờ qua đủ cửa sổ mới reset.
 */

// Lưu danh sách timestamps của mỗi IP
const requestLog = new Map<string, number[]>()

// Dọn dẹp entry cũ mỗi 5 phút để tránh memory leak
setInterval(() => {
  const now = Date.now()
  requestLog.forEach((timestamps, ip) => {
    // Xóa các timestamp cũ hơn 10 phút
    const fresh = timestamps.filter(t => now - t < 10 * 60 * 1000)
    if (fresh.length === 0) {
      requestLog.delete(ip)
    } else {
      requestLog.set(ip, fresh)
    }
  })
}, 5 * 60 * 1000)

export interface RateLimitOptions {
  /** Số request tối đa được phép trong cửa sổ windowMs */
  maxRequests: number
  /** Kích thước cửa sổ trượt (ms) — e.g. 10000 = 10 giây */
  windowMs: number
  /**
   * (Tuỳ chọn) Burst check: nếu có nhiều hơn burstMax request
   * trong burstWindowMs, chặn ngay lập tức bất kể maxRequests.
   */
  burstMax?: number
  burstWindowMs?: number
}

/**
 * Kiểm tra xem IP có bị chặn không dựa trên sliding window + burst detection.
 * @returns true nếu bị chặn
 */
export function isRateLimited(ip: string, options: RateLimitOptions): boolean {
  const now = Date.now()
  const { maxRequests, windowMs, burstMax, burstWindowMs } = options

  // Lấy hoặc tạo mới log timestamps cho IP này
  const timestamps = requestLog.get(ip) ?? []

  // Loại bỏ timestamps nằm ngoài cửa sổ lớn nhất
  const maxWindow = Math.max(windowMs, burstWindowMs ?? 0)
  const freshTimestamps = timestamps.filter(t => now - t < maxWindow)

  // --- BURST CHECK (ưu tiên cao hơn) ---
  if (burstMax !== undefined && burstWindowMs !== undefined) {
    const inBurstWindow = freshTimestamps.filter(t => now - t < burstWindowMs).length
    if (inBurstWindow >= burstMax) {
      // Ghi request này nhưng vẫn chặn
      freshTimestamps.push(now)
      requestLog.set(ip, freshTimestamps)
      return true // BỊ CHẶN vì burst
    }
  }

  // --- SLIDING WINDOW CHECK ---
  const inWindow = freshTimestamps.filter(t => now - t < windowMs).length
  if (inWindow >= maxRequests) {
    freshTimestamps.push(now)
    requestLog.set(ip, freshTimestamps)
    return true // BỊ CHẶN vì vượt giới hạn
  }

  // Request hợp lệ — ghi lại timestamp
  freshTimestamps.push(now)
  requestLog.set(ip, freshTimestamps)
  return false
}

/**
 * Validate số điện thoại Việt Nam.
 * 10 chữ số, bắt đầu bằng 03x, 05x, 07x, 08x, 09x.
 */
export function isValidVietnamesePhone(phone: string): boolean {
  const cleaned = phone.replace(/\s/g, '')
  return /^(0[3578])[0-9]{8}$/.test(cleaned) || /^(09)[0-9]{8}$/.test(cleaned)
}
