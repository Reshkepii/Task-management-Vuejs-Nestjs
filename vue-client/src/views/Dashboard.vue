<template>
    <Layout />
    
</template>
<script>
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
    }
}
</script>