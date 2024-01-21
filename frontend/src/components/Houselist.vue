<template>
    <div>
      <img :src="houseImage" alt="House Image" />
      <button @click="saveBill">บันทึกบิล</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        houseImage: "",
      };
    },
    methods: {
      saveBill() {
    
        console.log("บันทึกบิลแล้ว");
       
      },
    },
    mounted() {
     
      this.fetchHouseImage();
    },
    methods: {
      async fetchHouseImage() {
        try {
          
          const response = await fetch('URL_API_ของคุณ');
          const data = await response.json();
  

          this.houseImage = data.imageUrl;
        } catch (error) {
          console.error("เกิดข้อผิดพลาดในการดึงข้อมูลรูปภาพบ้าน", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  
  </style>
  