<template>
 <div class="dashboard">
     <Layout />
     <v-subheader class="grey--text">Dashboard</v-subheader>
  
    <v-container class="my-5">
        <v-card v-for="task in tasks" :key ="task.title">
            <v-row row wrap class="pa-3" >
                <v-col cols="8" md="4">
                    <div class="caption grey--text">Project Title</div>
                    <div>{{ task.title }}</div>
                </v-col>
                <v-col cols="6" sm="4" md="2">
                    <div class="caption grey--text">Person</div>
                    <div>{{ project.description }}</div>
                </v-col>
            </v-row>
        </v-card>
        
    </v-container>

 </div>

    
</template>
<script>
import axios from 'axios';
import TasksServices from '../services/TasksService'

import Layout from '../components/Layout'
export default {
    name:'Dashboard',
    components: {
        Layout
    },
    data() {
        return{
            drawer: false,
            tasks: []
        }
    },
    mounted () {
        this.getTasks()
    },
    methods: {
        async getTasks() {
            const response = await TasksServices.fetchTasks();
            this.tasks = response.data.tasks
        },
    

    
        getUser() {
            axios.get({ Authorization:localStorage.getItem('SavedToken') })
                .then(response => console.log(response))
                .catch(error => console.log(error));
        },
   
        created() {
        this.getUser();
        }
    }
}
</script>