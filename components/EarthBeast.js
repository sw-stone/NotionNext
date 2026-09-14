import { useEffect, useRef } from 'react'

const EarthBeast = () => {
  const wrapRef = useRef(null)

  useEffect(() => {
    try {
      const wrap = wrapRef.current
      if (!wrap) return

      const bubble = document.getElementById('beastBubble')
      const mouth = document.getElementById('ebMouth')
      const browL = document.querySelector('.eb-brow-l')
      const browR = document.querySelector('.eb-brow-r')
      const eyeL = document.querySelector('.eb-eye-l')
      const eyeR = document.querySelector('.eb-eye-r')
      const blush = document.querySelector('.eb-blush')
      const last = localStorage.getItem('lastBlogUpdate')
      const t = last ? new Date(last) : new Date(Date.now() - 86400000)
      const d = Math.floor((Date.now() - t) / 86400000)
      let s = 'happy'
      if (d >= 3) s = 'angry'
      else if (d >= 2) s = 'sad'
      else if (d >= 1) s = 'bored'

      wrap.className = 'earthBeastWrap' + (s !== 'happy' ? ' ' + s : '')

      const m = {
        '0': '✨ 今天也加油写博客哦！',
        '1': '😒 1 天没更新了...',
        '2': '😢 2 天没更新了...',
        '3+': '💢 都 3 天了！快写博客！'
      }

      const showMsg = () => {
        const k = d >= 3 ? '3+' : String(d)
        if (bubble) bubble.textContent = m[k] || m['0']
        wrap.classList.add('showBubble')
        setTimeout(() => wrap.classList.remove('showBubble'), 3000)
      }

      showMsg()
      wrap.addEventListener('click', showMsg)

      if (s === 'angry') {
        const lastN = localStorage.getItem('lastAngryNotif')
        if (!lastN || (Date.now() - new Date(lastN)) > 21600000) {
          console.log('📧 邮件: 2991322544@qq.com')
          console.log('💬 微信: Hercules-sw')
          localStorage.setItem('lastAngryNotif', new Date().toISOString())
        }
      }

      window.EarthBeast = {
        update: () => {
          localStorage.setItem('lastBlogUpdate', new Date().toISOString())
          location.reload()
        }
      }
    } catch (e) {
      console.error('EarthBeast init error:', e)
    }
  }, [])

  return (
    <>
      <style jsx global>{`
        .earthBeastWrap {
          position: fixed !important;
          bottom: 20px !important;
          right: 20px !important;
          z-index: 99999 !important;
          width: 140px !important;
          height: 140px !important;
          cursor: pointer !important;
          animation: beastBreathe 3s ease-in-out infinite !important;
        }
        @keyframes beastBreathe {
          0%, 100% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.05) translateY(-3px); }
        }
        .earthBeastWrap.bored .eb-body { animation: boredWobble 2.4s ease-in-out infinite !important; }
        @keyframes boredWobble {
          0%, 100% { transform: rotate(0); }
          50% { transform: rotate(6deg); }
        }
        .earthBeastWrap.sad .eb-body { animation: sadFloat 3s ease-in-out infinite !important; }
        .earthBeastWrap.angry { animation: angryShake 0.5s ease-in-out infinite !important; }
        @keyframes angryShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
        }
        .earthBeastWrap.angry::after {
          content: '💢' !important;
          position: absolute !important;
          top: -8px !important;
          right: -8px !important;
          font-size: 22px !important;
          animation: angryPop 0.5s ease-in-out infinite !important;
        }
        @keyframes angryPop {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
        }
        @keyframes sadFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        #beastBubble {
          position: absolute !important;
          bottom: 150px !important;
          right: 5px !important;
          background: rgba(255,255,255,0.95) !important;
          padding: 8px 14px !important;
          border-radius: 14px !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.12) !important;
          font-size: 13px !important;
          white-space: nowrap !important;
          opacity: 0 !important;
          transform: translateY(8px) !important;
          transition: all 0.3s !important;
          pointer-events: none !important;
          border: 1px solid #efe6d8 !important;
        }
        .earthBeastWrap.showBubble #beastBubble {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        @media (max-width: 768px) {
          .earthBeastWrap { width: 100px !important; height: 100px !important; bottom: 10px !important; right: 10px !important; }
          #beastBubble { bottom: 115px !important; right: 0 !important; font-size: 12px !important; }
        }
      `}</style>
      <div id="earthBeastWrap" ref={wrapRef} className="earthBeastWrap">
        <div id="beastBubble">✨ 欢迎来到我的博客！</div>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%',filter:'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'}}>
          <defs>
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#A8D8EA"/>
              <stop offset="50%" stopColor="#9B8FDB"/>
              <stop offset="100%" stopColor="#7B68AE"/>
            </linearGradient>
            <linearGradient id="bellyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D4C4F0"/>
              <stop offset="100%" stopColor="#B8A9E0"/>
            </linearGradient>
          </defs>
          <g className="eb-body">
            {/* 尾巴 */}
            <path d="M 145 140 Q 170 120 165 150 Q 160 170 150 160" fill="url(#bodyGrad)" stroke="#6B5B95" strokeWidth="2"/>
            
            {/* 身体 */}
            <ellipse cx="105" cy="125" rx="55" ry="45" fill="url(#bodyGrad)" stroke="#6B5B95" strokeWidth="2.5"/>
            
            {/* 肚子 */}
            <ellipse cx="105" cy="135" rx="35" ry="28" fill="url(#bellyGrad)" opacity="0.8"/>
            
            {/* 斑点 */}
            <circle cx="85" cy="115" r="4" fill="#6B5B95" opacity="0.3"/>
            <circle cx="120" cy="130" r="3" fill="#6B5B95" opacity="0.3"/>
            <circle cx="95" cy="140" r="3.5" fill="#6B5B95" opacity="0.25"/>
            
            {/* 头部 */}
            <circle cx="100" cy="65" r="40" fill="url(#bodyGrad)" stroke="#6B5B95" strokeWidth="2.5"/>
            
            {/* 小角 */}
            <path d="M 100 30 L 105 20 L 95 20 Z" fill="#6B5B95" stroke="#5A4A85" strokeWidth="1.5"/>
            
            {/* 耳朵 */}
            <circle cx="70" cy="45" r="6" fill="#9B8FDB" stroke="#6B5B95" strokeWidth="2"/>
            <circle cx="130" cy="45" r="6" fill="#9B8FDB" stroke="#6B5B95" strokeWidth="2"/>
            
            {/* 腮红 */}
            <ellipse className="eb-blush" cx="78" cy="78" rx="7" ry="4" fill="#F0A0A0" opacity="0.5"/>
            <ellipse className="eb-blush" cx="122" cy="78" rx="7" ry="4" fill="#F0A0A0" opacity="0.5"/>
            
            {/* 眉毛 - 默认开心 */}
            <path className="eb-brow-l" d="M 82 55 Q 87 52 93 55" stroke="#5A4A85" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path className="eb-brow-r" d="M 118 55 Q 113 52 107 55" stroke="#5A4A85" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            
            {/* 眼睛 - 默认开心闭眼 */}
            <path className="eb-eye-l" d="M 82 68 Q 88 74 94 68" stroke="#3D2817" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path className="eb-eye-r" d="M 106 68 Q 112 74 118 68" stroke="#3D2817" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            
            {/* 鼻子 */}
            <ellipse cx="100" cy="76" rx="4" ry="3" fill="#6B5B95"/>
            
            {/* 嘴巴 - 默认微笑 */}
            <path id="ebMouth" d="M 92 84 Q 100 91 108 84" stroke="#5A4A85" strokeWidth="2" fill="none" strokeLinecap="round"/>
            
            {/* 小短手 */}
            <ellipse cx="60" cy="120" rx="10" ry="7" fill="url(#bodyGrad)" stroke="#6B5B95" strokeWidth="2"/>
            <ellipse cx="150" cy="120" rx="10" ry="7" fill="url(#bodyGrad)" stroke="#6B5B95" strokeWidth="2"/>
            
            {/* 小短脚 */}
            <ellipse cx="80" cy="165" rx="12" ry="9" fill="url(#bodyGrad)" stroke="#6B5B95" strokeWidth="2"/>
            <ellipse cx="120" cy="165" rx="12" ry="9" fill="url(#bodyGrad)" stroke="#6B5B95" strokeWidth="2"/>
            
            {/* 铃铛 */}
            <circle cx="100" cy="105" r="5" fill="#FFD700" stroke="#DAA520" strokeWidth="1.5"/>
            <line x1="100" y1="100" x2="100" y2="95" stroke="#DAA520" strokeWidth="1.5"/>
          </g>
        </svg>
      </div>
    </>
  )
}

export default EarthBeast
