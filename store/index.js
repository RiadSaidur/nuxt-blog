import { createNewUser, getUserByUid } from "@/helpers/user"

export const state = () => ({
  token: null,
  user: null
})

export const mutations = {
  SET_USER(state, userInfo) {
    state.user = userInfo
  },

  UPDATE_USER(state, userInfo) {
    state.user.displayName = userInfo.displayName
    state.user.username = userInfo.username
  },

  SET_TOKEN(state, token) {
    state.token = token
  },

  REMOVE_USER(state) {
    state.user = null
    state.token  = null
  }
}

export const actions = {
  async onAuthStateChangedAction({ dispatch, commit }, { authUser }) {
    if(!authUser) return commit('REMOVE_USER')

    // if user is already authenticated
    const user = {
      uid: authUser.uid
    }
    
    dispatch('getUser', user)
    if(process.browser) commit('SET_TOKEN', localStorage.token)
  },

  async getUser({ dispatch }, user) {
    const uid = user.uid
    const signedUser = await getUserByUid(uid)

    if(signedUser) return dispatch('setCurrentUser', signedUser)

    // if this is signing in first time
    dispatch('createNewUserProfile', user)
    
  },

  async createNewUserProfile({ dispatch }, user) {
    const userInfo = {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      username: user.username
    }

    const newUser = await createNewUser(uid, userInfo)
    dispatch('setCurrentUser', newUser)
  },

  setCurrentUser({ commit }, userInfo) {
    localStorage.username =  userInfo.username
    commit('SET_USER', userInfo)
  },

  updateCurrentUser({ commit }, userInfo) {
    localStorage.username =  userInfo.username
    commit('UPDATE_USER', userInfo)
  }
}