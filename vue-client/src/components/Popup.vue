<template>
    <v-row justify="center">
        <v-dialog max-width="600" v-model="dialog">
            <template v-slot:activator="{ on }">
                <v-btn  v-on="on" class="white--text success">Krijo Task</v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <h2>Regjistro nje Task</h2>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" >
                        <v-text-field label="title" prepend-icon="mdi-folder" ></v-text-field>
                        <v-textarea label="Description" prepend-icon="mdi-pencil" ></v-textarea>
                        <v-btn class="success mx-0 mt-3" @click="addTasks">Krijo Task</v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import TasksService from '../services/TasksService'
export default {
    data() {
        return {
            title:'',
            description:'',
            dialog:false,
        }
    },
    methods: {
        async addTasks() {
                await TasksService.addTasks({
                    title: this.title,
                    description : this.description
                })
            this.$router.push("/").catch(()=>{});
            // this.$router.push({ name: 'Dashboard' })
        },
    }
        
    
}
</script>