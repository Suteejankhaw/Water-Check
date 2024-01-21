<template>
  <div id="app">
    <ImageViewer />
  </div>
</template>

<script>
import ImageViewer from './components/Collector.vue';

export default {
  components: {
    ImageViewer,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
<template>
  <div id="app">
    <Houelist id="app1" />
    <Houelist id="app2" />
    <Houelist id="app3" />
  </div>
</template>

<script>
import Houelist from "@/components/Houelist.vue"; // แก้ตามตำแหน่งไฟล์ของคุณ

export default {
  components: {
    Houelist,
  },
};
</script>

<style>
/* สไตล์ที่คุณต้องการสามารถเพิ่มที่นี่ */
</style>
</template>