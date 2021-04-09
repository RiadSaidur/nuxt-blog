import { createNewUser, getUserByUid } from "@/helpers/user"

import { ActionTree, MutationTree } from 'vuex'

import { UserState } from "@/interface/state/userState"
import { USER } from "@/interface/types/user"

export const state = (): UserState => ({
  token: null,
  user: null
})

export const mutations: MutationTree<UserState> = {
  SET_USER(state, userInfo: USER) {
    state.user = userInfo
  },

  UPDATE_USER(state, userInfo: USER) {
    state.user!.displayName = userInfo.displayName
    state.user!.username = userInfo.username
  },

  SET_TOKEN(state, token: string) {
    state.token = token
  },

  REMOVE_USER(state) {
    state.user = null
    state.token  = null
  }
}

export const actions: ActionTree<UserState, UserState> = {
  async onAuthStateChangedAction({ dispatch, commit }, { authUser }) {
    if(!authUser) return commit('REMOVE_USER')

    // if user is already authenticated
    
    dispatch('getUser', authUser)
    if(process.browser) commit('SET_TOKEN', localStorage.token)
  },

  async getUser({ dispatch }, user) {
    const uid: string = user.uid
    const signedUser = await getUserByUid(uid)

    if(signedUser) return dispatch('setCurrentUser', signedUser)

    // if this is signing in first time
    dispatch('createNewUserProfile', user)
    
  },

  async createNewUserProfile({ dispatch }, user: USER) {
    const userInfo: USER = {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      username: user.username,
      uid: user.uid
    }

    const newUser = await createNewUser(userInfo)
    dispatch('setCurrentUser', newUser)
  },

  setCurrentUser({ commit }, userInfo: USER) {
    localStorage.username =  userInfo.username
    commit('SET_USER', userInfo)
  },

  updateCurrentUser({ commit }, userInfo: USER) {
    localStorage.username =  userInfo.username
    commit('UPDATE_USER', userInfo)
  }
}