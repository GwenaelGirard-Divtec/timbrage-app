let calendarSettings = {
    /* starting with Sunday */
    days: "Dimanche_Lundi_Mardi_Mercredi_Vendredi_Samedi".split(
        "_"
    ),
    daysShort: "Dim_Lun_Mar_Mer_Jeu_Ven_Sam".split("_"),
    months: "Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Août_Septembre_Octobre_Novembre_Décembre".split(
        "_"
    ),
    monthsShort:
        "Jan_Fev_Mar_Avr_Mai_Jun_Jui_Aou_Sep_Oct_Nov_Dec".split(
            "_"
        ),
    firstDayOfWeek: 1, // 0-6, 0 - Sunday, 1 Monday, ...
    format24h: true,
    pluralDay: "jours",
}

export { calendarSettings }