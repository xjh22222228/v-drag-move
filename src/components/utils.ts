
type Position = {
  x: number,
  y: number
}

type TransformProps = {
  scaleX: number,
  scaleY: number,
  skewX: number,
  skewY: number,
  translateX: number,
  translateY: number
}

export function addEvent(
  obj: Window|Document|HTMLElement,
  event: string,
  handler: (e: any) => void
) {
  obj && obj.addEventListener(event, handler)
}

export function removeEvent(
  obj: Window|Document|HTMLElement,
  event: string,
  handler: (e: any) => void
) {
  obj && obj.removeEventListener(event, handler)
}

export function getPosition(e: MouseEvent|TouchEvent): Position {
  if (e.type === 'touchmove') {
    const { touches } = e as TouchEvent
    if (touches.length > 0) {
      return {
        x: touches[0].pageX,
        y: touches[0].pageY
      }
    }

    return {
      x: 0,
      y: 0
    }
  } else {
    const { pageX, pageY } = e as MouseEvent
    return {
      x: pageX,
      y: pageY
    }
  }
}

export function getTransformStyle(el: HTMLElement): TransformProps|null {
  const matrix = window.getComputedStyle(el).transform
  if (!matrix || matrix === 'none') {
    return null
  }
  
  const split = matrix.split(',')
  if (split.length === 6) {
    return {
      scaleX: parseInt(split[0]),
      scaleY: parseInt(split[1]),
      skewX: parseInt(split[2]),
      skewY: parseInt(split[3]),
      translateX: parseInt(split[4]),
      translateY: parseInt(split[5])
    }
  }

  return null
}
