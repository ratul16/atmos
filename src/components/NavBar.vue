<template>
  <nav class="navbar navbar-light bg-light fixed-top shadow-sm">
    <div class="container">
      <a class="navbar-brand" href="/">
        <!-- <i class="fa-solid fa-cube fa-xl"></i> -->
        <img src="@/assets/logo.png" alt="" />
      </a>
      <ul class="nav-links ms-auto text-capitalize">
        <!-- <li class="nav-item">
          <router-link :to="{ name: 'home' }" class="nav-link">
            Dashboard
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'about' }" class="nav-link">
            About
          </router-link>
        </li> -->
        <li class="nav-item">
          <div
            class="temp-btn"
            :class="this.store.units === 'metric' ? 'active' : ''"
          >
            &#176;C
          </div>
        </li>
        <li class="nav-item">
          <div
            class="temp-btn"
            :class="this.store.units === 'imperial' ? 'active' : ''"
          >
            &#176;F
          </div>
        </li>
        <li class="nav-item">
          <div class="avatar">
            <img
              src="https://images.unsplash.com/photo-1656969630442-9db4f3dcb134?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              alt=""
            />
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { useWeatherStore } from "../stores/weather";

export default {
  name: "NavBar",
  setup() {
    const store = useWeatherStore();
    return {
      store,
    };
  },
};
</script>

<style lang="scss" scoped>
nav a.router-link-exact-active {
  color: $secondary;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}
.navbar {
  background-color: $white;
  .navbar-brand img {
    width: 40px;
    // filter: drop-shadow(0 0.5rem 1rem rgba(0, 0, 0, 0.15));
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 20px;
    list-style: none;
    margin-bottom: 0;
  }

  .temp-btn {
    width: 35px;
    height: 35px;
    border: 1px solid #474751;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: $bg-variant;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: $secondary;
    }

    &.active {
      border: 1px solid $secondary;
      background-color: lighten($primary, 15);
    }
  }

  .avatar {
    width: 35px;
    height: 35px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
      object-fit: cover;
      object-position: top;
    }
  }
  .navbar-nav {
    gap: 10px;
    align-items: center;
  }
}
</style>