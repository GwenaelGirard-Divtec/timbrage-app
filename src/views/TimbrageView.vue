<template>
    <q-page
        class="home full-height row justify-center items-center content-center"
    >
        <q-card>
            <q-card-section class="column content-center q-gutter-lg">
                <span class="timbrage-display text-primary">{{this.getFullDate}}</span>
                <div class="row justify-center items-stretch content-between" style="gap: 16px;">
                    <q-date
                        ref="dateInput"
                        v-model="date"
                        :options="this.weekOnlyOption"
                        mask="YYYY-MM-DD"
                        :locale="this.local"
                        today-btn
                    />

                    <q-time
                        ref="timeInput"
                        v-model="time"
                        format24h
                        now-btn
                    />
                </div>

                <q-btn color="primary" label="Timbrer" size="lg" @click="this.timbrer(9)" />
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
import { calendarSettings } from '@/data/calendarSettings'

export default {
    name: "HomeView",
    components: {},

    data() {
        return {
            date: null,
            time: null,
            refreshNowInterval: null,
            local: calendarSettings,
        };
    },

    watch: {
        date() {
            if(this.date === null) {
                let now = new Date()
                this.date = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`
            }
        }
    },

    computed: {
        getFullDate() {

            let realDate = new Date(this.date)

            return `${this.local.daysShort[realDate.getDay()]} 
                    ${this.addZero(realDate.getDay())} 
                    ${this.local.months[realDate.getMonth()]} 
                    ${realDate.getFullYear()} - 
                    ${this.time}
                    `
        }
    },

    methods: {

        weekOnlyOption(date) {
            let weekday = new Date(date).getDay();
            return weekday !== 0 && weekday !== 6;

            //let fullDate = new Date();
            //let weekday = fullDate.getDay();
            //return weekday > 0 && weekday < 6;
        },

        addZero(num) {
            return num <= 9 ? "0"+num : num;
        },

        timbrer(id) {
            this.$store.dispatch('getNotes', id)
        },
    },

    mounted() {
        this.$refs.dateInput.setToday();
        this.$refs.timeInput.setNow();
    }
};
</script>

<style lang="scss" scoped>
.timbrage-display {
    text-align: center;
    font-size: 2em;
    font-weight: bold;
}
</style>
