'use client'

import { useEffect } from 'react'

export default function VerifyPage() {
  useEffect(() => {
    const rayIdEl = document.getElementById('rayId')
    if (rayIdEl) {
      const chars = '0123456789abcdef'
      let result = ''
      for (let i = 0; i < 16; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      rayIdEl.textContent = result
    }

    let currentCheck = 0
    const timing = ['1.8s', '1.4s', '2.9s', '1.2s', '2.3s']
    const delays = [1800, 1400, 2900, 1200, 2300]

    const performSecurityCheck = () => {
      if (currentCheck < 5) {
        const checkIcon = document.getElementById(`check${currentCheck + 1}`)
        const timingEl = document.getElementById(`timing${currentCheck + 1}`)
        if (checkIcon && timingEl) {
          checkIcon.innerHTML = '<svg style="fill:#28a745;width:20px;height:20px;" viewBox="0 0 24 24"><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>'
          timingEl.textContent = timing[currentCheck]
          timingEl.style.color = '#28a745'
        }
        currentCheck++
        setTimeout(performSecurityCheck, delays[currentCheck - 1] || 2000)
      } else {
        setTimeout(() => {
          document.cookie = 'browser_verified=true; path=/'
          window.location.href = '/'
        }, 1500)
      }
    }

    setTimeout(performSecurityCheck, 800)
  }, [])

  return (
    <div style={{
      fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
      background: '#0a0a0a',
      color: '#ffffff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '500px', textAlign: 'center' }}>
        <div style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '3rem' }}>wavelaunch.app</div>

        <div style={{ marginBottom: '2rem', position: 'relative', width: 64, height: 64, marginLeft: 'auto', marginRight: 'auto' }}>
          <div style={{
            width: 64,
            height: 64,
            border: '3px solid #333',
            borderTop: '3px solid #0066cc',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
        </div>

        <div style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem' }}>
          Checking your browser before accessing wavelaunch.app
        </div>
        <div style={{ fontSize: '1rem', color: '#999', marginBottom: '2rem' }}>
          This process is automatic. Your browser will redirect to your requested content shortly.
        </div>

        <div style={{
          display: 'flex', justifyContent: 'center', gap: '0.5rem', margin: '2rem 0'
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%', background: '#333',
            animation: 'dotPulse 1.5s infinite'
          }} />
          <div style={{
            width: 8, height: 8, borderRadius: '50%', background: '#333',
            animation: 'dotPulse 1.5s infinite', animationDelay: '0.2s'
          }} />
          <div style={{
            width: 8, height: 8, borderRadius: '50%', background: '#333',
            animation: 'dotPulse 1.5s infinite', animationDelay: '0.4s'
          }} />
        </div>

        <div style={{
          background: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: 8,
          padding: '2rem',
          marginBottom: '2rem',
          textAlign: 'left'
        }}>
          <div style={{
            fontSize: '1.1rem', fontWeight: 600,
            marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'
          }}>
            🛡️ DDoS Protection Analysis
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {[...Array(5)].map((_, i) => (
              <li key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 0',
                fontSize: '0.9rem',
                color: '#ccc',
                borderBottom: i < 4 ? '1px solid #2a2a2a' : 'none'
              }}>
                <div id={`check${i + 1}`} style={{ width: 20, height: 20 }}></div>
                <div style={{ flex: 1 }}>Security check {i + 1}</div>
                <div id={`timing${i + 1}`} style={{ fontSize: '0.8rem', color: '#666' }}>~...</div>
              </li>
            ))}
          </ul>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            background: '#0066cc',
            color: 'white',
            padding: '0.3rem 0.8rem',
            borderRadius: 20,
            fontSize: '0.8rem',
            fontWeight: 500,
            marginTop: '1rem'
          }}>
            🔒 WaveLaunch DDoS Protection
          </div>
        </div>

        <div style={{ fontSize: '0.9rem', color: '#666' }}>
          Performance & security by <a href="#" style={{ color: '#0066cc', fontWeight: 500 }}>WaveLaunch Protection</a><br />
          Ray ID: <span id="rayId">loading...</span>
        </div>
      </div>

      {/* Inline styles for animations */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
