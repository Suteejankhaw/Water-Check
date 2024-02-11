<template>
    <div class="printbill">
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
      
      <!-- ช่องป้อนข้อมูลค่าน้ำ -->
      <div class="water-bill">
        <strong style="font-size: 24px;">ค่าน้ำ:</strong><br>
        <input type="number" placeholder="กรอกค่าน้ำ" style="width: 100%;">
        <br>
        <strong style="font-size: 24px;">หน่วยการใช้น้ำ:</strong><br>
        <input type="number" placeholder="กรอกหน่วยการใช้น้ำ" style="width: 100%;">
        <br>
        <button @click="saveBill">บันทึกบิล</button>
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
        status: '' // เพิ่ม property สำหรับเก็บสถานะการชำระเงิน
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
      saveBill() {
        // ส่วนนี้คุณสามารถเพิ่มโค้ดสำหรับการบันทึกบิลได้ตามต้องการ
        console.log('บันทึกบิล');
      }
    },
    mounted() {
      this.checkStatus(); // เรียกฟังก์ชันเมื่อ component ถูก mounted
    }
  };
  </script>
  
  <style scoped>
  .printbill {
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
    margin-bottom: 20px; /* เพิ่มระยะห่างด้านล่าง */
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
  
  .water-bill {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  input[type="number"] {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    margin-bottom: 10px;
  }
  
  button {
    padding: 10px 20px;
    background-color: green;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    max-width: 50%;
  }
  </style>
  