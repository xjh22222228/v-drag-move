<p align="center">
  <b>v-drag-move</b>
  <p align="center">让容器跳起来</p>
  <p align="center">
    <img src="https://img.shields.io/github/package-json/v/xjh22222228/v-drag-move" />
    <img src="https://img.shields.io/github/license/xjh22222228/v-drag-move" />
    <img src="https://img.shields.io/static/v1.svg?label=&message=Vue&style=flat-square&color=3fb984" />
  </p>
</p>


## 安装
确保 Vue 版本 >= 3.x

```
npm i v-drag-move -S
```


## Demo
```vue
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
import DragMove from 'v-drag-move'

export default defineComponent({
  name: 'App',
  components: {
    DragMove
  }
})
</script>

<style>
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
```



## Attributes
| 参数           | 描述              |类型           | 默认值              |
| ------------- |------------------- |-------------- |------ |
| move-selector | 容器选择器, 整个容器能被移动 |  string  | -- |
| drag-selector | 拖动选择器, 拖动部位 |string| -- |







## LICENSE
[LICENSE](./LICENSE)