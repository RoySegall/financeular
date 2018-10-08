<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">


body {
  background-color: #ffffff;
  font-size: 16px;
}

#app {
  padding: 0.5em;
  font-family: 'Rubik', sans-serif, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $blue5;
  margin: 1em;
}

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
