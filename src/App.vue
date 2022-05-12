<template>
    <router-view :keys="keys"/>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            keys: {}
        };
    },
    beforeMount() {
        this.addKeyListeners();
    },
    methods: {
        addKeyListeners() {
            document.addEventListener ('keydown', (e) => {
                if (e.keyCode == 87) { this.keys.w = true; }
                if (e.keyCode == 65) { this.keys.a = true; }
                if (e.keyCode == 83) { this.keys.s = true; }
                if (e.keyCode == 68) { this.keys.d = true; }
                if (e.keyCode == 32) { this.keys.space = true; }
                if (e.keyCode == 16) { this.keys.shift = true; }
            });

            document.addEventListener ('keyup', (e) => {
                if (e.keyCode == 87) { this.keys.w = false; }
                if (e.keyCode == 65) { this.keys.a = false; }
                if (e.keyCode == 83) { this.keys.s = false; }
                if (e.keyCode == 68) { this.keys.d = false; }
                if (e.keyCode == 32) { this.keys.space = false; }
                if (e.keyCode == 16) { this.keys.shift = false; }
            });
        }
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
