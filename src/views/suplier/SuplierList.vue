<template>
  <el-table
    :data="tableData"
    :default-sort="{ prop: 'name', order: 'descending' }"
    stripe
    @click="SuplierEdit"
    style="width: 100%"
  >
    <el-table-column prop="name" label="Name" sortable width="180">
    </el-table-column>
    <el-table-column prop="company_name" label="Company Name" width="180">
    </el-table-column>
    <el-table-column prop="email" label="Email"> </el-table-column>
    <el-table-column prop="fax_number" label="Tel/Fax Number">
    </el-table-column>
    <el-table-column prop="suplier_location" label="Suplier Location"> </el-table-column>
      <el-table-column fixed="right" label="Operations" width="120">
      <el-button @click="handleClick" type="text" size="small">Detail</el-button>
      <el-button type="text" size="small">Edit</el-button>
    </el-table-column>
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
          suplier_location: "124341",
        },
        {
          name: "Tomadf",
          company_name: "Ethioapia",
          email: "kyawsoeye12@gmail.com",
          fax_number: "11-21-2019",
          suplier_location: "124341",
        },
        {
          name: "Tomsds",
          company_name: "Ethiopia",
          email: "kyawsoeye123@gmail.com",
          fax_number: "11-21-2019",
          suplier_location: "124341",
        },
        {
          name: "Ads",
          company_name: "Ethiopia",
          email: "kyawsoeye1@gmail.com",
          fax_number: "11-21-2019",
          suplier_location: "124341",
        },
      ],
    };
  },
  methods: {
    SuplierEdit() {
      router.push({ path: "/suplier/edit" });
    },
  },
};
</script>
