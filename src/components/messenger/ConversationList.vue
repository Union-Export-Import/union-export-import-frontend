<template>
  <div>
    <div v-for="(item) in getMessages" :key="item.id">
      <conversation-item v-bind:messages="item" />
    </div>
  </div>
</template>
<script>
import ConversationItem from "./ConversationItem.vue";
export default {
  data() {
    return {
      messages: [
        {
          userPhoto: "url",
          username: "Aung Myo Oo",
          message: "Hi Hello for me",
        },
        {
          userPhoto: "url",
          username: "Aung Myo Oo",
          message: "Hi Hello for me",
        },
        {
          userPhoto: "url",
          username: "Aung Myo Oo",
          message: "Hi Hello for me",
        },
      ],
    };
  },
  computed: {
    getMessages: function () {
      return this.messages;
    },
  },
  components: {
    "conversation-item": ConversationItem,
  },
};
</script>