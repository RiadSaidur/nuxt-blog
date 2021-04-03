import { getAllPosts, getPostByID } from "@/handlers/public/posts"
import { createNewUser, getUserByUid } from "@/helpers/user"

export const state = () => ({
  token: null,
  user: null,
  posts: []
})

export const getters = {
  getSinglePost: state => async postID => {
    const posts = state.posts
    let post = posts.find(post => post.postID === postID) || await getPostByID(postID)
    return post
  }
}

export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION(state, { authUser }) {
    if(authUser) {
      const { email, displayName, photoURL } = authUser
      state.user = { email, displayName, photoURL }
      if(process.browser) state.token = localStorage.token
    }
    else {
      state.user = null
      state.token  = null
    }
  },
  SET_POSTS(state, posts) {
    state.posts = posts
  },
  SET_USER(state, userInfo) {
    state.user = userInfo
  }
}

export const actions = {
  async nuxtServerInit ({ commit }, { res }) {
    if(res && res.locals && res.locals.user) {
      const { claims, ...authUser } = res.locals.user
      commit('ON_AUTH_STATE_CHANGED_MUTATION', { authUser, claims })
    }
  },
  async getPosts({ state, commit }) {
    if(!state.posts.length) {
      const posts = await getAllPosts()
      commit('SET_POSTS', posts)
    }
  },
  async getUser({ dispatch }, user) {
    const userInfo = {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    }
    
    const uid = user.uid
    const signedUser = await getUserByUid(uid)

    if(signedUser) return dispatch('setCurrentUser', signedUser)

    const newUser = await createNewUser(uid, userInfo)
    dispatch('setCurrentUser', newUser)
  },
  setCurrentUser({ commit }, userInfo) {
    commit('SET_USER', userInfo)
  }
}