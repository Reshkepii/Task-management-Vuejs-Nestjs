<template>
    <nav>
        <v-app-bar app>
            <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="text--uppercase grey--text">
                <span class="font-weight-light">Task</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>


            <v-btn>
                <span @click="logUserOut()">Sign out</span>
                <v-icon right>mdi-exit-to-app </v-icon>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer app v-model="drawer" class="primary">
            <v-row justify="center">
                <v-col cols="6">
                    <v-subheader class="white--text mt-5">
                        Rexhepi
                    </v-subheader>
                </v-col>
            </v-row>

            <v-list>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="white--text">Create Task</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

            </v-list>
        </v-navigation-drawer>

    </nav>
</template>
<script>
export default {
    name:'Layout',

    data() {
        return{
            drawer: false,
        }
    },
    methods: {
        logUserOut() {
        localStorage.removeItem("SavedToken");
        this.$router.push("/login");
    }
    }
}
</script>