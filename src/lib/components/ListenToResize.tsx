'use client'

import { useEffect, useState } from 'react'

interface ViewportDimensions {
  height: number
  width: number
}

interface ListenToResizeProps {
  trigger: number
}

export default function ListenToResize({ trigger }: ListenToResizeProps) {
  // zabezpieczenie dla SSR
  const [viewportDimensions, setViewportDimensions] =
    useState<ViewportDimensions>({
      height: typeof window !== 'undefined' ? window.innerHeight : 0,
      width: typeof window !== 'undefined' ? window.innerWidth : 0,
    })

  const [uiContentHeight, setUiContentHeight] = useState<number | null>(null)

  function changeLayout(
    viewportDimensions: ViewportDimensions,
    uiHeight: number | null,
  ) {
    const { height, width } = viewportDimensions
    const appWrapper = document.querySelector<HTMLDivElement>('.app-wrapper')
    if (!appWrapper) return

    if (uiHeight === null) return

    const avalHeight = height - 200 - uiHeight
    if (avalHeight > 0 || width < 1112) {
      appWrapper.style.width = '540px'
    } else {
      appWrapper.style.width = '1060px'
    }
  }

  function getUiContentHeight(): number {
    const elements = Array.from(
      document.querySelectorAll<HTMLDivElement>('.element-wrapper'),
    )
    return elements.reduce((sum, el) => sum + el.offsetHeight, 0)
  }

  function handleViewportResize() {
    const height = window.innerHeight
    const width = window.innerWidth
    setViewportDimensions({ height, width })
  }

  useEffect(() => {
    const totalHeight = getUiContentHeight()
    setUiContentHeight(totalHeight)
  }, [trigger])

  useEffect(() => {
    if (uiContentHeight !== null) {
      changeLayout(viewportDimensions, uiContentHeight)
    }
  }, [uiContentHeight, viewportDimensions])

  useEffect(() => {
    window.addEventListener('resize', handleViewportResize)
    return () => window.removeEventListener('resize', handleViewportResize)
  }, [])

  return <div></div>
}
