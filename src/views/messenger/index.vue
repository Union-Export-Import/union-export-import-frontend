<template>
  <div>
    <el-row>
      <el-col :span="8">
        <div class="mesg-conversation-pane">
          <div class="mesg-container">
            <el-input placeholder="Please input" v-model="input"></el-input>

            <el-tabs type="card" @tab-click="handleClick">
              <el-tab-pane>
                <template #label>
                  <span>Messages</span>
                </template>
                <conversation-item />
              </el-tab-pane>
              <el-tab-pane>
                <template #label>
                  <span>Users</span>
                </template>
                <template></template>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="mesg-message-pane">hfeuiw</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ConversationItem from "../../components/messenger/ConversationItem";
export default {
  components: {
    "conversation-item": ConversationItem,
  },
};
</script>