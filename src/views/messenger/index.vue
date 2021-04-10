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
                <conversation-list />
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
import ConversationList from "../../components/messenger/ConversationList";
export default {
  components: {
    "conversation-list": ConversationList,
  },
};
</script>