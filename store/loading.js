export const state = () => ({
    loadings: 0
  })
  
  export const getters = {
    isLoading(state) {
      return state.loadings > 0
    }
  }
  
  export const mutations = {
    SET_LOADING(state, payload) {
      state.loadings = state.loadings + payload
    }
  }
  
  export const actions = {
    setLoading({ commit }, payload) {
      commit('SET_LOADING', payload)
    }
  }
  