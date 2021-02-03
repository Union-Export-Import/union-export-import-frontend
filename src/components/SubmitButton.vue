<template>
  <div>
    <el-col :span="2">
      <el-button class="submit_button">{{ text }}</el-button>
    </el-col>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
  },
};
</script>

<style lang="scss" scoped></style>
