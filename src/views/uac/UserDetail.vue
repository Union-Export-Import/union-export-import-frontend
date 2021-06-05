<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }" class="active-breadcrumb"
        >Home Page</el-breadcrumb-item
      >
      <el-breadcrumb-item separator-class="el-icon-arrow-right"
        >User Access Control</el-breadcrumb-item
      >
      <el-breadcrumb-item>User Detail</el-breadcrumb-item>
    </el-breadcrumb>

    <profile-header
      v-if="user"
      :name="user.user.name"
      :join_status="join_status"
    />

    <el-row v-loading="loading">
      <el-col :span="16">
        <profile-detail v-if="user.user">
          <div class="profile-detail-info pb-5">
            <label for="Name">Name</label>
            <p class="mt-1 font-weight-900">{{ user.user.name }}</p>
          </div>
          <div class="profile-detail-info pb-5">
            <label for="Company Name">Phone Number</label>
            <p class="mt-1 font-weight-900">{{ user.user.phone_number }}</p>
          </div>
          <div class="profile-detail-info pb-5">
            <label for="Email">Email</label>
            <p class="mt-1 font-weight-900">{{ user.user.email }}</p>
          </div>
          <div class="profile-detail-info pb-5">
            <label for="Email">Account Status</label>
            <p class="mt-1 font-weight-900">{{ user.user.account_status }}</p>
          </div>
          <div class="profile-detail-info pb-5">
            <label for="NRC">NRC</label>
            <p class="mt-1 font-weight-900">{{ user.user.nrc }}</p>
          </div>
          <div class="profile-detail-info pb-5">
            <label for="Role">Role</label>
            <p class="mt-1 font-weight-900">
              <el-tag
                style="margin-right: 2px"
                v-for="role in user.roles"
                :key="role.id"
                type="info"
                effect="dark"
                >{{ role.title }}</el-tag
              >
            </p>
          </div>
        </profile-detail>
        <div class="manage-btns mt-2">
          <el-button plain @click="this.$router.push({ name: 'uac' })"
            >BACK</el-button
          >
          <el-button @click="this.userEdit()" class="edit-button"
            >EDIT</el-button
          >
        </div>
      </el-col>
      <el-col :span="8">
        <log />
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import axios from "@/axios";
// import NameCard from "@/components/NameCard.vue";
// import { tokenHeader, lastItemFromUrl } from "../../Helper";
import moment from "moment";
// import DeleteButton from "@/components/DeleteButton.vue";
// import SubmitButton from "@/components/SubmitButton.vue";
// import UserRepository from "../../repository/UserRepository";
import ProfileHeader from "@/components/resuable/ProfileHeader";
import ProfileDetail from "@/components/resuable/ProfileDetail.vue";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    // "name-card": NameCard,
    // "delete-button": DeleteButton,
    // "submit-button": SubmitButton,
    "profile-header": ProfileHeader,
    "profile-detail": ProfileDetail
  },
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      loading: false
    };
  },
  created() {
    this.getUser(this.$route.params.id);
  },
  computed: {
    ...mapState(["user"]),

    join_status() {
      if (this.user.user) {
        return moment(this.user.user.created_at).format("LLL");
      }
      return null;
    }
  },
  methods: {
    ...mapActions("user", ["getUser"])
  }
};
</script>

<style lang="scss" scoped></style>
