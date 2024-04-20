<template>
    <div class="navbar">
      <div class="button-background">
      <button @click="goToHome">Strona Główna</button>
    </div>
    </div>
  </template>

<script>
export default {
  methods: {
    goToHome () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

  <style scoped>
  .navbar {
    position: absolute;
    top: 30px;
    left: 30px;
  }

  .navbar button {
    border-radius: 15px;
    padding: 10px 15px;
    border: none;
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
    border: 2px solid #0e4928;
  }
  .button-background {
  /* Stylizacja tła każdego przycisku */
  padding: 5px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  border: 0.1px solid #cddbd2;
}
  </style>
