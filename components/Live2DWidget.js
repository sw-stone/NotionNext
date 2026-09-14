import { useEffect } from 'react'

const Live2DWidget = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (document.getElementById('live2d-widget-script')) return

    const script = document.createElement('script')
    script.id = 'live2d-widget-script'
    script.src = '/live2d-widget/autoload.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      const el = document.getElementById('live2d-widget-script')
      if (el) el.remove()
    }
  }, [])

  return null
}

export default Live2DWidget
