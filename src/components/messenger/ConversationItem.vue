<template>
  <div class="conversation-item">
    <el-row :data="data">
      <el-col :span="4">
        <el-image
          style="width: 58px; height: 58px"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          :fit="fit"
        ></el-image>
      </el-col>
      <el-col :span="16">
        <div>
          <slot name="child-component" :item="message.username"></slot>
        </div>
        <div>You: Hey nice to see you</div>
      </el-col>
      <el-col :span="4">11:11AM</el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: Object,
    },
  },
};
</script>