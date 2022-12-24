<template>
  <div class="main_app">
    <h1> ChatGpt Email Extension (DEMO VERSION)</h1>
    <p>You have to log in, in the ChatGpt website for it to work</p>
    <p>If AI button dosent work reload</p>
  </div>
</template>

<script>
export default {
  name: 'popupView',
  data () {
    return {
      msg: 'popup'
    }
  }
}

</script>

<style>
.main_app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 15px;
  min-width: 60vh;
}
</style>
