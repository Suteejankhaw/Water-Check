<template>
    <div>
      <h1>แสดงรูปภาพจาก API</h1>
      <div v-if="imageData">
        <img :src="imageData.imageUrl" alt="รูปภาพ" />
      </div>
      <div v-else>
        <p>กำลังโหลดรูปภาพ...</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        imageData: null,
      };
    },
    mounted() {
      this.fetchImage();
    },
    methods: {
      async fetchImage() {
        try {
          const response = await this.$axios.get('URL_API_ของคุณ');
          this.imageData = response.data; 
        } catch (error) {
          console.error('Error fetching image data:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
    .image-container {
        margin-top:20px;
        border: 2px solid #3498db; 
        padding: 10px; 
        border-radius: 8px; 
        background: #cef0f1;
    }
  </style>