<template>
  <DragMove
    move-selector=".drag-container .ant-modal"
    :active="visible"
  >
    <div>
      <a-button type="primary" @click="toggleModal">Open Modal</a-button>
      <!-- eslint-disable -->
      <a-modal
        title="V Drag Move"
        v-model:visible="visible"
        wrapClassName="drag-container"
        @ok="toggleModal"
      >
        <p>让模态框跳起来</p>
        <a-input></a-input>
      </a-modal>
    </div>
  </DragMove>
</template>

<script type="setup">
import { ref } from "vue";
import DragMove from "./components/DragMove.vue";

export default {
  name: "App",

  components: {
    DragMove,
  },

  setup() {
    const visible = ref(false);

    function toggleModal() {
      visible.value = !visible.value
    }

    return {
      visible,
      toggleModal,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
