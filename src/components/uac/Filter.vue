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
          <el-input v-model="form.created_at"></el-input>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-input v-model="form.updated_at"></el-input>
        </el-col>
      </el-row>
    </el-form-item>
    <div class="clear">
      <p @click="clearForm">Clear</p>
    </div>
    <submit-button @click="filterUser" text="Filter"></submit-button>
  </main-filter>
</template>

<script>
import SubmitButton from "@/components/SubmitButton.vue";
import MainFilter from "../MainFilter";
import {
  paginationParams,
  sortingParams,
  filterParams,
  filter,
} from "../../Helper";
import axios from "@/axios";
export default {
  components: {
    "main-filter": MainFilter,
    "submit-button": SubmitButton,
  },
  data() {
    return {
      labelPosition: "top",
      direction: "rtl",
      form: {
        name: "",
        phone_number: "",
        email: "",
        created_at: "",
        updated_at: "",
      },
    };
  },

  methods: {
    clearForm() {
      console.log("clear");
    },
    getUsers: async function (payload) {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      console.log("usersss");
      await axios
        .post("/api/users/query", payload, { headers })
        .then((response) => {
          console.log(response.data.data);
          this.tableData = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    filterUser() {
      const { name, phone_number, email, created_at, updated_at } = this.form;
      const nameParams = name ? filterParams("LIKE", "name", `%${name}%`) : [];
      const phoneNumberParams = phone_number
        ? filterParams("LIKE", "phone_number", `%${phone_number}%`)
        : [];
      const emailParams = email
        ? filterParams("LIKE", "email", `%${email}%`)
        : [];
      const createAtParams = created_at
        ? filterParams("<", "created_at", `${created_at}`)
        : [];
      const updatedAtParams = updated_at
        ? filterParams(">", "updated_at", `${updated_at}`)
        : [];

      console.log(JSON.stringify(nameParams.data));
      const mappedData = [
        ...nameParams,
        ...phoneNumberParams,
        ...emailParams,
        ...createAtParams,
        ...updatedAtParams,
      ];
      console.log(mappedData);

      this.getUsers({
        ...sortingParams("id", "asc"),
        ...paginationParams(1, 20),
        ...filter(mappedData, "AND"),
      });
    },
  },
};
</script>
