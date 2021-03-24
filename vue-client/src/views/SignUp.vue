<template>
    <div>
        <v-app>
            <v-container class="grey lighten-3" fluid fill-height>
                <v-card class="mt-4 mx-auto text-center hidden-sm-only" min-width="320">
                    <v-card-text>
                        <v-card-text class="headline text--white">Sign Up</v-card-text>
                    </v-card-text>
                    <v-form @submit.prevent="signUp">
                        <v-card-text>
                            <v-text-field label="username" v-model="username" name="username" type="text"></v-text-field>
                            <v-text-field label="password" v-model="password" name="password" type="password"></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-row align="center" no-gutters>
                                <v-col >
                                    <div class="my-2">
                                        <v-btn color="primary" type="submit" block>SignUp</v-btn>
                                    </div>
                                    <div>
                                        <v-btn color="primary" x-small text>Already registered?</v-btn>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-container>
        </v-app>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'SignUp',
    data() {
        return {
            username: '',
            password: '',
            error: null
        };
    },
    methods: {
        signUp:function() {
            axios.post('http://localhost:3000/auth/signup', {
                username: this.username,
                password: this.password,
            })
            .then((response) => {
                let token = response.data.access;
                localStorage.setItem("SavedToken", 'Bearer '+ token);
                axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;
                (this.$router.push({name: 'Login'}));
            })
        },
    }
}
</script>