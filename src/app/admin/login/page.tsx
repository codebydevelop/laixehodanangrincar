"use client"

import { useRef, useState } from 'react'

export default function AdminLogin() {
  const [loading, setLoading] = useState(false)
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const usernameVal = usernameRef.current?.value?.trim() ?? ''
    const passwordVal = passwordRef.current?.value?.trim() ?? ''

    if (!usernameVal || !passwordVal) {
      alert('Vui lòng nhập tên đăng nhập và mật khẩu!')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: usernameVal,
          password: passwordVal
        }),
      })

      if (res.ok) {
        window.location.href = '/admin'
      } else {
        window.location.href = '/'
      }
    } catch {
      alert('Lỗi kết nối, vui lòng thử lại.')
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-700">RINCAR</h1>
          <p className="text-sm text-slate-500">Đăng nhập Quản trị viên</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700">Tên đăng nhập</label>
            <input
              ref={usernameRef}
              type="text"
              name="username"
              required
              defaultValue=""
              autoComplete="username"
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Nhập tên đăng nhập"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Mật khẩu</label>
            <input
              ref={passwordRef}
              type="password"
              name="password"
              required
              defaultValue=""
              autoComplete="current-password"
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition"
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
      </div>
    </div>
  )
}
