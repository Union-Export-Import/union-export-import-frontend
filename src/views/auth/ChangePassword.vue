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
          {{ user }}
          <h3>Change Password</h3>
          <br />
          <el-alert
            :closable="false"
            title="Password Requirement"
            type="info"
            description="Passwords can’t contain the user name or parts of the user’s full name, such as their first name.  Passwords must use at least three of the four available character types: lowercase letters, uppercase letters, numbers, and symbols."
            show-icon
          >
          </el-alert>
          <br />
          <div class="form-input">
            <input v-model="new_password" type="password" placeholder="New password" />
          </div>
          <div class="form-input">
            <input type="password" placeholder="Confirm new password" />
          </div>
          <button class="login-button">SUBMIT</button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { mapGetters } from "vuex";
// import axios from "@/axios";
export default {
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user'
    })
  },
  data() {
    return {};
  },
};
</script>
