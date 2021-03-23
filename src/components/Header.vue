<template>
  <el-row>
    <el-col :span="4">
      <div class="logo-menu">
        <img
          class="menu-icon"
          @click="handleColapse"
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDM4NC45NyAzODQuOTciIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGcgaWQ9Ik1lbnVfMV8iPgoJCTxwYXRoIGQ9Ik0xMi4wMywxMjAuMzAzaDM2MC45MDljNi42NDEsMCwxMi4wMy01LjM5LDEyLjAzLTEyLjAzYzAtNi42NDEtNS4zOS0xMi4wMy0xMi4wMy0xMi4wM0gxMi4wMyAgICBjLTYuNjQxLDAtMTIuMDMsNS4zOS0xMi4wMywxMi4wM0MwLDExNC45MTMsNS4zOSwxMjAuMzAzLDEyLjAzLDEyMC4zMDN6IiBmaWxsPSIjMWNiZGI0IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+CgkJPHBhdGggZD0iTTM3Mi45MzksMTgwLjQ1NUgxMi4wM2MtNi42NDEsMC0xMi4wMyw1LjM5LTEyLjAzLDEyLjAzczUuMzksMTIuMDMsMTIuMDMsMTIuMDNoMzYwLjkwOWM2LjY0MSwwLDEyLjAzLTUuMzksMTIuMDMtMTIuMDMgICAgUzM3OS41OCwxODAuNDU1LDM3Mi45MzksMTgwLjQ1NXoiIGZpbGw9IiMxY2JkYjQiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD4KCQk8cGF0aCBkPSJNMzcyLjkzOSwyNjQuNjY3SDEzMi4zMzNjLTYuNjQxLDAtMTIuMDMsNS4zOS0xMi4wMywxMi4wM2MwLDYuNjQxLDUuMzksMTIuMDMsMTIuMDMsMTIuMDNoMjQwLjYwNiAgICBjNi42NDEsMCwxMi4wMy01LjM5LDEyLjAzLTEyLjAzQzM4NC45NywyNzAuMDU2LDM3OS41OCwyNjQuNjY3LDM3Mi45MzksMjY0LjY2N3oiIGZpbGw9IiMxY2JkYjQiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD4KCTwvZz4KCTxnPgoJPC9nPgoJPGc+Cgk8L2c+Cgk8Zz4KCTwvZz4KCTxnPgoJPC9nPgoJPGc+Cgk8L2c+Cgk8Zz4KCTwvZz4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8L2c+PC9zdmc+"
        />
        <h3>UNION</h3>
      </div>
    </el-col>
    <el-col :span="12" style="height: 1px"></el-col>
    <el-col :span="8">
      <ul class="mail-noti-profile">
        <li>
          <img
            class="mail-icon"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDIzMC4xNyAyMzAuMTciIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPHBhdGggZD0iTTIzMCw0OS41ODVjMC0wLjI2MywwLjE4MS0wLjUxOSwwLjE2OS0wLjc3OWwtNzAuMjQsNjcuNjhsNzAuMTU2LDY1LjUxOGMwLjA0MS0wLjQ2OC0wLjA4NS0wLjk0LTAuMDg1LTEuNDE4VjQ5LjU4NXoiIGZpbGw9IiM3ODdhN2QiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD4KCTxwYXRoIGQ9Ik0xNDkuMjA3LDEyNi45MDFsLTI4LjY3NCwyNy41ODhjLTEuNDUxLDEuMzk2LTMuMzI1LDIuMDk2LTUuMiwyLjA5NmMtMS44MzYsMC0zLjY3Mi0wLjY3LTUuMTEzLTIuMDEzbC0yOC41OTYtMjYuNjQ3ICAgTDExLjAxLDE5NS45ODljMS43MTcsMC42MTcsMy41NiwxLjA5Niw1LjQ5LDEuMDk2aDE5Ny42NjdjMi44NjYsMCw1LjU1NC0wLjg3Myw3Ljg5MS0yLjE3NUwxNDkuMjA3LDEyNi45MDF6IiBmaWxsPSIjNzg3YTdkIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+Cgk8cGF0aCBkPSJNMTE1LjI1MSwxMzguNzU3TDIyMi40NDcsMzUuNDk2Yy0yLjQyNy0xLjQ0My01LjI1Mi0yLjQxMS04LjI4LTIuNDExSDE2LjVjLTMuOTQzLDAtNy41NTYsMS41MzEtMTAuMzcsMy44NjYgICBMMTE1LjI1MSwxMzguNzU3eiIgZmlsbD0iIzc4N2E3ZCIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPgoJPHBhdGggZD0iTTAsNTIuMXYxMjguNDg0YzAsMS40NzUsMC4zMzksMi44OTcsMC43MDcsNC4yNTZsNjkuNzM4LTY3LjE1NkwwLDUyLjF6IiBmaWxsPSIjNzg3YTdkIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPC9nPjwvc3ZnPg=="
          />
        </li>
        <li>
          <img
            class="noti-icon"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIiBjbGFzcz0iIj48Zz48ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im0yMS4zNzkgMTYuOTEzYy0xLjUxMi0xLjI3OC0yLjM3OS0zLjE0Ni0yLjM3OS01LjEyNXYtMi43ODhjMC0zLjUxOS0yLjYxNC02LjQzMi02LTYuOTJ2LTEuMDhjMC0uNTUzLS40NDgtMS0xLTFzLTEgLjQ0Ny0xIDF2MS4wOGMtMy4zODcuNDg4LTYgMy40MDEtNiA2LjkydjIuNzg4YzAgMS45NzktLjg2NyAzLjg0Ny0yLjM4OCA1LjEzMy0uMzg5LjMzMy0uNjEyLjgxNy0uNjEyIDEuMzI5IDAgLjk2NS43ODUgMS43NSAxLjc1IDEuNzVoMTYuNWMuOTY1IDAgMS43NS0uNzg1IDEuNzUtMS43NSAwLS41MTItLjIyMy0uOTk2LS42MjEtMS4zMzd6IiBmaWxsPSIjNzg3YTdkIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+PHBhdGggZD0ibTEyIDI0YzEuODExIDAgMy4zMjYtMS4yOTEgMy42NzQtM2gtNy4zNDhjLjM0OCAxLjcwOSAxLjg2MyAzIDMuNjc0IDN6IiBmaWxsPSIjNzg3YTdkIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+PC9nPjwvZz48L3N2Zz4="
          />
        </li>
        <li>
          <el-dropdown trigger="click">
            <div class="demonstration">
              AO<span class="el-dropdown-link"
                ><i class="el-icon-arrow-down el-icon--right"></i>
              </span>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item icon="el-icon-plus"
                  >Action 1</el-dropdown-item
                >
                <el-dropdown-item icon="el-icon-circle-plus"
                  >Action 2</el-dropdown-item
                >
                <el-dropdown-item icon="el-icon-circle-plus-outline"
                  >Action 3</el-dropdown-item
                >
                <el-dropdown-item icon="el-icon-check"
                  >Action 4</el-dropdown-item
                >
                <el-dropdown-item icon="el-icon-circle-check"
                  >Action 5</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </li>
      </ul>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user"
    })
  },
  methods: {
    handleColapse() {
      this.$store.commit("handleCollapse");
    }
  }
};
</script>
