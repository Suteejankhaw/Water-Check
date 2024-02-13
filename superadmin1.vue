<template lang="">
  <div class="page-superadmin"> <div class="superadmin"> <img alt="Image"
  class="circle-image" src=" " /> <div class="user-info"> <p>ID:{{ userId }}</p>
  <p>Name:{{ username }}</p> <p>Phonenumber:{{ phonenumber }}</p> <p>Role:{{ role }}</p>
  </div> <div class="box-superadmin"> <p class="box1-button"
  @click="goToAllHome()">รายการการบิลจ่ายค่าน้ำ</p> <p class="box1-button"
  @click="goToAllSuper()">เจ้าหน้าที่</p> <p class="box2-button"
  @click="goToAllBill()">บิลทั้งหมด</p> <p class="box2-button"
  @click="goToAllBill()">บันทึกบิล</p> </div> </div> </div>
</template>
<script>
export default {
  methods: {
    // ฟังก์ชันเพื่อเปลี่ยนหน้าไปยังหน้าที่ต้องการ
    goToAllHome() {
      this.$router.push("/all-home"); // กำหนดเส้นทาง URL ของหน้ารายการการบิลจ่ายค่าน้ำ
    },
    goToAllSuper() {
      this.$router.push("/superofficer"); // กำหนดเส้นทาง URL ของหน้าเจ้าหน้าที่
    },
    goToAllBill() {
      this.$router.push("/all-bill"); // กำหนดเส้นทาง URL ของหน้าบิลทั้งหมด
    },
    goToRecordBill() {
      this.$router.push("/record-bill"); // กำหนดเส้นทาง URL ของหน้าบันทึกบิล
    },
  },
};
</script>
<style scoped>
.superadmin {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.superadmin {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.circle-image {
  width: 200px;
  height: 400px;
  border-radius: 50%;
}

.user-info {
  text-align: center;
  margin-top: 20px;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 10px; /* เพิ่มขอบมนุษย์ให้กับ container */
  background-color: #f0f0f0; /* เพิ่มสีพื้นหลัง */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* เพิ่มเงาเริ่มต้น */
}

.box-superadmin {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.box1-button,
.box2-button {
  flex-basis: 50%;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  margin-top: 10px;
  flex-grow: 1;
}

.box1-button,
.box2-button {
  margin-top: 10px;
  margin-bottom: 10px;
  text-decoration: none;
  background-color: #294178;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px; /* กำหนดความกว้าง */
  height: 200px; /* กำหนดความสูง */
  box-shadow: #ccc;
}
</style>
