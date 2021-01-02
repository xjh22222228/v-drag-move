<template>
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

    let x = 0
    let y = 0
    let moveEltranslateX = 0
    let moveEltranslateY = 0

    function mouseMove(e: MouseEvent|TouchEvent) {
      e.stopPropagation()
      e.preventDefault()

      let xx = 0
      let yy = 0

      if (e.type === 'touchmove') {
        const { touches } = e as TouchEvent
        if (touches.length > 0) {
          xx = touches[0].pageX - x
          yy = touches[0].pageY - y
        }
      } else {
        const { pageX, pageY } = e as MouseEvent
        xx = pageX - x
        yy = pageY - y
      }

      moveEl.style.transform = `translate(${xx + moveEltranslateX}px, ${yy + moveEltranslateY}px)`
    }

    function mouseDown(e: MouseEvent|TouchEvent) {
      e.stopPropagation()
      e.preventDefault()

      // matrix(1, 0, 0, 1, 33, 31) || none
      const result = window.getComputedStyle(moveEl).transform
      
      if (e.type === 'touchstart') {
        const { touches } = e as TouchEvent
        if (touches.length > 0) {
          x = touches[0].pageX
          y = touches[0].pageY
        }
      } else {
        const { pageX, pageY } = e as MouseEvent
        x = pageX
        y = pageY
      }

      if (result) {
        const split = result.split(',')
        if (split.length === 6) {
          moveEltranslateX = parseInt(split[split.length - 2])
          moveEltranslateY = parseInt(split[split.length - 1])
        }
      }

      addEvent(window, eventFor.mousemove, mouseMove)
    }

    function mouseUp(e: MouseEvent) {
      e.stopPropagation()
      e.preventDefault()
      removeEvent(window, eventFor.mousemove, mouseMove)
    }

    // 初始化组件设置
    function init() {
      destroy()

      moveEl = document.querySelector(props.moveSelector) as HTMLElement
      dragEl = document.querySelector(props.dragSelector) as HTMLElement

      if (!moveEl || !dragEl) return

      // 设置拖动样式并绑定事件
      dragEl.style.cursor = 'move'
      addEvent(dragEl, eventFor.mousedown, mouseDown)
      addEvent(window, eventFor.mouseup, mouseUp)
    }

    // 销毁事件
    function destroy() {
      x = y = moveEltranslateX = moveEltranslateY = 0
      
      removeEvent(dragEl, eventFor.mousedown, mouseDown)
      removeEvent(dragEl, eventFor.mouseup, mouseUp)

      moveEl && (moveEl.style.transform = 'translate(0, 0)')
    }

    // 侦测激活状态
    watch(() => props.active, prevVal => {
      if (prevVal) {
        setTimeout(init, 100)
      } else {
        destroy()
      }
    })

    onMounted(init)
    // 移除事件
    onUnmounted(destroy)
  }
})
</script>
