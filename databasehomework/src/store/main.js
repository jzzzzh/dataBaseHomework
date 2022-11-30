import { createStore } from "vuex";

export default createStore({
  state: {
    token: "",
    is_login: false,
    username: "",
    model:""
  },
  getters: {
    myName(state) {
      return state.username;
    },
    myToken(state) {
      return state.token;
    },
    myModel(state)
    {
      return state.model;
    }
  },
  mutations: {
    setmyToken(state, mytoken) {
      state.token = mytoken;

    },
    setmyName(state, myName) {
      state.username = myName;
    },
    setIsLogin(state)
    {
      state.islogin = true;
    },
    setModel(state, myModel)
    {
      state.model = myModel;
    },
    logout(state) {
      state.token = "";
      state.username = "";
      state.islogin = false;
      state.model = "";
    },

  },
  actions: {},
  modules: {}
});
