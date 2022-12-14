<template>
    <q-layout view="hHh lpR fFf">
        <q-header class="bg-primary text-white" height-hint="98">
            <q-toolbar>
                <q-toolbar-title> Timbrage </q-toolbar-title>
            </q-toolbar>

            <div class="row">
                <q-tabs align="left" class="col">
                    <q-route-tab to="/" label="Timbrage" />
                    <!--<q-route-tab to="/apercu" label="Aperçu" />-->
                </q-tabs>
                <q-tabs align="right" class="col">
                    <q-route-tab to="/compte" label="compte" />
                </q-tabs>
            </div>
        </q-header>

        <q-page-container class="body">
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<style lang="scss">
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.body {
    height: 100vh;
    position: relative;
}
</style>
