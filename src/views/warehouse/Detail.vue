<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }" class="active-breadcrumb"
        >Home Page</el-breadcrumb-item
      >
      <el-breadcrumb-item separator-class="el-icon-arrow-right"
        >Warehouse</el-breadcrumb-item
      >
      <el-breadcrumb-item>Asset Detail</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- <profile-header v-if="user" :name="user.name" :join_status="join_status" /> -->

    <el-row v-loading="loading">
      <el-col :span="16">
        <profile-detail v-if="warehouse.asset">
          <div class="profile-detail-info pb-5">
            <label for="Name">Name</label>
            <p class="mt-1 font-weight-900">{{ warehouse.asset.asset_name }}</p>
          </div>
          <div class="profile-detail-info pb-5">
            <label for="Name">Asset Type</label>
            <p class="mt-1 font-weight-900">{{ warehouse.asset.asset_type }}</p>
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
  </div>
</template>

<script>
import ProfileDetail from "@/components/resuable/ProfileDetail.vue";
import { mapState, mapActions } from "vuex";

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
    this.getAsset(this.$route.params.id);
  },
  computed: {
    ...mapState(["warehouse"])
  },
  methods: {
    ...mapActions("warehouse", ["getAsset"])
  }
};
</script>

<style lang="scss" scoped></style>
