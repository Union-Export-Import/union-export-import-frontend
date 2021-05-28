<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }" class="active-breadcrumb">Home Page</el-breadcrumb-item>
      <el-breadcrumb-item separator-class="el-icon-arrow-right">Customer</el-breadcrumb-item>
      <el-breadcrumb-item>Customer Detail</el-breadcrumb-item>
    </el-breadcrumb>

    <profile-header v-if="customer" :name="customer.name" :join_status="join_status" />

    <el-row v-loading="loading">
      <el-col :span="16">
        <profile-detail v-if="customer">
          <div class="profile-detail-info pb-5">
            <label for="Name">Name</label>
            <p class="mt-1 font-weight-900">{{ customer.name }}</p>
          </div>
          <div class="profile-detail-info pb-5">
            <label for="Company Name">Phone Number</label>
            <p class="mt-1 font-weight-900">{{ customer.phone_number }}</p>
          </div>
          <div class="profile-detail-info pb-5">
            <label for="Email">Email</label>
            <p class="mt-1 font-weight-900">{{ customer.email }}</p>
          </div>
          <div class="profile-detail-info pb-5">
            <label for="Email">Address</label>
            <p class="mt-1 font-weight-900">{{ customer.address }}</p>
          </div>
          <div class="profile-detail-info pb-5">
            <label for="NRC">Company Name</label>
            <p class="mt-1 font-weight-900">{{ customer.company_name }}</p>
          </div>
          <div class="profile-detail-info pb-5">
            <label for="NRC">Bank Account</label>
            <p class="mt-1 font-weight-900">{{ customer.bank_acc }}</p>
          </div>
          <div class="profile-detail-info pb-5">
            <label for="NRC">Remark</label>
            <p class="mt-1 font-weight-900">{{ customer.remark }}</p>
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
import axios from "@/axios";
// import NameCard from "@/components/NameCard.vue";
import { tokenHeader, lastItemFromUrl } from "../../Helper";
import moment from "moment";
// import DeleteButton from "@/components/DeleteButton.vue";
// import SubmitButton from "@/components/SubmitButton.vue";
import CustomerRepository from "../../repository/CustomerRepository";
import ProfileHeader from "@/components/resuable/ProfileHeader";
import ProfileDetail from "@/components/resuable/ProfileDetail.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    "profile-header": ProfileHeader,
    "profile-detail": ProfileDetail,
  },
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      loading: false,
    };
  },
  beforeMount() {
    this.getCustomerDetail(this.$route.path);
  },
  computed: {
    ...mapGetters({
      customer: "customer/getCustomer",
    }),
    join_status() {
      return moment(this.customer.created_at).format("LLL");
    },
  },
  methods: {
    getCustomerDetail: async function (path) {
      this.loading = true;
      await axios
        .get(
          `/api/customers/${lastItemFromUrl(path)}`,
          tokenHeader(localStorage.getItem("token"))
        )
        .then((res) => {
          // console.log(res.data.data);
          this.$store.commit("customer/ADD_CUSTOMER", res.data.data);
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    // moment: function () {
    //   return moment();
    // },
    customerDelete: async function () {
      await CustomerRepository.deleteCustomer(lastItemFromUrl(this.$route.path))
        .then(() => {
          this.$router.replace({
            name: "customer",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    customerEdit: function () {
      this.$router.push({
        name: "CustomerEdit",
        params: { id: this.customer.id },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
