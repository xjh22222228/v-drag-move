
export function addEvent(
  obj: Window|Document|HTMLElement,
  event: string,
  handler: (e: any) => void
) {
  obj.addEventListener(event, handler)
}

export function removeEvent(
  obj: Window|Document|HTMLElement,
  event: string,
  handler: (e: any) => void
) {
  obj.removeEventListener(event, handler)
}
