<template>
  <main-filter header="User Filter">
    <el-form-item label="Name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="Phone Number">
      <el-input v-model="form.phone_number"></el-input>
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item label="Creation Date">
      <el-row>
        <el-col :span="11">
          <el-date-picker
            style="width:100%"
            v-model="form.start_created_at"
            type="date"
            placeholder="Pick a Date"
            format="YYYY/MM/DD"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker
            style="width:100%"
            v-model="form.end_created_at"
            type="date"
            label-width="33%"
            placeholder="Pick a Date"
            format="YYYY/MM/DD"
          ></el-date-picker>
        </el-col>
      </el-row>
    </el-form-item>
    <!-- <el-form-item>
    <submit-button @click="filterUser" text="Filter"></submit-button>
    <div class="clear">
      <p @click="clearForm">Clear</p>
    </div>
    </el-form-item>-->
    <div class="clear">
      <p @click="clearForm">Clear</p>
    </div>
    <el-button @click="filterUser" class="submit_button" v-loading="loading"
      >Filter</el-button
    >
  </main-filter>
</template>

<script>
// import SubmitButton from "@/components/SubmitButton.vue";
import MainFilter from "../MainFilter";
import {
  paginationParams,
  sortingParams,
  filterParams,
  filter
} from "../../Helper";
// import axios from "@/axios";
import UserRepository from "../../repository/UserRepository";
export default {
  components: {
    "main-filter": MainFilter
    // "submit-button": SubmitButton
  },
  data() {
    return {
      labelPosition: "top",
      direction: "rtl",
      form: {
        name: "",
        phone_number: "",
        email: "",
        start_created_at: "",
        end_created_at: "",
        created_at: "",
        updated_at: ""
      },
      loading: false
    };
  },
  methods: {
    clearForm() {
      console.log("clear");
    },
    formatDate(newDate) {
      let date = new Date(newDate);
      return (
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
      );
    },
    getUsers: async function(payload) {
      await UserRepository.filterUsers(payload)
        .then(response => {
          // this.tableData = response.data.data;
          this.$store.commit("uac/ADD_UAC_DATA", response.data);
          this.$store.commit("handleFilterBox");
          this.loading = false;
        })
        .catch(e => {
          console.log(e);
        });
    },
    filterUser() {
      this.loading = true;
      const {
        name,
        phone_number,
        email,
        start_created_at,
        end_created_at
      } = this.form;
      const nameParams = name
        ? filterParams("LIKE", "name", `%${name}%`)
        : null;
      const phoneNumberParams = phone_number
        ? filterParams("LIKE", "phone_number", `%${phone_number}%`)
        : null;
      const emailParams = email
        ? filterParams("LIKE", "email", `%${email}%`)
        : null;
      const createAtParams = start_created_at
        ? filterParams(
            ">",
            "created_at",
            `${this.formatDate(start_created_at)}`
          )
        : null;
      const updatedAtParams = end_created_at
        ? filterParams("<", "created_at", `${this.formatDate(end_created_at)}`)
        : null;

      const mappedData = [
        { ...nameParams },
        { ...phoneNumberParams },
        { ...emailParams },
        { ...createAtParams },
        { ...updatedAtParams }
      ];
      let filterMap = [];
      mappedData.forEach(function(element) {
        if (Object.keys(element).length != 0) {
          filterMap.push(element);
        }
      });
      // console.log(mappedData);

      this.getUsers({
        ...sortingParams("id", "asc"),
        ...paginationParams(1, 10),
        ...filter(filterMap, "AND")
      });
    }
  }
};
</script>
