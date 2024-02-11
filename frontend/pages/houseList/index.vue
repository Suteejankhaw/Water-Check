<template>
  <div class="container">
    <header>HOUSELIST</header>
    <div class="search-container">
      <input type="text" placeholder="Search..." v-model="searchQuery">
      <button @click="data()">Search</button>
    </div>
    <div class="box-container" v-if="!loading">
      <div class="box-container">
        <div class="box" v-for="house in filteredHouses" :key="house.id">
          <div class="overlay">{{ house.id }}</div>
          <div class="image-container">
            <img :src="house.image" alt="Image">
            <button class="bill-button" @click="">บันทึกบิล</button>
          </div>
        </div>
        <div v-if="filteredHouses.length === 0" class="no-results">ไม่พบข้อมูลบ้านเลขที่</div>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '', // เพิ่มตัวแปร searchQuery ใน data และกำหนดค่าเริ่มต้นเป็นข้อความว่าง
      houses: [],
      loading: true
    }
  },
  computed: {
    filteredHouses() {
      return this.houses.filter(house => house.id.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  },
  methods: {
    async data() {
      const runtimeConfig = useRuntimeConfig()
      let BASE_URL = runtimeConfig.public.BASE_URL
      const lands = await $fetch(BASE_URL + '/lands', {
        method: 'GET',
      });
      this.houses = lands.map(land => ({
        id: `บ้านเลขที่ ${land.id}`,
        image: `frontend/public/houses/house${land.id}.jpg`,
      }));
      this.loading = false;
    },
  },
  mounted() {
    this.data();
  },
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
