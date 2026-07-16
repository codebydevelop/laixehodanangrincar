"use client"

import { MessageCircle, Phone } from 'lucide-react'

export default function FloatingSocials() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      <a
        href="https://www.facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-transform hover:scale-110 animate-bounce"
        aria-label="Facebook"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
        {/* Ping effect behind */}
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-50"></span>
      </a>

      <a
        href="https://zalo.me/0906499078"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-transform hover:scale-110 animate-bounce [animation-delay:150ms]"
        aria-label="Zalo"
      >
        <MessageCircle size={28} />
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-50"></span>
      </a>

      <a
        href="tel:0906499078"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform hover:scale-110 animate-bounce [animation-delay:300ms]"
        aria-label="Phone"
      >
        <Phone size={28} />
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-50"></span>
      </a>
    </div>
  )
}
