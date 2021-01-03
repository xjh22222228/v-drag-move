<template>
  <!-- eslint-disable -->
  <slot></slot>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, watch } from 'vue'
import { addEvent, removeEvent } from './utils'

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
      required: true
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

      let x = 0
      let y = 0

      if (e.type === 'touchmove') {
        const { touches } = e as TouchEvent
        if (touches.length > 0) {
          x = touches[0].pageX - shiftX
          y = touches[0].pageY - shiftY
        }
      } else {
        const { pageX, pageY } = e as MouseEvent
        x = pageX - shiftX
        y = pageY - shiftY
      }

      moveEl.style.transform = `translate(${x + moveElTranslateX}px, ${y + moveElTranslateY}px)`
    }

    function mouseDown(e: MouseEvent|TouchEvent) {
      e.stopPropagation()
      e.preventDefault()

      // matrix(1, 0, 0, 1, 33, 31) || none
      const result = window.getComputedStyle(moveEl).transform
      
      if (e.type === 'touchstart') {
        const { touches } = e as TouchEvent
        if (touches.length > 0) {
          shiftX = touches[0].pageX
          shiftY = touches[0].pageY
        }
      } else {
        const { pageX, pageY } = e as MouseEvent
        shiftX = pageX
        shiftY = pageY
      }

      if (result) {
        const split = result.split(',')
        if (split.length === 6) {
          moveElTranslateX = parseInt(split[split.length - 2])
          moveElTranslateY = parseInt(split[split.length - 1])
        }
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
      dragEl = document.querySelector(props.dragSelector) as HTMLElement

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

      moveEl && (moveEl.style.transform = 'translate(0, 0)')
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
