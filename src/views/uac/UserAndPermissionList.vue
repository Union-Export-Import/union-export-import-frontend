<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }" class="active-breadcrumb"
      >Home Page</el-breadcrumb-item
    >
    <el-breadcrumb-item>User Access Control</el-breadcrumb-item>
  </el-breadcrumb>

  <el-tabs type="card">
    <el-tab-pane>
      <template #label>
        <span>Users</span>
      </template>
      <el-row>
        <el-col :span="14">
          <p class="pagi-info">
            Total {{ user.users ? user.users.meta.total : 0 }} items, current
            page
            {{ user.users ? user.users.meta.current_page : 0 }}
          </p>
        </el-col>
        <el-col :span="10">
          <ul class="create-filter">
            <li>
              <create-btn name="New User" routeName="UserCreate" />
            </li>
            <li>
              <p class="sort-by" v-if="user.sortBy">
                sorted by
                <strong class="sorted">{{ user.sortBy.key }}</strong>
              </p>
            </li>
            <li>
              <img
                @click="userFilter"
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDQ1OSA0NTkiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGcgaWQ9ImZpbHRlciI+CgkJPHBhdGggZD0iTTE3OC41LDM4Mi41aDEwMnYtNTFoLTEwMlYzODIuNXogTTAsNzYuNXY1MWg0NTl2LTUxSDB6IE03Ni41LDI1NWgzMDZ2LTUxaC0zMDZWMjU1eiIgZmlsbD0iIzAwMDAwMDgwIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+Cgk8L2c+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPC9nPjwvc3ZnPg=="
              />
            </li>
          </ul>
        </el-col>
      </el-row>
      <user-list
        v-if="user"
        :data="user.users ? user.users.data : user.data"
        :loading="user.loading"
        @user-header-click="sortingUsers"
      />
      <el-pagination
        class="center-align mt-3"
        background
        layout="prev, pager, next"
        :total="user.users ? user.users.meta.total : 1"
        @prev-click="UserPagiClick"
        @next-click="UserPagiClick"
        @current-change="UserPagiClick"
      ></el-pagination>
    </el-tab-pane>
    <el-tab-pane>
      <template #label>
        <span>Roles & Permission</span>
      </template>
      <el-row>
        <el-col :span="14">
          <p class="pagi-info">
            Total {{ role.roles ? role.roles.meta.total : 0 }} items, current
            page
            {{ role.roles ? role.roles.meta.current_page : 0 }}
          </p>
        </el-col>
        <el-col :span="10">
          <ul class="create-filter">
            <li>
              <create-btn name="New Role" routeName="RoleCreate" />
            </li>
            <li>
              <p class="sort-by">
                sorted by
                <strong class="sorted">{{ role.sortBy.key }}</strong>
              </p>
            </li>
            <li>
              <img
                @click="filterRole"
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDQ1OSA0NTkiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGcgaWQ9ImZpbHRlciI+CgkJPHBhdGggZD0iTTE3OC41LDM4Mi41aDEwMnYtNTFoLTEwMlYzODIuNXogTTAsNzYuNXY1MWg0NTl2LTUxSDB6IE03Ni41LDI1NWgzMDZ2LTUxaC0zMDZWMjU1eiIgZmlsbD0iIzAwMDAwMDgwIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+Cgk8L2c+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPC9nPjwvc3ZnPg=="
              />
            </li>
          </ul>
        </el-col>
      </el-row>
      <permission-list
        v-if="role"
        :data="role.roles ? role.roles.data : role.data"
        :loading="role.loading"
        @roleHeaderClick="sortingRoles"
      />
      <el-pagination
        class="center-align mt-3"
        background
        layout="prev, pager, next"
        :total="role.roles ? role.roles.meta.total : 1"
        @prev-click="RolePagiClick"
        @next-click="RolePagiClick"
        @current-change="RolePagiClick"
      ></el-pagination>
    </el-tab-pane>
  </el-tabs>
  <role-filter />
  <filter-user />
</template>

<script>
import UserList from "@/components/uac/List.vue";
import PermissionList from "@/components/uac/PermissionList";
import FilterUser from "@/components/uac/Filter.vue";
import RoleFilter from "@/components/uac/RoleFilter.vue";
import Createbtn from "@/components/resuable/CreateBtn";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  components: {
    "user-list": UserList,
    "permission-list": PermissionList,
    "filter-user": FilterUser,
    "role-filter": RoleFilter,
    "create-btn": Createbtn
  },

  created() {
    if (!this.user.users) {
      this.getUsers();
      this.getRoles();
    }
  },

  computed: {
    ...mapState(["user", "role"])
  },

  methods: {
    //this are from vuex modules
    ...mapActions("user", ["getUsers", "userPagiClick", "userSort"]),
    ...mapActions("role", ["getRoles", "rolePagiClick", "roleSort"]),
    ...mapMutations("role", ["ROLE_FILTER"]),
    ...mapMutations("user", ["STOP_LOADING", "LOADING", "USER_FILTER"]),

    //this method will handle User's pagination
    UserPagiClick(pageNo) {
      this.userPagiClick(pageNo);
    },

    //this method will handle Role pagination
    RolePagiClick(pageNo) {
      this.rolePagiClick(pageNo);
    },

    //this method will work when click sorting titles
    sortingUsers(column) {
      this.userSort(column);
    },

    sortingRoles(column) {
      this.roleSort(column);
    },

    //this method is for pop up notification of success or error
    open2(message, type) {
      this.$message({
        showClose: true,
        message: message,
        type: type
      });
    },

    //this method is to handle User Filter form
    userFilter() {
      this.USER_FILTER();
    },

    filterRole() {
      this.ROLE_FILTER();
    }
  }
};
</script>
