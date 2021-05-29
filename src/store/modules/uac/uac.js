const state = {
  users: null,
  user: null,
  roles: null,
  data: [
    {
      id: 1,
      name: "Admin",
      email: "admin@admin.com",
      email_verified_at: null,
      account_status: "Active",
      created_at: "2021-05-25T10:07:18.000000Z",
      updated_at: "2021-05-26T06:02:44.000000Z",
      nrc: "12/magaat8999",
      phone_number: "09967696966",
      roles: [
        {
          id: 1,
          title: "Admin",
          created_at: null,
          updated_at: null,
          pivot: {
            user_id: 1,
            role_id: 1
          }
        }
      ]
    }
  ]
};

const mutations = {
  ADD_UAC_DATA: (state, data) => {
    state.users = data;
  },
  ADD_USER: (state, data) => {
    state.user = data;
  },
  ADD_ROLE_DATA: (state, data) => {
    state.roles = data;
  }
};

const getters = {
  getUsers: state => state.users,
  getUser: state => state.user,
  getRoles: state => state.roles
};

export default {
  namespaced: true,
  state,
  mutations,
  getters
};
