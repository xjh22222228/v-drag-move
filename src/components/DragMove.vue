<template>
  <!-- eslint-disable -->
  <slot></slot>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, watch } from 'vue'
import { addEvent, removeEvent, getPosition, getTransformStyle } from './utils'

let eventFor = {
  mousedown: 'mousedown',
  mouseup: 'mouseup',
  mousemove: 'mousemove'
}

if ('ontouchstart' in window) {
  eventFor.mousedown = 'touchstart'
  eventFor.mouseup = 'touchend'
  eventFor.mousemove = 'touchmove'
}

export default defineComponent({
  name: 'DragMove',

  props: {
    // 移动对象, 移动整个容器
    moveSelector: {
      type: String,
      required: true
    },
    // 拖动对象
    dragSelector: {
      type: String,
    },
    // 是否处于激活状态
    active: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {
    let moveEl: HTMLElement
    let dragEl: HTMLElement

    let shiftX = 0
    let shiftY = 0
    let moveElTranslateX = 0
    let moveElTranslateY = 0

    function mouseMove(e: MouseEvent|TouchEvent) {
      e.stopPropagation()
      e.preventDefault()

      const position = getPosition(e)
      let x = position.x - shiftX + moveElTranslateX
      let y = position.y - shiftY + moveElTranslateY

      moveEl.style.transform = `translate(${x}px, ${y}px)`
    }

    function mouseDown(e: MouseEvent|TouchEvent) {
      const transform = getTransformStyle(moveEl)
      const position = getPosition(e)
      shiftX = position.x
      shiftY = position.y
      
      if (transform) {
        moveElTranslateX = transform.translateX
        moveElTranslateY = transform.translateY
      }

      addEvent(document, eventFor.mousemove, mouseMove)
    }

    function mouseUp(e: MouseEvent) {
      e.stopPropagation()
      e.preventDefault()
      removeEvent(document, eventFor.mousemove, mouseMove)
    }

    // init component setting
    function init() {
      destroy()

      moveEl = document.querySelector(props.moveSelector) as HTMLElement
      dragEl = document.querySelector(props.dragSelector || props.moveSelector) as HTMLElement

      if (!moveEl || !dragEl) return

      dragEl.style.cursor = 'move'
      dragEl.style.userSelect = 'none'
      addEvent(dragEl, eventFor.mousedown, mouseDown)
      addEvent(document, eventFor.mouseup, mouseUp)
    }

    // Destroy event
    function destroy() {
      shiftX = shiftY = moveElTranslateX = moveElTranslateY = 0
      
      removeEvent(dragEl, eventFor.mousedown, mouseDown)
      removeEvent(dragEl, eventFor.mouseup, mouseUp)

      moveEl && (moveEl.style.transform = 'none')
    }

    // Watch active
    watch(() => props.active, prevVal => {
      if (prevVal) {
        setTimeout(init, 100)
      } else {
        destroy()
      }
    })

    onMounted(init)
    onUnmounted(destroy)
  }
})
</script>
