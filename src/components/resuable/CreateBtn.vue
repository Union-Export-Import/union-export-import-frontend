<template>
  <el-button class="create-user-btn" type="primary">
    <router-link :to="{ name: routeName }">{{ name }}</router-link>
  </el-button>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    routeName: {
      type: String,
      required: true,
    },
  },
};
</script>
