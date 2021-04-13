import { getAllPosts, getPostByID } from "@/handlers/public/posts"

import { ActionTree, MutationTree, GetterTree } from 'vuex'

import { POST } from '@/interface/types/post'
import { likePostByID, unlikePostByID } from "@/helpers/posts"
import { RootState } from "."

export const state = () => ({
  posts: [] as POST[]
})

export type PostState = ReturnType<typeof state>

export const getters: GetterTree<PostState, RootState> = {
  getSinglePost: state => async (postID: string) => {
    const posts = state.posts
    let post = posts.find(post => post.postID === postID) || await getPostByID(postID)
    return post
  }
}

enum MutationTypes {
  SET_POSTS = 'SET_POSTS',
  UPDATE_POST = 'UPDATE_POST'
}

export const mutations: MutationTree<PostState> = {
  [MutationTypes.SET_POSTS](state, posts: POST[]) {
    state.posts = posts
  },
  [MutationTypes.UPDATE_POST](state, updatedPost: POST) {
    state.posts = state.posts.map(post => {
      if(post.postID === updatedPost.postID) return updatedPost
      return post
    })
  }
}

export const actions: ActionTree<PostState, RootState> = {
  async getPosts({ state, commit }) {
    if(!state.posts.length) {
      const posts = await getAllPosts()
      commit(MutationTypes.SET_POSTS, posts)
    }
  },

  async likePost({ state, rootState, commit }, postID: string) {
    try {
      const liked = await likePostByID(postID)
      if(liked) {
        const author = rootState.user.email
        const likedPost = state.posts.find(post => post.postID === postID)
        if(likedPost) {
          const likedPostWIthLikesKey = { ...likedPost, likes: [author, ...likedPost.likes] }
          commit(MutationTypes.UPDATE_POST, likedPostWIthLikesKey)
        }
      }
      return liked
    } catch (error) {
      console.log(error)
      return false
    }
  },
  
  async unlikePost({ state, rootState, commit }, postID: string) {
    try {
      const unliked = await unlikePostByID(postID)
      if(unliked) {
        const author = rootState.user.email
        const unlikedPost = state.posts.find(post => post.postID === postID)
        if(unlikedPost) {
          const unlikedPostAuthorFiltered = {
            ...unlikedPost,
            likes: unlikedPost.likes.filter(likedBy => likedBy != author)
          }
          commit(MutationTypes.UPDATE_POST, unlikedPostAuthorFiltered)
        }
        return unliked
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }
}