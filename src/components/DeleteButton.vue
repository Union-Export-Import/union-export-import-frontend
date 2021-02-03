<template>
  <div>
    <el-col :span="2">
      <el-button class="delete_button">{{ text }}</el-button>
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

<style lang="scss" scoped>
.delete_button {
  background-color: red;
  color: white;
  margin-left: 22px;
}
</style>
