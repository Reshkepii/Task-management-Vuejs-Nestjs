<template>
    <Layout />
    
</template>
<script>
// import axios from 'axios';

import Layout from '../components/Layout.vue'
export default {
    name:'Dashboard',
    components: {
        Layout
    },

    data() {
        return{
            drawer: false,
        }
    },

//     methods: {
//         getUser() {
//             axios.get('http://localhost:3000/user/',{ headers: { Authorization:localStorage.getItem('SavedToken') }})
//                 .then(response => console.log(response))
//                 .catch(error => console.log(error));
//         }
//     },
//     created() {
//     this.getUser();
//   }
}
</script>