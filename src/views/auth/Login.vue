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
            Don’t have an account? Please contact your
            <strong>Admin</strong>
          </p>
          <div class="form-input">
            <input
              v-model="email"
              type="email"
              placeholder="Please enter your email here"
            />
          </div>
          <div class="form-input">
            <input
              v-model="password"
              type="password"
              placeholder="Please enter your password here"
            />
          </div>
          <p class="forget-password" @click="dialogVisible = true">
            Forget Password?
          </p>
          <el-dialog
            title="Reset Password"
            v-model="dialogVisible"
            width="50%"
            :before-close="handleClose"
          >
            <div class="form-input">
              <input
                v-model="reset_email"
                placeholder="Please enter your email here"
              />
            </div>
            <template #footer>
              <span class="dialog-footer">
                <el-button
                  class="reset-cancel-button"
                  @click="dialogVisible = false"
                  >Cancel</el-button
                >
                <el-button
                  class="reset-password-button"
                  type="primary"
                  v-on:click="resetPassword"
                  >Submit</el-button
                >
              </span>
            </template>
          </el-dialog>
          <button v-on:click="doLogin" class="login-button" v-loading="loading">
            LOGIN
          </button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import axios from "@/axios";

export default {
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user"
    })
  },
  data() {
    return {
      email: null,
      password: null,
      dialogVisible: false,
      reset_email: null,
      loading: false
    };
  },
  methods: {
    ...mapActions({
      login: "auth/login"
    }),
    open2(message, type) {
      this.$message({
        showClose: true,
        message: message,
        type: type
      });
    },
    // successMessage(title, message) {
    //   this.$notify({
    //     title: title,
    //     message: message,
    //     type: "success"
    //   });
    // },
    // errorMessage() {
    //   this.$notify.error({
    //     title: "Error",
    //     message: "Something went wrong"
    //   });
    // },

    doLogin() {
      this.loading = true;
      let credentials = {
        email: this.email,
        password: this.password
      };

      this.login(credentials)
        .then(() => {
          this.loading = false;
          this.open2("success", "success");
          this.$router.push({
            name: "home"
          });
        })
        .catch(e => {
          this.loading = false;
          this.open2(e.message, "error");
        });
    },
    resetPassword() {
      let request = {
        email: this.reset_email
      };
      this.dialogVisible = false;
      axios.post("/api/forget-password", request).then(response => {
        console.log(response.data);
        // return dispatch("attempt", response.data.data.token);
        if (response.data.message == "success") {
          this.successMessage("Successful", "Your password has been reset.");
        } else {
          this.errorMessage();
        }
      });
    },
    handleClose() {
      this.dialogVisible = false;
    }
  }
};
</script>
