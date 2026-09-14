import { useEffect, useRef } from 'react'

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
    wrap.className = s === 'happy' ? 'earthBeastWrap' : 'earthBeastWrap ' + s
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
        .earthBeastWrap {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 9999;
          width: 130px;
          height: 130px;
          font-family: sans-serif;
          cursor: pointer;
          animation: breathe 3s ease-in-out infinite;
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.06) translateY(-4px); }
        }
        .earthBeastWrap.bored .eb-eye { opacity: 0.25; }
        .earthBeastWrap.bored .eb-body { animation: boredWobble 2.4s ease-in-out infinite; }
        @keyframes boredWobble {
          0%, 100% { transform: rotate(0); }
          50% { transform: rotate(6deg); }
        }
        .earthBeastWrap.sad .eb-body { animation: sadFloat 3s ease-in-out infinite; }
        .earthBeastWrap.sad .eb-eye { opacity: 0.5; }
        .earthBeastWrap.angry { animation: angryShake 0.5s ease-in-out infinite; }
        .earthBeastWrap.angry .eb-eye { opacity: 1; }
        .earthBeastWrap.angry::after {
          content: '💢';
          position: absolute;
          top: -8px;
          right: -8px;
          font-size: 22px;
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
          50% { transform: translateY(-5px); }
        }
        #beastBubble {
          position: absolute;
          bottom: 140px;
          right: 5px;
          background: rgba(255,255,255,0.95);
          padding: 8px 14px;
          border-radius: 14px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.12);
          font-size: 13px;
          white-space: nowrap;
          opacity: 0;
          transform: translateY(8px);
          transition: all 0.3s;
          pointer-events: none;
          border: 1px solid #efe6d8;
        }
        .earthBeastWrap.showBubble #beastBubble {
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 768px) {
          .earthBeastWrap { width: 100px; height: 100px; bottom: 10px; right: 10px; }
          #beastBubble { bottom: 115px; right: 0; font-size: 12px; }
        }
      `}</style>
      <div id="earthBeastWrap" ref={wrapRef} className="earthBeastWrap">
        <div id="beastBubble">✨ 欢迎来到我的博客！</div>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%',filter:'drop-shadow(0 4px 6px rgba(0,0,0,0.18))'}}>
          <g className="eb-body">
            {/* 身体 - 圆滚滚的大地兽 */}
            <ellipse cx="100" cy="130" rx="60" ry="48" fill="#C19A6B" stroke="#7A5C3E" strokeWidth="3"/>
            {/* 大地纹理 */}
            <ellipse cx="85" cy="120" rx="8" ry="5" fill="#8B6914" opacity="0.25"/>
            <ellipse cx="115" cy="135" rx="6" ry="4" fill="#8B6914" opacity="0.25"/>
            <ellipse cx="100" cy="145" rx="7" ry="4" fill="#8B6914" opacity="0.2"/>
            
            {/* 头部 */}
            <circle cx="100" cy="70" r="42" fill="#D4A574" stroke="#7A5C3E" strokeWidth="3"/>
            
            {/* 耳朵/小角 */}
            <ellipse cx="72" cy="40" rx="10" ry="14" fill="#B8895A" stroke="#7A5C3E" strokeWidth="2.5"/>
            <ellipse cx="128" cy="40" rx="10" ry="14" fill="#B8895A" stroke="#7A5C3E" strokeWidth="2.5"/>
            <ellipse cx="72" cy="40" rx="5" ry="8" fill="#E8C9A0"/>
            <ellipse cx="128" cy="40" rx="5" ry="8" fill="#E8C9A0"/>
            
            {/* 眉毛 */}
            <line className="eb-brow-l" x1="82" y1="58" x2="95" y2="62" stroke="#5D4E37" strokeWidth="3" strokeLinecap="round"/>
            <line className="eb-brow-r" x1="118" y1="62" x2="105" y2="58" stroke="#5D4E37" strokeWidth="3" strokeLinecap="round"/>
            
            {/* 眼睛 - 大大圆圆的 */}
            <circle className="eb-eye" cx="88" cy="72" r="7" fill="#3D2817"/>
            <circle className="eb-eye" cx="112" cy="72" r="7" fill="#3D2817"/>
            {/* 眼睛高光 */}
            <circle cx="90" cy="69" r="2.5" fill="#fff"/>
            <circle cx="114" cy="69" r="2.5" fill="#fff"/>
            
            {/* 鼻子 */}
            <ellipse cx="100" cy="82" rx="7" ry="4.5" fill="#7A5C3E"/>
            
            {/* 嘴巴 */}
            <path id="ebMouth" d="M 88 90 Q 100 98 112 90" stroke="#5D4E37" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            
            {/* 腮红 */}
            <ellipse cx="78" cy="85" rx="8" ry="4" fill="#E8A090" opacity="0.35"/>
            <ellipse cx="122" cy="85" rx="8" ry="4" fill="#E8A090" opacity="0.35"/>
            
            {/* 小短手 */}
            <ellipse cx="55" cy="135" rx="12" ry="8" fill="#B8895A" stroke="#7A5C3E" strokeWidth="2"/>
            <ellipse cx="145" cy="135" rx="12" ry="8" fill="#B8895A" stroke="#7A5C3E" strokeWidth="2"/>
            
            {/* 小短脚 */}
            <ellipse cx="78" cy="170" rx="14" ry="10" fill="#B8895A" stroke="#7A5C3E" strokeWidth="2"/>
            <ellipse cx="122" cy="170" rx="14" ry="10" fill="#B8895A" stroke="#7A5C3E" strokeWidth="2"/>
            
            {/* 尾巴 */}
            <path d="M 145 145 Q 165 135 160 155" stroke="#7A5C3E" strokeWidth="3" fill="none" strokeLinecap="round"/>
          </g>
        </svg>
      </div>
    </>
  )
}

export default EarthBeast
