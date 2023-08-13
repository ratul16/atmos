<template>
  <div id="app">
    <header>
      <div class="weather-bar">
        <!-- <nav>
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link>
        </nav> -->
        <div class="temp-btn active">&#176;C</div>
        <div class="temp-btn">&#176;F</div>
        <div class="avatar">
          <img
            src="https://images.unsplash.com/photo-1656969630442-9db4f3dcb134?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt=""
          />
        </div>
      </div>
    </header>

    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}
</style>



