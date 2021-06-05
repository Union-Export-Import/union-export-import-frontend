import CategoryService from "@/services/category/CategoryService.js";
import { paginationParams, sortingParams, filter } from "@/Helper";
export const namespaced = true;
export const state = {
  categories: null,
  category: null,
  data: [
    {
      id: 1,
      name: "Mg Mg",
      company_name: "Mg COM",
      address: "COM",
      email: "dm@gm.com",
      phone_number: "098765433",
      bank_acc: "fjweio238749",
      remark: "efjwiojfoiewjofw",
      created_at: "2021-05-25 06:05:41",
      updated_at: "2021-05-25 06:05:41"
    }
  ],
  sortBy: {
    key: "id",
    type: "desc"
  },
  loading: false,
  payload: null,
  open: false
};
export const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },
  SET_CATEGORY(state, category) {
    state.category = category;
  },
  LOADING(state) {
    state.loading = true;
  },
  STOP_LOADING(state) {
    state.loading = false;
  },
  SORT_TYPE(state, type) {
    state.sortBy.type = type;
  },
  SET_FORM_DATA(state, payload) {
    state.payload = payload;
  },
  HANDLE_CATEGORY_FILTER_BOX(state) {
    state.open = !state.open;
  }
};
export const actions = {
  getCategories({ state, commit }) {
    CategoryService.filterCategories({
      ...sortingParams(state.sortBy.key, state.sortBy.type),
      ...paginationParams(1, 10),
      ...filter([], "AND")
    })
      .then(response => {
        commit("SET_CATEGORIES", response.data);
        commit("STOP_LOADING");
      })
      .catch(error => {
        console.log("error", error.message);
        commit("STOP_LOADING");
      });
  },
  createCategory({ commit }, categoryData) {
    commit("STOP_LOADING");
    return CategoryService.createCategory(categoryData);
  },
  updateCategory({ commit }, { form, id }) {
    commit("STOP_LOADING");
    return CategoryService.updateCategory(form, id);
  },
  categoryPagiClick({ commit }, pageNo) {
    commit("LOADING");
    CategoryService.filterCategories({
      ...sortingParams(state.sortBy.key, state.sortBy.type),
      ...paginationParams(pageNo, 10),
      ...filter([], "AND")
    })
      .then(response => {
        commit("STOP_LOADING");
        commit("SET_CATEGORIES", response.data);
      })
      .catch(() => {
        commit("STOP_LOADING");
      });
  },
  categorySort({ dispatch, commit, state }, column) {
    commit("LOADING");
    if (state.sortBy.key == column) {
      if (state.sortBy.type == "asc") {
        commit("SORT_TYPE", "desc");
        dispatch("getCategories");
      } else {
        commit("SORT_TYPE", "asc");
        dispatch("getCategories");
      }
    } else {
      state.sortBy.key = column;
      dispatch("getCategories");
    }
  },
  getCategory({ commit, getters }, id) {
    commit("LOADING");
    const category = getters.getCategoryById(id);
    if (category) {
      commit("SET_CATEGORY", category);
      commit("STOP_LOADING");
    } else {
      CategoryService.getCategory(id)
        .then(res => {
          commit("SET_CATEGORY", res.data.data);
          commit("STOP_LOADING");
        })
        .catch(e => {
          console.log(e);
          commit("STOP_LOADING");
        });
    }
  }
};
export const getters = {
  categoryFilterOpen: state => state.open,
  getCategory: state => state.category,
  getCategoryById: state => id => {
    if (state.categories) {
      return state.categories.data.find(category => category.id == id);
    }
  }
};
