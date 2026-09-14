import { useEffect, useRef } from 'react'

const EarthBeast = () => {
  const wrapRef = useRef(null)

  useEffect(() => {
    try {
      const wrap = wrapRef.current
      if (!wrap) return

      const bubble = document.getElementById('beastBubble')
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
          width: 130px !important;
          height: 130px !important;
          cursor: pointer !important;
          animation: beastBreathe 3s ease-in-out infinite !important;
        }
        @keyframes beastBreathe {
          0%, 100% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.06) translateY(-4px); }
        }
        .earthBeastWrap.bored .eb-eye { opacity: 0.25 !important; }
        .earthBeastWrap.bored .eb-body { animation: boredWobble 2.4s ease-in-out infinite !important; }
        @keyframes boredWobble {
          0%, 100% { transform: rotate(0); }
          50% { transform: rotate(6deg); }
        }
        .earthBeastWrap.sad .eb-body { animation: sadFloat 3s ease-in-out infinite !important; }
        .earthBeastWrap.sad .eb-eye { opacity: 0.5 !important; }
        .earthBeastWrap.angry { animation: angryShake 0.5s ease-in-out infinite !important; }
        .earthBeastWrap.angry .eb-eye { opacity: 1 !important; }
        .earthBeastWrap.angry::after {
          content: '💢' !important;
          position: absolute !important;
          top: -8px !important;
          right: -8px !important;
          font-size: 22px !important;
          animation: angryPop 0.5s ease-in-out infinite !important;
        }
        @keyframes angryShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
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
          bottom: 140px !important;
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
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%',filter:'drop-shadow(0 4px 6px rgba(0,0,0,0.18))'}}>
          <g className="eb-body">
            <ellipse cx="100" cy="130" rx="60" ry="48" fill="#C19A6B" stroke="#7A5C3E" strokeWidth="3"/>
            <ellipse cx="85" cy="120" rx="8" ry="5" fill="#8B6914" opacity="0.25"/>
            <ellipse cx="115" cy="135" rx="6" ry="4" fill="#8B6914" opacity="0.25"/>
            <ellipse cx="100" cy="145" rx="7" ry="4" fill="#8B6914" opacity="0.2"/>
            <circle cx="100" cy="70" r="42" fill="#D4A574" stroke="#7A5C3E" strokeWidth="3"/>
            <ellipse cx="72" cy="40" rx="10" ry="14" fill="#B8895A" stroke="#7A5C3E" strokeWidth="2.5"/>
            <ellipse cx="128" cy="40" rx="10" ry="14" fill="#B8895A" stroke="#7A5C3E" strokeWidth="2.5"/>
            <ellipse cx="72" cy="40" rx="5" ry="8" fill="#E8C9A0"/>
            <ellipse cx="128" cy="40" rx="5" ry="8" fill="#E8C9A0"/>
            <line className="eb-brow-l" x1="82" y1="58" x2="95" y2="62" stroke="#5D4E37" strokeWidth="3" strokeLinecap="round"/>
            <line className="eb-brow-r" x1="118" y1="62" x2="105" y2="58" stroke="#5D4E37" strokeWidth="3" strokeLinecap="round"/>
            <circle className="eb-eye" cx="88" cy="72" r="7" fill="#3D2817"/>
            <circle className="eb-eye" cx="112" cy="72" r="7" fill="#3D2817"/>
            <circle cx="90" cy="69" r="2.5" fill="#fff"/>
            <circle cx="114" cy="69" r="2.5" fill="#fff"/>
            <ellipse cx="100" cy="82" rx="7" ry="4.5" fill="#7A5C3E"/>
            <path id="ebMouth" d="M 88 90 Q 100 98 112 90" stroke="#5D4E37" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <ellipse cx="78" cy="85" rx="8" ry="4" fill="#E8A090" opacity="0.35"/>
            <ellipse cx="122" cy="85" rx="8" ry="4" fill="#E8A090" opacity="0.35"/>
            <ellipse cx="55" cy="135" rx="12" ry="8" fill="#B8895A" stroke="#7A5C3E" strokeWidth="2"/>
            <ellipse cx="145" cy="135" rx="12" ry="8" fill="#B8895A" stroke="#7A5C3E" strokeWidth="2"/>
            <ellipse cx="78" cy="170" rx="14" ry="10" fill="#B8895A" stroke="#7A5C3E" strokeWidth="2"/>
            <ellipse cx="122" cy="170" rx="14" ry="10" fill="#B8895A" stroke="#7A5C3E" strokeWidth="2"/>
            <path d="M 145 145 Q 165 135 160 155" stroke="#7A5C3E" strokeWidth="3" fill="none" strokeLinecap="round"/>
          </g>
        </svg>
      </div>
    </>
  )
}

export default EarthBeast
