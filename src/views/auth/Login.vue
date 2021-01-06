<template>
  <div class="login">
    <el-row>
      <el-col :span="10">
        <div class="login-bg">
          <div class="overlay">
            <h3>UNION EXPORT IMPORT</h3>
          </div>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="login-form">
          <h3>Login</h3>
          <p class="login-contact">
            Don’t have an account? Please contact your <strong>Admin</strong>
          </p>
          <div class="form-input">
            <input v-model="email" type="email" placeholder="Please enter your email here" />
          </div>
          <div class="form-input">
            <input
              v-model="password"
              type="password"
              placeholder="Please enter your password here"
            />
          </div>
          <p class="forget-password">Forget Password?</p>
          <button v-on:click="doLogin" class="login-button">LOGIN</button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return { email: null, password: null };
  },
  methods: {
    ...mapActions({
      login: "auth/login",
    }),

    doLogin() {
      let credentials = {
        email: this.email,
        password: this.password,
      };

      this.login(credentials)
        .then(() => {
          console.log("_____-----_______")
          this.$router.replace({
            name: "home",
          });
        })
        .catch(() => {
          console.log("Failed");
        });
    },
  },
};
</script>
