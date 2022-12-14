import { createStore } from 'vuex'
import { mande } from 'mande'
import axios from 'axios'

const api = mande('https://rapnote-back.vercel.app/rapnoteapi')

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    getNotes({commit}, id) {
        api.get(`/notes/${id}`)
        .then(response => {
            console.log(response)
        })
    }
  },
  modules: {
  }
})
