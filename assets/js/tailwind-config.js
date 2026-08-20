tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#1a1d23', light: '#22262e', 50:'#F0F1F3',100:'#E0E2E6',200:'#C3C7CE',300:'#9AA1AC',400:'#6B7280',500:'#4B5563',600:'#374151',700:'#252B36',800:'#1B2029',900:'#14181F' },
        paper: { DEFAULT: '#f0ebe3', 100:'#FFFFFF', 200:'#f5f0e8', 300:'#e8e2d6' },
        signal: { DEFAULT: '#e8a43a', 50:'#FFF8EB', 100:'#FFF3D2', 200:'#FFE6A8', 600:'#D4922E', 700:'#B9860A' },
        route:  { DEFAULT: '#0FA36B', 50:'#E8FAF2', 100:'#D9F5E7', 600:'#0C8757', 700:'#08643F' },
        clay:   { DEFAULT: '#E0563D', 50:'#FEEDEA', 100:'#FCDDD8' },
        surface:{ DEFAULT: '#f7f3ec', 200:'#ede7dc', 300:'#e0d8cc' },
        warm:   { 50:'#fdf8f0', 100:'#f9f0e0', 200:'#f0e4cc', 300:'#e6d5b4', 400:'#d4be94', 500:'#c4a874' }
      },
      fontFamily: {
        display: ['"DM Sans"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      boxShadow: {
        'neu':      '6px 6px 14px rgba(166,155,139,.22), -6px -6px 14px rgba(255,255,255,.7)',
        'neu-sm':   '3px 3px 8px rgba(166,155,139,.18), -3px -3px 8px rgba(255,255,255,.65)',
        'neu-lg':   '10px 10px 24px rgba(166,155,139,.28), -10px -10px 24px rgba(255,255,255,.8)',
        'neu-inset':'inset 3px 3px 8px rgba(166,155,139,.2), inset -3px -3px 8px rgba(255,255,255,.6)',
        'neu-pressed':'inset 4px 4px 10px rgba(166,155,139,.25), inset -4px -4px 10px rgba(255,255,255,.7)',
        'card':     '4px 4px 12px rgba(166,155,139,.2), -4px -4px 12px rgba(255,255,255,.65)',
        'float':    '8px 8px 20px rgba(166,155,139,.25), -8px -8px 20px rgba(255,255,255,.75)',
      },
      borderRadius: {
        'neu': '20px',
        'neu-lg': '28px',
        'neu-xl': '36px'
      },
      animation: {
        'float': 'floaty 4.5s ease-in-out infinite',
        'float-delayed': 'floaty 4.5s ease-in-out 1.2s infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease both',
        'count-up': 'countUp 1.2s ease both',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        countUp: {
          from: { opacity: '0', transform: 'scale(0.8)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      }
    }
  }
}
