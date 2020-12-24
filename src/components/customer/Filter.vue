<template>
  <el-drawer
    :model-value="checkOpen"
    :direction="direction"
    :before-close="filterBoxClose"
  >
    <el-form
      :label-position="labelPosition"
      label-width="100px"
      class="form-filter custom-form-input"
    >
      <h1 class="form-header">Customer Filter</h1>
      <el-form-item label="Name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Phone Number">
        <el-input v-model="form.fax_number"></el-input>
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="Creation Date">
        <el-row>
          <el-col :span="11">
            <el-input v-model="form.startData"></el-input>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-input v-model="form.endDate"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <div class="clear">
        <p @click="clearForm">Clear</p>
      </div>
      <button class="filter-button">Filter</button>
    </el-form>
  </el-drawer>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "top",
      direction: "rtl",
      form: {
        name: "",
        email:"",
        fax_number:"",
        startDate:"",
        endDate:"",
        date1: "",
        date2: "",
      },
    };
  },

  computed: {
    checkOpen() {
      return this.$store.getters.filterCustomerOpen;
    },
  },

  methods: {
    filterBoxClose() {
      this.$store.commit("handleCustomerFilterBox");
    },
    clearForm() {
      console.log("clear");
    },
  },
};
</script>
