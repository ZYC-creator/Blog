
<template>
    <div>
        <h1>{{msg}}</h1>
    </div>
</template>
 
<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios'
    export default defineComponent({
        name:'LoginComponent',
        setup(){
            let msg ='';
            axios.get("http://localhost:8080/login")
            .then((res) => {
                msg = res.data;
                console.log(msg);
                
            })
            .catch((err) => {
                console.log(err);
            });
            return {
                msg
            }
    },
    })
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
    font-weight: normal;
}
</style>
