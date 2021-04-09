import { QuestionState } from "@/interface/state/questionState";
import { Question } from "@/interface/types/question";

import { ActionTree, MutationTree } from 'vuex'

export const state = (): QuestionState => ({
  questionsList: []
})

export const actions: ActionTree<QuestionState, QuestionState> = {
  getQuestions: (ctx) => {
    console.log(ctx);
    ctx.commit('GET_QUESTIONS', "got it")
  }
}

export const mutations: MutationTree<QuestionState> = {
  GET_QUESTIONS: (state, question: Question) => {
    state.questionsList = [ question, ...state.questionsList ]
  }
}