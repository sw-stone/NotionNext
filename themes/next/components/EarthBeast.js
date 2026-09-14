import { useEffect, useRef, useState } from 'react'

const EarthBeast = () => {
  const wrapRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const bubble = document.getElementById('beastBubble')
    const last = localStorage.getItem('lastBlogUpdate')
    const t = last ? new Date(last) : new Date(Date.now() - 86400000)
    const d = Math.floor((Date.now() - t) / 86400000)
    let s = 'happy'
    if (d >= 3) s = 'angry'
    else if (d >= 2) s = 'sad'
    else if (d >= 1) s = 'bored'
    wrap.className = s === 'happy' ? '' : 'earthBeastWrap ' + s
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
    window.EarthBeast = { update: () => { localStorage.setItem('lastBlogUpdate', new Date().toISOString()); location.reload() } }
  }, [])

  return (
    <>
      <style jsx global>{`
        #earthBeastWrap {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 9999;
          width: 120px;
          height: 120px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        #earthBeastSvg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
          animation: breathe 3s ease-in-out infinite;
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        #earthBeastWrap.bored .eb-eye { opacity: 0.3; }
        #earthBeastWrap.bored #ebBody { animation: boredWobble 2s ease-in-out infinite; }
        @keyframes boredWobble {
          0%, 100% { transform: rotate(0); }
          50% { transform: rotate(8deg); }
        }
        #earthBeastWrap.sad #ebBody { animation: sadFloat 3s ease-in-out infinite; }
        #earthBeastWrap.sad .eb-eye { opacity: 0.6; }
        #earthBeastWrap.angry { animation: angryShake 0.5s ease-in-out infinite; }
        #earthBeastWrap.angry .eb-eye { opacity: 1; }
        #earthBeastWrap.angry::after {
          content: '💢';
          position: absolute;
          top: -10px;
          right: -10px;
          font-size: 24px;
          animation: angryPop 0.5s ease-in-out infinite;
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
          50% { transform: translateY(-6px); }
        }
        #beastBubble {
          position: absolute;
          bottom: 130px;
          right: 10px;
          background: #fff;
          padding: 8px 14px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
          font-size: 13px;
          white-space: nowrap;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.3s;
          pointer-events: none;
          border: 1px solid #f0e6d8;
        }
        #earthBeastWrap.showBubble #beastBubble {
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 768px) {
          #earthBeastWrap { width: 90px; height: 90px; bottom: 10px; right: 10px; }
        }
      `}</style>
      <div id="earthBeastWrap" ref={wrapRef}>
        <div id="beastBubble">✨ 欢迎来到我的博客！</div>
        <svg id="earthBeastSvg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g id="ebBody">
            <ellipse cx="50" cy="62" rx="28" ry="22" fill="#C19A6B" stroke="#8B6914" strokeWidth="2" />
            <circle cx="50" cy="36" r="18" fill="#D4A574" stroke="#8B6914" strokeWidth="2" />
            <ellipse cx="36" cy="22" rx="4" ry="7" fill="#C19A6B" stroke="#8B6914" strokeWidth="1.5" />
            <ellipse cx="64" cy="22" rx="4" ry="7" fill="#C19A6B" stroke="#8B6914" strokeWidth="1.5" />
            <line className="eb-brow-l" x1="42" y1="30" x2="48" y2="32" stroke="#5D4E37" strokeWidth="2" strokeLinecap="round" />
            <line className="eb-brow-r" x1="52" y1="32" x2="58" y2="30" stroke="#5D4E37" strokeWidth="2" strokeLinecap="round" />
            <circle className="eb-eye" cx="43" cy="36" r="2.8" fill="#3D2817" />
            <circle className="eb-eye" cx="57" cy="36" r="2.8" fill="#3D2817" />
            <circle cx="44" cy="35" r="1" fill="#fff" />
            <circle cx="58" cy="35" r="1" fill="#fff" />
            <ellipse cx="50" cy="41" rx="2.8" ry="1.8" fill="#8B6914" />
            <path id="ebMouth" d="M 43 46 Q 50 51 57 46" stroke="#5D4E37" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <ellipse cx="26" cy="66" rx="5" ry="3" fill="#C19A6B" stroke="#8B6914" strokeWidth="1" />
            <ellipse cx="74" cy="66" rx="5" ry="3" fill="#C19A6B" stroke="#8B6914" strokeWidth="1" />
            <ellipse cx="40" cy="81" rx="6" ry="4" fill="#C19A6B" stroke="#8B6914" strokeWidth="1" />
            <ellipse cx="60" cy="81" rx="6" ry="4" fill="#C19A6B" stroke="#8B6914" strokeWidth="1" />
            <circle cx="45" cy="66" r="1.8" fill="#8B6914" opacity="0.3" />
            <circle cx="55" cy="71" r="1.3" fill="#8B6914" opacity="0.3" />
            <circle cx="50" cy="76" r="1.8" fill="#8B6914" opacity="0.3" />
          </g>
        </svg>
      </div>
    </>
  )
}

export default EarthBeast
