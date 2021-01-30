<template>
  <div class="profile-header display-flex mt-5 mb-5">
    <div class="name-icon border-round font-weight-900">{{ firstLetter }}</div>
    <div class="name-detail ml-2">
      <h2 class="mb-3">{{ name }}</h2>
      <p>{{ join_status }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    join_status: {
      type: String,
      required: true,
    },
  },

  computed: {
    firstLetter() {
      return this.name.charAt(0).toLocaleUpperCase();
    },
  },
};
</script>
