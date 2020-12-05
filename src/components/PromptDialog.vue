<template>
  <el-dialog width="30%">
    <span slot="title"><i class="el-icon-info"></i> Info</span>
    <span>This is a message</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="dialogVisible = false"
        >Confirm</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
export default {};
</script>
