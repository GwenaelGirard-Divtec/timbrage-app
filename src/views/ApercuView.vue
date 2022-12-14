<template>
    <q-page
        class="home full-height row justify-center items-center content-center q-pa-md"
    >
        <q-card class="my-card">
            <q-card-section
                class="q-gutter-md column justify-center items-stretch content-start"
            >
                <q-date
                    v-model="datesList"
                    ref="dateListInput"
                    multiple
                    today-btn
                    landscape
                    mask="YYYY-MM-DD"
                    :locale="this.calendarSettings"
                    :options="this.weekOnlyOption"
                />

                <q-table
                    color="primary"
                    card-class=""
                    table-class="text-grey-8"
                    table-header-class="text-brown"
                    flat
                    bordered
                    title="Treats"
                    :rows="filteredRows"
                    :columns="columns"
                    row-key="name"
                    :rows-per-page-options="[0]"
                >
                    <template v-slot:no-data="{ }">
                        <div class="full-width row flex-center text-accent q-gutter-sm">
                            <span class="text-blue-grey-6">Il n'y a pas de trimbrage ce jour là</span>
                        </div>
                    </template>
                </q-table>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
import bdJson from "@/data/BD_output.json";
import { calendarSettings } from "@/data/calendarSettings";

export default {
    name: "ApercuView",

    data() {
        return {
            datesList: null,
            rows: bdJson.rows,
            columns: bdJson.columns,
            calendarSettings: calendarSettings
        };
    },

    computed: {
        filteredRows() {
            if (this.datesList) {
                return this.rows.filter(
                    (el) => this.datesList.indexOf(el.date) !== -1
                );
            } else {
                return this.rows.filter(
                    (el) => new Date(el.date) === new Date()
                );
            }
        },
    },

    methods: {
        weekOnlyOption(date) {
            let weekday = new Date(date).getDay();
            return weekday !== 0 && weekday !== 6;
        },
    },

    mounted() {
        this.$refs.dateListInput.setToday();
    },
};
</script>
