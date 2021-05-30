<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }" class="active-breadcrumb"
        >Home Page</el-breadcrumb-item
      >
      <el-breadcrumb-item separator-class="el-icon-arrow-right"
        >Supplier</el-breadcrumb-item
      >
      <el-breadcrumb-item>Supplier Detail</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- <profile-header v-if="user" :name="user.name" :join_status="join_status" /> -->

    <el-row v-loading="loading">
      <el-col :span="16">
        <profile-detail v-if="supplier.supplier">
          <div class="profile-detail-info pb-5">
            <label for="Name">Name</label>
            <p class="mt-1 font-weight-900">{{ supplier.supplier.name }}</p>
          </div>
          <div class="profile-detail-info pb-5">
            <label for="Name">Name</label>
            <p class="mt-1 font-weight-900">{{ supplier.supplier.company_name }}</p>
          </div>
          <div class="profile-detail-info pb-5">
            <label for="Name">Name</label>
            <p class="mt-1 font-weight-900">{{ supplier.supplier.address }}</p>
          </div>
          <div class="profile-detail-info pb-5">
            <label for="Name">Name</label>
            <p class="mt-1 font-weight-900">{{ supplier.supplier.email }}</p>
          </div>
          <div class="profile-detail-info pb-5">
            <label for="Name">Name</label>
            <p class="mt-1 font-weight-900">{{ supplier.supplier.phone_number }}</p>
          </div>
          <div class="profile-detail-info pb-5">
            <label for="Name">Name</label>
            <p class="mt-1 font-weight-900">{{ supplier.supplier.bank_acc }}</p>
          </div>
          <div class="profile-detail-info pb-5">
            <label for="Name">Name</label>
            <p class="mt-1 font-weight-900">{{ supplier.supplier.remark }}</p>
          </div>
          <div class="profile-detail-info pb-5">
            <label for="Name">Name</label>
            <p class="mt-1 font-weight-900">{{ supplier.supplier.supplied_product }}</p>
          </div>
        </profile-detail>
        <div class="manage-btns mt-2">
          <el-button plain @click="this.$router.push({ name: 'Supplier' })"
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
import { mapState, mapActions } from "vuex";

export default {
  props: ["id"],
  components: {
    // "name-card": NameCard,
    // "delete-button": DeleteButton,
    // "submit-button": SubmitButton,
    // "profile-header": ProfileHeader,
  },
  data() {
    return {
      loading: false
    };
  },
  beforeMount() {
    this.getSupplier(this.$route.params.id);
  },
  computed: {
    ...mapState(["supplier"])
  },
  methods: {
    ...mapActions("supplier", ["getSupplier"])
  }
};
</script>

<style lang="scss" scoped></style>
