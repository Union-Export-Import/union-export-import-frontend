<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }" class="active-breadcrumb">Home Page</el-breadcrumb-item>
      <el-breadcrumb-item separator-class="el-icon-arrow-right">Customer</el-breadcrumb-item>
      <el-breadcrumb-item>Customer Detail</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- <profile-header v-if="user" :name="user.name" :join_status="join_status" /> -->

    <el-row v-loading="loading">
      <el-col :span="16">
        <profile-detail v-if="customer.customer">
          <div class="profile-detail-info pb-5">
            <label for="Name">Name</label>
            <p class="mt-1 font-weight-900">{{ customer.customer.name }}</p>
          </div>
          <div class="profile-detail-info pb-5">
            <label for="Name">Name</label>
            <p class="mt-1 font-weight-900">{{ customer.customer.company_name }}</p>
          </div>
          <div class="profile-detail-info pb-5">
            <label for="Name">Name</label>
            <p class="mt-1 font-weight-900">{{ customer.customer.address }}</p>
          </div>
          <div class="profile-detail-info pb-5">
            <label for="Name">Name</label>
            <p class="mt-1 font-weight-900">{{ customer.customer.email }}</p>
          </div>
          <div class="profile-detail-info pb-5">
            <label for="Name">Name</label>
            <p class="mt-1 font-weight-900">{{ customer.customer.phone_number }}</p>
          </div>
          <div class="profile-detail-info pb-5">
            <label for="Name">Name</label>
            <p class="mt-1 font-weight-900">{{ customer.customer.bank_acc }}</p>
          </div>
          <div class="profile-detail-info pb-5">
            <label for="Name">Name</label>
            <p class="mt-1 font-weight-900">{{ customer.customer.remark }}</p>
          </div>
        </profile-detail>
        <div class="manage-btns mt-2">
          <el-button plain @click="this.$router.push({ name: 'customer' })">BACK</el-button>
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
    this.getCustomer(this.$route.params.id);
  },
  computed: {
    ...mapState(["customer"]),
  },
  methods: {
    ...mapActions("customer", ["getCustomer"]),
  },
};
</script>

<style lang="scss" scoped></style>
