<template>
    <div>
      <div class="box-container">
        <div v-for="(house, index) in houses" :key="index" class="box">
          <img :src="house.image" alt="House Image">
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        houses: []
      };
    },
    mounted() {
      this.fetchHouseData(); // เรียกใช้งานฟังก์ชันเพื่อดึงข้อมูลบ้าน
    },
    methods: {
      fetchHouseData() {
        fetch("https://api.example.com/houses")
          .then(response => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then(data => {
            this.houses = data; // เก็บข้อมูลบ้านไว้ในตัวแปร houses
          })
          .catch(error => {
            console.error("There was a problem fetching house data:", error);
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .box-container {
    display: flex;
    flex-wrap: wrap;
  }
  
  .box {
    width: 200px;
    height: 200px;
    margin: 10px;
    border: 1px solid #ccc;
  }
  
  .box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  </style>
  