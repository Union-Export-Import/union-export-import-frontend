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
    <el-row>
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
        <h4 class="primary-text-color">Kyaw Soe Aung</h4>
        <div class="pt-2 secondary-text-color">
          <span>Joined 2 year ago</span>
        </div>
      </el-col>
    </el-row>
    <el-row class="pt-3">
      <el-col :span="16" class="content-background-color padding-4">
        <name-card class="pt-3">
          <template v-slot:title
            ><h5 class="blur-text-color">Name</h5></template
          >
          <h4 class="pt-1 primary-text-color">Kyaw Soe Aung</h4>
        </name-card>
        <name-card class="pt-3">
          <template v-slot:title
            ><h5 class="blur-text-color">Phone Number</h5></template
          >
          <h4 class="pt-1 primary-text-color">09977777766</h4>
        </name-card>
        <name-card class="pt-3">
          <template v-slot:title
            ><h5 class="blur-text-color">Email</h5></template
          >
          <h4 class="pt-1 primary-text-color">admin@admim.com</h4>
        </name-card>
        <name-card class="pt-3">
          <template v-slot:title
            ><h5 class="blur-text-color">Address</h5></template
          >
          <h4 class="pt-1 primary-text-color">
            No(42), 31 street, pabedan. Yangon.
          </h4>
        </name-card>
        <name-card class="pt-3">
          <template v-slot:title
            ><h5 class="blur-text-color">Role</h5></template
          >
          <h4 class="pt-1 primary-text-color">
            Admin
          </h4>
        </name-card>
        <name-card class="pt-3">
          <template v-slot:title
            ><h5 class="blur-text-color">Permission</h5></template
          >
          <h4 class="pt-1 primary-text-color">
            - create_user - update_user
          </h4>
        </name-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import NameCard from "@/components/NameCard.vue";
export default {
  components: {
    "name-card": NameCard
  },
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    };
  }
};
</script>

<style lang="scss" scoped></style>
