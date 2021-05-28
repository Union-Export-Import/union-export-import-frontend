<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }" class="active-breadcrumb"
        >Home Page</el-breadcrumb-item
      >
      <el-breadcrumb-item separator-class="el-icon-arrow-right"
        >Warehouse</el-breadcrumb-item
      >
      <el-breadcrumb-item>Asset Type Detail</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- <profile-header v-if="user" :name="user.name" :join_status="join_status" /> -->

    <el-row v-loading="loading">
      <el-col :span="16">
        <profile-detail v-if="assetType.asset_type">
          <div class="profile-detail-info pb-5">
            <label for="Name">Name</label>
            <p class="mt-1 font-weight-900">
              {{ assetType.asset_type.asset_type }}
            </p>
          </div>
        </profile-detail>
        <div class="manage-btns mt-2">
          <el-button plain @click="this.$router.push({ name: 'warehouse' })"
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
import ProfileDetail from "@/components/resuable/ProfileDetail.vue";
import { mapActions, mapState } from "vuex";

export default {
  props: ["id"],
  components: {
    // "name-card": NameCard,
    // "delete-button": DeleteButton,
    // "submit-button": SubmitButton,
    // "profile-header": ProfileHeader,
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
    this.getAssetType(this.$route.params.id);
  },
  computed: {
    ...mapState(["assetType"])
  },
  methods: {
    ...mapActions("assetType", ["getAssetType"])
  }
};
</script>

<style lang="scss" scoped></style>
