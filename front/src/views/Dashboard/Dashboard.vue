<template>
    <div>
        <h1 class="text-left">Dashboard</h1>

        <hr/>

        <div class="row">
            <div class="col-md-8">Graph</div>
            <div class="col-md-4">Tools</div>
        </div>

        <div class="row">
            <div class="col-md-12 text-center">Tools</div>

            <div class="col-md-4"><a class="btn btn-success text-white">Look for loans</a></div>
            <div class="col-md-4"><a class="btn btn-success text-white">Talk with an expert</a></div>
            <div class="col-md-4"><a class="btn btn-info text-white">More tools</a></div>
            <div class="col-md-4"><a class="btn btn-success text-white">View out market place for more sutff</a></div>
        </div>
    </div>

</template>

<style lang="scss">

</style>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({})

    export default class Dashboard extends Vue {

    }

</script>
