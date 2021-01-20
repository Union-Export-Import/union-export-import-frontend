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
      <h1 class="form-header">Suplier Filter</h1>
      <el-form-item label="Name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Phone Number">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Creation Date">
        <el-row>
          <el-col :span="11">
            <el-input v-model="form.name"></el-input>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-input v-model="form.name"></el-input>
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
        date1: "",
        date2: "",
      },
    };
  },

  computed: {
    checkOpen() {
      return this.$store.getters.filterSuplierOpen;
    },
  },

  methods: {
    filterBoxClose() {
      this.$store.commit("handleSuplierFilterBox");
    },
    clearForm() {
      console.log("clear");
    },
  },
};
</script>
