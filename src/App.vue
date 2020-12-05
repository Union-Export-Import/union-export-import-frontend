<template>
  <Layout v-if="!checkRoute" />
  <router-view v-if="checkRoute" />
</template>

<script>
import Layout from "./layout/Layout";

export default {
  components: { Layout },

  computed: {
    checkRoute() {
      if (this.$route.name == "Login" || this.$route.name == "ChangePassword") {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="scss">
@import "./sass/app";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
