<template>
    <q-page class="home q-pa-md items-start">
        <q-card class="today-timbrages-container">
            <q-card-section>
                <q-table
                    color="primary"
                    class="today-timbrages"
                    card-class=""
                    table-class="text-grey-8"
                    table-header-class="text-black"
                    flat
                    bordered
                    title="Timbrages du jour"
                    :rows="formatedDateArray"
                    :columns="columns"
                    row-key="name"
                    dense
                    :rows-per-page-options="[0]"
                >
                    <template v-slot:no-data="{}">
                        <div
                            class="full-width row flex-center text-accent q-gutter-sm"
                        >
                            <span class="text-black"
                                >Il n'y a pas de trimbrage ce jour là</span
                            >
                        </div>
                    </template>

                    <template v-slot:loading>
                        <q-inner-loading showing color="primary" />
                    </template>
                </q-table>
            </q-card-section>
        </q-card>
        <q-card class="timbrage-container row content-center justify-center">
            <q-card-section class="column content-center q-gutter-lg">
                <span class="timbrage-display text-primary">{{
                    this.getFullDate
                }}</span>
                <div
                    class="row justify-center items-stretch content-between"
                    style="gap: 16px"
                >
                    <q-date
                        ref="dateInput"
                        v-model="date"
                        :options="this.weekOnlyOption"
                        mask="YYYY-MM-DD"
                        :locale="this.local"
                        today-btn
                    />

                    <q-time ref="timeInput" v-model="time" format24h now-btn />
                </div>

                <q-btn
                    color="primary"
                    label="Timbrer"
                    size="lg"
                    @click="this.timbrer"
                />

                <q-btn label="Détimbrer" size="lg" @click="this.detimbrer" />
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
import { calendarSettings } from "@/data/calendarSettings";
import { Loading } from 'quasar'

export default {
    name: "HomeView",
    components: {},

    data() {
        return {
            date: null,
            time: null,
            refreshNowInterval: null,
            local: calendarSettings,
            dates: [],

            columns: [
                {
                    name: "heure",
                    label: "Heure",
                    field: "heure",
                    sortable: false,
                    align: "left",
                },

                {
                    name: "type",
                    label: "Type",
                    field: "type",
                    sortable: false,
                    align: "left",
                },
            ],
        };
    },

    watch: {
        date() {
            if (this.date === null) {
                let now = new Date();
                this.date = `${now.getFullYear()}-${
                    now.getMonth() + 1
                }-${now.getDate()}`;
            }

            this.getTimbrageDate(this.date);
        },
    },

    computed: {
        getFullDate() {
            let realDate = new Date(this.date);

            return `${this.local.daysShort[realDate.getDay()]} 
                    ${this.addZero(realDate.getDay())} 
                    ${this.local.months[realDate.getMonth()]} 
                    ${realDate.getFullYear()} - 
                    ${this.time}
                    `;
        },

        formatedDateArray() {
            return this.dates.map((element) => {
                return {
                    heure: element.heure.slice(0, 5),
                    type: element.type,
                }
            })
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
            return num <= 9 ? "0" + num : num;
        },

        async getTimbrageDate(date) {
            Loading.show()
            this.dates = await this.$store.dispatch("getTimbrageDate", date);
            Loading.hide()
        },

        async test(date) {
            this.dates = await this.$store.dispatch("getTimbrageDate", date);
        },

        timbrer() {
            let body = {
                date: this.date,
                heure: this.time,
            };
            this.$store.dispatch("timbrer", body);
            this.getTimbrageDate(this.date);
        },

        detimbrer() {
            this.$store.dispatch("detimbrer", this.date);
            this.getTimbrageDate(this.date);
        },
    },

    mounted() {
        this.$refs.dateInput.setToday();
        this.$refs.timeInput.setNow();

        this.getTimbrageDate(new Date());
    },
};
</script>

<style lang="scss" scoped>
.timbrage-display {
    text-align: center;
    font-size: 2em;
    font-weight: bold;
}

.home {
    display: grid;
    grid-template-columns: 2fr 3fr;
    gap: 16px;
    height: 100%;
    position: relative;

    @media screen and (max-width: 1100px) {
        grid-template-columns: 1fr;

        .timbrage-container {
            order: -10000;
        }
    }

    .today-timbrages-container {
        height: 100%;

        .q-card__section {
            height: 100%;
            position: relative;

            .today-timbrages {
                height: calc(100vh - 180px);
            }
        }
    }

    .timbrage-container {
        height: 100%;
    }
}
</style>
