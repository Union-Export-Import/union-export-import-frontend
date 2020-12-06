<template>
  <div class="login">
    <el-row>
      <el-col :span="12">
        <div class="login-bg">
          <div class="overlay">
            <h3>UNION EXPORT IMPORT</h3>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="login-form">
          <h3>Login</h3>
          <p class="login-contact">
            Don’t have an account? Please contact your <strong>Admin</strong>
          </p>
          <div class="form-input">
            <input placeholder="Please enter your email here" />
          </div>
          <div class="form-input">
            <input
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
              <input placeholder="Please enter your email here" />
            </div>
            <template #footer>
              <span class="dialog-footer">
                <el-button class="reset-cancel-button" @click="dialogVisible = false">Cancel</el-button>
                <el-button class="reset-password-button" type="primary" @click="dialogVisible = false"
                  >Submit</el-button
                >
              </span>
            </template>
          </el-dialog>
          <button class="login-button">LOGIN</button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
  },
};
</script>
