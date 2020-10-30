<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/Course">Course</router-link> |
    <router-link to="/DXX">DXX</router-link> |
    <router-link to="/Gate">Gate</router-link> |
    <router-link to="/Rocket">Rocket</router-link>
  </div>
  <router-view/>
</template>

<script>
  export default {
    name: 'Navbar'
  }
</script>

<style lang="scss">
  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
