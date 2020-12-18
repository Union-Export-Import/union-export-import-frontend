<template>
  <el-table
    :data="tableData"
    :default-sort="{ prop: 'name', order: 'descending' }"
    stripe
    @click="CustomerEdit"
    style="width: 100%"
  >
    <el-table-column prop="name" label="Name" sortable width="180">
    </el-table-column>
    <el-table-column prop="company_name" label="Company Name" width="180">
    </el-table-column>
    <el-table-column prop="email" label="Email"> </el-table-column>
    <el-table-column prop="fax_number" label="Tel/Fax Number">
    </el-table-column>
    <el-table-column prop="destination" label="Destination"> </el-table-column>
  </el-table>
</template>

<script>
import router from "../../router";
export default {
  data() {
    return {
      tableData: [
        {
          name: "Tom",
          company_name: "Ethiopia",
          email: "kyawsoeye@gmail.com",
          fax_number: "11-21-2019",
          destination: "124341",
        },
        {
          name: "Tomadf",
          company_name: "Ethioapia",
          email: "kyawsoeye12@gmail.com",
          fax_number: "11-21-2019",
          destination: "124341",
        },
        {
          name: "Tomsds",
          company_name: "Ethiopia",
          email: "kyawsoeye123@gmail.com",
          fax_number: "11-21-2019",
          destination: "124341",
        },
        {
          name: "Ads",
          company_name: "Ethiopia",
          email: "kyawsoeye1@gmail.com",
          fax_number: "11-21-2019",
          destination: "124341",
        },
      ],
    };
  },
  methods: {
    CustomerEdit() {
      router.push({ path: "/customer/edit" });
    },
  },
};
</script>
