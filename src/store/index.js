import { createStore } from 'vuex'
import { mande } from 'mande'
import { Notify } from 'quasar';

const api = mande('http://localhost:8000/api')

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    getNotes({commit}) {
        api.get(`/timbrages`)
        .then(response => {
            console.log(response)
        })
    },

    timbrer({commit}, body) {
        api.post('/timbrages', {
            date: body.date,
            heure: body.heure
        })
        .then(response => {
            console.log(response)
            Notify.create({
                message: "Timbrage effectué avec succès",
                color: "positive",
                icon: 'check_circle',
                position: 'top-right'
            });
        })
        .catch(error => {
            console.log(response.body.message)
            Notify.create({
                message: error.body.message,
                color: "negative",
                icon: 'error',
                position: 'top-right'
            });
        }) 
    },

    detimbrer({commit}, date) {

        let now = new Date(date);
        let formatedDate = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`

        api.delete('/timbrages/'+formatedDate)
        .then(response => {
            console.log(response);

            Notify.create({
                message: "Détimbrage effectué avec succès",
                color: "positive",
                icon: 'check_circle',
                position: 'top-right'
            });
        })
        .catch(error => {
            Notify.create({
                message: error.body.message,
                color: "negative",
                icon: 'error',
                position: 'top-right'
            });
        })
    },

    async getTimbrageDate({commit}, date) {
        let now = new Date(date);
        let formatedDate = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`
        
        let response = await api.get('/jours/'+formatedDate)

        return response
    }

  },
  modules: {
  }
})
