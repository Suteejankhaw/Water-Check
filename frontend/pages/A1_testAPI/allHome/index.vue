<template>
  <div>
    <header>HOUSELIST</header>
    <button @click="data()">---------</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        houses: [],
      };
    },
    computed: {
    },
    methods: {
      async data() {
        const lands = await $fetch('http://localhost:5000/lands', {
          method: 'GET',
        })
        this.houses = lands.map(land => ({
          id: `บ้านเลขที่ ${land.id}`,
          image: `assets/images/lands/${land.Image_iD}.jpg`,
        }));
      },
    },
  }
</script>