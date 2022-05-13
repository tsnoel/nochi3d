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
        // this.addTouchListeners();
    },
    methods: {
        addKeyListeners() {
            document.addEventListener ('keydown', (e) => {
                // if (e.keyCode == 87) { this.keys.w = true; }
                // if (e.keyCode == 65) { this.keys.a = true; }
                // if (e.keyCode == 83) { this.keys.s = true; }
                // if (e.keyCode == 68) { this.keys.d = true; }
                if (e.keyCode == 32) { this.keys.space = true; }
                if (e.keyCode == 16) { this.keys.shift = true; }
            });

            document.addEventListener ('keyup', (e) => {
                // if (e.keyCode == 87) { this.keys.w = false; }
                // if (e.keyCode == 65) { this.keys.a = false; }
                // if (e.keyCode == 83) { this.keys.s = false; }
                // if (e.keyCode == 68) { this.keys.d = false; }
                if (e.keyCode == 32) { this.keys.space = false; }
                if (e.keyCode == 16) { this.keys.shift = false; }
            });
        },
        addTouchListeners() {
            document.addEventListener('touchstart', (e) => {
                /*
                const theTouch = e.changedTouches[0];
                const mouseEvent = document.createEvent('MouseEvent');

                mouseEvent.initMouseEvent(
                    'mousestart',
                    true, true, window, 1,
                    theTouch.screenX, theTouch.screenY,
                    theTouch.clientX, theTouch.clientY,
                    false, false, false, false, 0, null
                );

                theTouch.target.dispatchEvent(mouseEvent);

                e.preventDefault();
                */
                this.keys.space = true;
            });

            document.addEventListener('touchend', (e) => {
                this.keys.space = false;
            });

            /*
            document.addEventListener('touchmove', (e) => {
                e.preventDefault();

                const theTouch = e.changedTouches[0];
                const mouseEvent = document.createEvent('MouseEvent');

                mouseEvent.initMouseEvent(
                    'mousemove',
                    true, true, window, 1,
                    theTouch.screenX, theTouch.screenY,
                    theTouch.clientX, theTouch.clientY,
                    false, false, false, false, 0, null
                );

                theTouch.target.dispatchEvent(mouseEvent);
            });
            */
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
