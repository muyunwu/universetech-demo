export default function({ $axios, store }) {
  const { commit } = store;
  $axios.onRequest(config => {
      commit('loading/SET_LOADING', 1)
  });
  $axios.onResponse(response => {
    commit('loading/SET_LOADING', -1)
  });
  $axios.onError(error => {
    commit('loading/SET_LOADING', -1)
  });
}
