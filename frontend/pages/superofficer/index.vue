<template lang="">
  <div> <div class="card" @click="goToProfile('john-doe')"> <img src="" alt="Avatar"
  style="width:100%"> <div class="container"> <h4><b>John Doe</b></h4> <p>Architect &
  Engineer</p> </div> </div> <div class="card" @click="goToProfile('jane-smith')"> <img
  src="" alt="Avatar" style="width:100%"> <div class="container"> <h4><b>Jane
  Smith</b></h4> <p>Software Developer</p> </div> </div> <div class="card"
  style="margin-top: 20px;" @click="goToProfile('michael-johnson')"> <img src=""
  alt="Avatar" style="width:100%"> <div class="container"> <h4><b>Michael Johnson</b></h4>
  <p>Graphic Designer</p> </div> </div> </div>
</template>
<script>
export default {
  methods: {
    goToProfile(username) {
      this.$router.push(`/profile/${username}`);
    },
  },
};
</script>
<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 40%;
  margin-bottom: 20px; /* เพิ่มช่องว่างด้านล่างระหว่าง card */
  cursor: pointer; /* เพิ่ม cursor เป็น pointer เมื่อนำเมาส์ไปวางที่ card */
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.container {
  padding: 2px 16px;
}
</style>
