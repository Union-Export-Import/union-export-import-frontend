<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }" class="active-breadcrumb">Home Page</el-breadcrumb-item>
      <el-breadcrumb-item separator-class="el-icon-arrow-right">Category</el-breadcrumb-item>
      <el-breadcrumb-item>Category Detail</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- <profile-header v-if="user" :name="user.name" :join_status="join_status" /> -->

    <el-row v-loading="loading">
      <el-col :span="16">
        <profile-detail v-if="category.category">
          <div class="profile-detail-info pb-5">
            <label for="Name">Name</label>
            <p class="mt-1 font-weight-900">{{ category.category.name }}</p>
          </div>
        </profile-detail>
        <div class="manage-btns mt-2">
          <el-button plain @click="this.$router.push({ name: 'category' })">BACK</el-button>
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
import { mapState, mapActions } from "vuex";
import ProfileDetailVue from "../../components/resuable/ProfileDetail.vue";

export default {
  props: ["id"],
  components: {
    // "name-card": NameCard,
    // "delete-button": DeleteButton,
    // "submit-button": SubmitButton,
    // "profile-header": ProfileHeader,
    "profile-detail": ProfileDetailVue,
  },
  data() {
    return {
      loading: false,
    };
  },
  beforeMount() {
    this.getCategory(this.$route.params.id);
  },
  computed: {
    ...mapState(["category"]),
  },
  methods: {
    ...mapActions("category", ["getCategory"]),
  },
};
</script>

<style lang="scss" scoped></style>
