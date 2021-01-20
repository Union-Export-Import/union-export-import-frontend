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
      <h1 class="form-header">{{ header }}</h1>
      <slot></slot>
    </el-form>
  </el-drawer>
</template>

<script>
export default {
  props: {
    header: {
      default: "Header",
      type: String,
    },
  },
  data() {
    return {
      labelPosition: "top",
      direction: "rtl",
    };
  },
  computed: {
    checkOpen() {
      return this.$store.getters.filterOpen;
    },
  },
  methods: {
    filterBoxClose() {
      this.$store.commit("handleFilterBox");
    },
  },
};
</script>
