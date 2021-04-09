import { getAllPosts, getPostByID } from "@/handlers/public/posts"

import { ActionTree, MutationTree, GetterTree } from 'vuex'

import { PostState } from "@/interface/state/postState"
import { POST } from '@/interface/types/post'

enum MutationTypes {
  SET_POSTS = 'SET_POSTS'
}

export const state = (): PostState => ({
  posts: []
})

export const getters: GetterTree<PostState, PostState> = {
  getSinglePost: state => async (postID: string) => {
    const posts = state.posts
    let post = posts.find(post => post.postID === postID) || await getPostByID(postID)
    return post
  }
}

export const mutations: MutationTree<PostState> = {
  [MutationTypes.SET_POSTS](state, posts: POST[]) {
    state.posts = posts
  }
}

export const actions: ActionTree<PostState, PostState> = {
  async getPosts({ state, commit }) {
    if(!state.posts.length) {
      const posts = await getAllPosts()
      commit(MutationTypes.SET_POSTS, posts)
    }
  }
}