<template>
  <main-filter header="User Filter">
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
  </main-filter>
</template>

<script>
import MainFilter from "../MainFilter";
export default {
  components: {
    "main-filter": MainFilter,
  },
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

  methods: {
    clearForm() {
      console.log("clear");
    },
  },
};
</script>
