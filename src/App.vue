<template>
    <demo/>
</template>

<script>
import Demo from './components/Demo'

export default {
    name: 'App',
    components: {
        [Demo.name]: Demo
    }
}
</script>

<style>
html,
body {
    height: 100%;
    width: 100%;
}

html {
    overflow: hidden;
}

body {
    margin: 0;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    width: 100%;
}
</style>
