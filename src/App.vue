<template>
  <DragMove
    move-selector=".container"
    drag-selector=".container .header"
  >
    <div class="container">
      <header class="header"></header>
    </div>
  </DragMove>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DragMove from './components/DragMove.vue'

export default defineComponent({
  name: 'App',
  components: {
    DragMove
  }
})
</script>

<style scoped>
.container {
  width: 300px;
  height: 500px;
  margin: 0 auto;
  border: 1px solid red;
  border-radius: 5px;
}

.header {
  height: 35px;
  border-bottom: 1px solid #ccc;
}
</style>
