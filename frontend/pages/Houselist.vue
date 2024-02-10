<template>
  <div class="container">
    <header>HOUSELIST</header>
    <div class="search-container">
      <input type="text" placeholder="Search..." v-model="searchQuery">
      <button @click="search">Search</button>
    </div>
    <div class="box-container">
      <div class="box" v-for="house in filteredHouses" :key="house.id">
        <div class="overlay">{{ house.address }}</div>
        <div class="image-container">
          <img :src="house.image" alt="Image">
          <button class="bill-button" @click="redirectToOtherPage">บันทึกบิล</button>
        </div>
      </div>
      <div v-if="filteredHouses.length === 0" class="no-results">ไม่พบข้อมูลบ้านเลขที่</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '', // เพิ่มตัวแปร searchQuery ใน data และกำหนดค่าเริ่มต้นเป็นข้อความว่าง
      houses: [
        { id: 1, address: 'บ้านเลขที่ 123', image: 'assets/images/1.jpg' },
        { id: 2, address: 'บ้านเลขที่ 124', image: 'assets/images/2.jpg' },
        { id: 3, address: 'บ้านเลขที่ 125', image: 'assets/images/3.jpg' },
      ]
    }
  },
  computed: {
    filteredHouses() {
      // กรองข้อมูลบ้านตามคำค้นหาที่ผู้ใช้ป้อนเข้ามา
      return this.houses.filter(house => house.address.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  },
  methods: {
    redirectToOtherPage() {
      // เพิ่มโค้ดที่ใช้ในการเปลี่ยนเส้นทางไปยังหน้าอื่นที่คุณต้องการ
      console.log('Redirecting to other page...');
    },
    search() {
      // สำหรับการค้นหาเมื่อผู้ใช้คลิกปุ่ม Search
      // คุณสามารถเพิ่มโค้ดเพื่อประมวลผลค้นหาเพิ่มเติมที่นี่
      console.log('Searching...');
    }
  }
}
</script>

<style scoped>
.container {
  display: grid;
  place-items: center;
  height: 100vh;
  padding: 20px;
}

.search-container {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.search-container input[type=text] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
}

.search-container button {
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #17f034;
  cursor: pointer;
}

.box-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  grid-auto-flow: row;
}

.box {
  border: 1px solid #ccc;
  position: relative;
  overflow: hidden;
}

.image-container {
  position: relative;
}

.bill-button {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  background-color: #17f034;
  color: #fff;
  cursor: pointer;
}

.bill-button:hover {
  background-color: #0d7f26;
}

header {
  color: #a423ee;
  font-size: 30px;
  text-decoration: underline;
}

.no-results {
  text-align: center;
  color: red;
}
</style>
