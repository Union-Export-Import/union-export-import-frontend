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

    <profile-header v-if="user" :name="user.name" :join_status="join_status" />

    <el-row v-loading="loading">
      <el-col :span="16">
        <profile-detail v-if="user">
          <div class="profile-detail-info pb-5">
            <label for="Name">Name</label>
            <p class="mt-1 font-weight-900">{{ user.name }}</p>
          </div>
          <div class="profile-detail-info pb-5">
            <label for="Company Name">Phone Number</label>
            <p class="mt-1 font-weight-900">
              {{ user.phone_number }}
            </p>
          </div>
          <div class="profile-detail-info pb-5">
            <label for="Email">Email</label>
            <p class="mt-1 font-weight-900">{{ user.email }}</p>
          </div>
          <div class="profile-detail-info pb-5">
            <label for="Email">Account Status</label>
            <p class="mt-1 font-weight-900">{{ user.account_status }}</p>
          </div>
          <div class="profile-detail-info pb-5">
            <label for="NRC">NRC</label>
            <p class="mt-1 font-weight-900">{{ user.nrc }}</p>
          </div>
          <div class="profile-detail-info pb-5">
            <label for="Role">Role</label>
            <p class="mt-1 font-weight-900">
              <template v-for="role in user.roles">
                {{ role.title }}
              </template>
            </p>
          </div>
        </profile-detail>
        <div class="manage-btns mt-2">
          <el-button plain @click="this.$router.push({ name: 'uac' })"
            >BACK</el-button
          >
          <el-button class="edit-button">EDIT</el-button>
        </div>
      </el-col>
      <el-col :span="8">
        <log />
      </el-col>
    </el-row>
    <!-- <el-row>
      <el-col :span="2">
        <div class="demo-basic--circle">
          <div class="block">
            <el-avatar :size="50" :src="circleUrl"></el-avatar>
          </div>
          <div class="block" v-for="size in sizeList" :key="size">
            <el-avatar :size="size" :src="circleUrl"></el-avatar>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <h4 class="primary-text-color">{{ user.name }}</h4>
        <div class="pt-2 secondary-text-color">
          <span>{{ moment(user.created_at).format('LLL') }}</span>
        </div>
      </el-col>
    </el-row>
    <el-row class="pt-3">
      <el-col :span="16" class="content-background-color padding-4">
        <name-card class="pt-3">
          <template v-slot:title>
            <h5 class="blur-text-color">Name</h5>
          </template>
          <h4 class="pt-1 primary-text-color">{{ user.name }}</h4>
        </name-card>
        <name-card class="pt-3">
          <template v-slot:title>
            <h5 class="blur-text-color">Phone Number</h5>
          </template>
          <h4 class="pt-1 primary-text-color">{{ user.phone_number }}</h4>
        </name-card>
        <name-card class="pt-3">
          <template v-slot:title>
            <h5 class="blur-text-color">Email</h5>
          </template>
          <h4 class="pt-1 primary-text-color">{{ user.email }}</h4>
        </name-card>
        <name-card class="pt-3">
          <template v-slot:title>
            <h5 class="blur-text-color">NRC</h5>
          </template>
          <h4 class="pt-1 primary-text-color">{{ user.nrc }}</h4>
        </name-card>
        <name-card class="pt-3">
          <template v-slot:title>
            <h5 class="blur-text-color">Role</h5>
          </template>
          <h4
            v-for="role in user.roles"
            :key="role.id"
            class="pt-1 primary-text-color"
          >{{role.title}}</h4>
        </name-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <delete-button text="Delete" @click="userDelete"></delete-button>
      </el-col>
      <el-col :span="2">
        <submit-button @click="userEdit" text="Edit"></submit-button>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
import axios from "@/axios";
// import NameCard from "@/components/NameCard.vue";
import { tokenHeader, lastItemFromUrl } from "../../Helper";
import moment from "moment";
// import DeleteButton from "@/components/DeleteButton.vue";
// import SubmitButton from "@/components/SubmitButton.vue";
import UserRepository from "../../repository/UserRepository";
import ProfileHeader from "@/components/resuable/ProfileHeader";
import ProfileDetail from "@/components/resuable/ProfileDetail.vue";
import { mapGetters } from "vuex";

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
  beforeMount() {
    this.getUserDetail(this.$route.path);
  },
  computed: {
    ...mapGetters({
      user: "uac/getUser"
    }),
    join_status() {
      return moment(this.user.created_at).format("LLL");
    }
  },
  methods: {
    getUserDetail: async function(path) {
      this.loading = true;
      await axios
        .get(
          `/api/users/${lastItemFromUrl(path)}`,
          tokenHeader(localStorage.getItem("token"))
        )
        .then(res => {
          // console.log(res.data.data);
          this.$store.commit("uac/ADD_USER", res.data.data);
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
        });
    },
    // moment: function () {
    //   return moment();
    // },
    userDelete: async function() {
      await UserRepository.deleteUser(lastItemFromUrl(this.$route.path))
        .then(() => {
          this.$router.replace({
            name: "uac"
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    userEdit: function() {
      this.$router.push({
        name: "UserEdit",
        params: { id: this.user.id }
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
