<template>
    <div class="checkbill">
      <!-- รูปภาพบ้าน -->
      <div class="image-container">
        <img src="/assets/images/1.jpg" alt="Home">
      </div>
      
      <!-- containers ของกล่องข้อความ -->
      <div class="text-container">
        <div class="detail">
          <strong>บ้านเลขที่:</strong> {{ houseNumber }}
        </div>
        <div class="detail">
          <strong>เจ้าของบ้าน:</strong> {{ owner }}
        </div>
        <div class="detail">
          <strong>หมายเลขมิเตอร์:</strong> {{ meterNumber }}
        </div>
        <div class="status">
          <strong>Status:</strong> 
          <span :class="{ 'red': status === 'ค้างชำระ', 'green': status === 'ชำระเสร็จสิ้น' }">{{ status }}</span>
        </div>
      </div>
      
      <!-- ประวัติการชำระ -->
      <header class="payment-header">
        <strong>ประวัติการชำระ</strong>
      </header>
      <div class="payment-history">
  <div class="payment-item">
    <strong>มกราคม, 2566</strong>
    <button class="check-button" @click="navigateToAnotherPage">Check</button>
  </div>
  <div class="payment-item">
    <strong>กุมภาพันธ์, 2566</strong>
    <button class="check-button" @click="navigateToAnotherPage">Check</button>
  </div>
  <div class="payment-item">
    <strong>มีนาคม, 2566</strong>
    <button class="check-button" @click="navigateToAnotherPage">Check</button>
  </div>
</div> 
</div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        houseNumber: '123/45',
        owner: 'John Doe',
        meterNumber: 'M-123456',
        status: '' //ใส่ status 
      };
    },
    methods: {
      async checkStatus() {
        try {
          const response = await fetch('/api/check-status');
          const data = await response.json();
          this.status = data.status; // อัปเดตค่าของ status จาก API
        } catch (error) {
          console.error('Error fetching status:', error);
        }
      },
      navigateToAnotherPage() {
        this.$router.push('/savebills');
      }
    },
    mounted() {
      this.checkStatus(); // เรียกฟังก์ชันเมื่อ component ถูก mounted
    }
  };
  </script>
  
  <style scoped>
  .checkbill {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .image-container {
    margin-bottom: 20px;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .image-container img {
    max-width: 50%;
    height: auto;
  }
  
  .text-container {
    border: 1px solid #ccc;
    padding: 10px;
    width: 50%;
    background-color: #f9f9f9;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    margin-bottom: 20px; 
  }
  
  .detail {
    margin-bottom: 10px;
    font-size: 16px;
    color: #333;
  }
  
  .status {
    font-size: 16px;
    margin-top: 10px;
  }
  
  .red {
    color: red;
  }
  
  .green {
    color: green;
  }
  
  .payment-header {
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 20px;
    text-align: center;
  }
  
  .check-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 10px; 
}
  
  .check-button:hover {
    background-color: #0056b3;
  }
  .payment-item {
    display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
  </style>
  