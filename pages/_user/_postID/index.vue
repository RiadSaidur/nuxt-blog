<template>
  <v-container class="d-flex flex-wrap justify-center align-center px-0">
    <v-card elevation="0">
      <v-img
        :src="post.TitleImage || defaultImage"
        max-height="calc(80vh)"
        class="back-image-container"
      >
        <v-spacer></v-spacer>
        <post-actions
          class="action-buttons"
          v-if="post.likes"
          :likes="post.likes"
          :shareInfo="shareInfo"
          @isLiked="updatePostLikeStatus"
        />
      </v-img>

      <v-card-title v-text='post.Title' />


      <v-card-subtitle class="mt-2">
          <v-icon>mdi-account</v-icon> <nuxt-link :to="`/${post.author}`" v-text="post.author" /> |
          <v-icon>mdi-calendar</v-icon> {{ post.createdAt }}  |
          <span v-if="isAuthor">
            <v-icon>mdi-pencil</v-icon> <nuxt-link :to="`/${post.author}/${postID}/edit`">edit</nuxt-link>
          </span>
      </v-card-subtitle>

      <v-card-text>
        <p>
          <v-icon>mdi-map-marker</v-icon> {{ post.Place }} |
          <v-icon>mdi-calendar</v-icon> {{ post.VisitDate }} |
        </p>
      </v-card-text>

      <v-card-text v-html="post.Body" class="rich-text" />
    </v-card>
    <Comments />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { POST } from '@/interface/types/post'

import Comments from "@/components/comments/Comments.vue"
import PostActions from '@/components/posts/PostActions.vue'

interface POSTVIEW extends POST {
  author: string;
  slug?: string;
  TitleImage: string;
}

interface SHARE {
  Title: string;
  author: string;
  postID: string;
}

export default Vue.extend({
  name: "Post",
  components: {
    Comments,
    PostActions
  },
  data() {
    return {
      post: {} as POSTVIEW,
      defaultImage: "https://images.unsplash.com/photo-1533850595620-7b1711221751?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8dHJhdmVsbGluZ3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
    }
  },
  head(): any {
    return {
      title: this.post.Title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.slug
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.post.Title
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.post.slug
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.post.TitleImage || this.defaultImage
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: this.post.Title
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.post.Title
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.post.slug
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.post.TitleImage || this.defaultImage
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: this.post.Title
        }
      ]
    }
  },
  computed: {
    postID(): string {
      return this.$route.params.postID
    },
    isAuthor(): boolean {
      return this.$store.state.user?.username === this.post.author
    },
    currentUserEmail(): string {
      return this.$store.state.user.email
    },
    shareInfo(): SHARE {
      const info = {
        Title: this.post.Title,
        author: this.post.author,
        postID: this.postID
      }
      return info
    }
  },
  async fetch() {
    this.post = await this.$store.getters['posts/getSinglePost'](this.postID)
    this.post.slug = this.post.Body.split(/\<*>/g)[1].split(/<\//g)[0] 
  },
  methods: {
    updatePostLikeStatus(isLiked: boolean) {
      if(isLiked) {
        if(this.post.likes.includes(this.currentUserEmail)) {
          this.post = {
            ...this.post,
            likes: this.post.likes.filter(likedBy => likedBy != this.currentUserEmail)
          }
        } else {
          this.post.likes.push(this.currentUserEmail)
        }
      }
    }
  }
})
</script> 

<style scoped>
  .back-image-container {
    position: relative;
  }
  .action-buttons {
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>