<template>
    <metainfo>
        <template v-slot:title="{ content }">{{
            content ? `EduPass | ${content}` : `EDUPASS`
        }}</template>
    </metainfo>
    <router-view />
</template>

<script>

export default {
    name: 'App',
    components: {},
};
</script>

<style>
@import './css/style.css';
@import url('https://fonts.googleapis.com/css2?family=Inter:slnt,wght@-10..0,100..900&display=swap');
@import './css/tailwind.css';
@import url('vue-multiselect/dist/vue-multiselect.css');

html,
body {
    scroll-behavior: smooth;
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
    /* font-smoothing: antialiased; */
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
}
</style>
