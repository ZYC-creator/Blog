<template>
    <h1>{{username}}</h1>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { useRoute } from 'vue-router';
    export default defineComponent({
        name:'HomePageComponent',
        setup(){
            const $route = useRoute()
            const username = $route.params.username
            return {
                username,
            }
        }
    })
</script>