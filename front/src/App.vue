<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style lang="scss">


    body {
        background-color: $background;
        font-size: 16px;
    }

    #app {
        padding: 0.5em;
        font-family: 'Rubik', sans-serif, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: $color4;
        width: 75vw;
        margin: 1em auto;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }

    .results {
        font-weight: bold;
        width: 50%;
        text-align: center;
        margin: 10px auto;
        padding: 10px;

        ul {
            padding: 0;
            margin: 0;

            li {
                list-style-type: none
            }
        }
    }
</style>
