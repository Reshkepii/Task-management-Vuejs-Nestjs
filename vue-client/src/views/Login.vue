<template>
    <div>
        <v-app>
            <v-container class="grey lighten-3" fluid fill-height>
                <v-card class="mt-4 mx-auto text-center hidden-sm-only" min-width="320">
                    <v-card-text>
                            <v-card-text class="headline text--white">Login</v-card-text>
                    </v-card-text>
                    <v-form @submit.prevent="login">
                        <v-card-text>
                            <v-text-field label="Username" v-model="username"  name="username" type="text"></v-text-field>
                            <v-text-field label="Password" v-model="password" name="password" type="password"></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-row align="center" no-gutters>
                                <v-col class="text-center">
                                    <div class="my-2">
                                        <v-btn color="primary" type="submit"  block>Login</v-btn>
                                    </div>
                                    <div>
                                        <v-btn color="primary" @click="navigateTo({name:'SignUp'})"  x-small  text> Sign up </v-btn>
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


import axios from 'axios';

export default {
    name:"Login",
    data() {
        return {
            username:'',
            password:'',
            error:null
        };
    },
    methods: {
        login:function() {
            axios.post('http://localhost:3000/auth/signin/',{
                username: this.username,
                password: this.password,
            })
            .then((response) => {
                
                let token = response.data.access;
                localStorage.setItem("SavedToken", 'Bearer ' + token);
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                (this.$router.push({name:'Dashboard'}));
                
            })
            // axios.get('http://localhost:3000/dashboard/',{ headers: { Authorization:localStorage.getItem('SavedToken') }})
            // .then(response => console.log(response))
            // .catch(error => console.log(error));
        },
        navigateTo(route) {
            this.$router.push(route);
        }
        

    }

}
</script>