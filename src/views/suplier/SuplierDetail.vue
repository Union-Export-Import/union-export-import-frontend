<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }" class="active-breadcrumb"
      >Home Page</el-breadcrumb-item
    >
    <el-breadcrumb-item :to="{ path: '/supplier' }" class="active-breadcrumb"
      >Suppliers</el-breadcrumb-item
    >
    <el-breadcrumb-item>Detail</el-breadcrumb-item>
  </el-breadcrumb>

  <profile-header :name="name" :join_status="join_status" />

  <el-row>
    <el-col :span="16">
      <profile-detail>
        <div class="profile-detail-info pb-5">
          <label for="Name">Name</label>
          <p class="mt-1 font-weight-900">Lwin Oo</p>
        </div>
        <div class="profile-detail-info pb-5">
          <label for="Company Name">Company Name</label>
          <p class="mt-1 font-weight-900">Lwin Oo company</p>
        </div>
        <div class="profile-detail-info pb-5">
          <label for="Email">Email</label>
          <p class="mt-1 font-weight-900">dev.aungmyooo2015@gmail.com</p>
        </div>
        <div class="profile-detail-info pb-5">
          <label for="Tel/fax Number">Tel/fax Number</label>
          <p class="mt-1 font-weight-900">09 420275823</p>
        </div>
        <div class="profile-detail-info pb-5">
          <label for="Supplier Location">Supplier Location</label>
          <p class="mt-1 font-weight-900">
            No(42), 31 street, pabedan. Yangon.
          </p>
        </div>
      </profile-detail>
      <div class="manage-btns mt-2">
        <el-button plain>BACK</el-button>
        <el-button class="edit-button">EDIT</el-button>
      </div>
    </el-col>
    <el-col :span="8">
      <log />
    </el-col>
  </el-row>
</template>

<script>
import ProfileHeader from "@/components/resuable/ProfileHeader";
import ProfileDetail from "@/components/resuable/ProfileDetail.vue";
import Log from "@/components/resuable/Log.vue";

export default {
  components: {
    "profile-header": ProfileHeader,
    "profile-detail": ProfileDetail,
    log: Log
  },

  data() {
    return {
      name: "lwin Oo",
      join_status: "Joined 2 years ago"
    };
  }
};
</script>
