
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
