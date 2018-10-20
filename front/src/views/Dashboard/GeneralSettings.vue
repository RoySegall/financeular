<template>
    <div class="setting">
        <form>

            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>

            <div class="form-group">
                <label for="exampleInputEmail1">First name</label>
                <input type="text" class="form-control" >
            </div>

            <div class="form-group">
                <label for="exampleInputEmail1">Last name</label>
                <input type="text" class="form-control" >
            </div>

            <button type="submit" class="btn btn-primary"><i class="fal fa-save"></i> Submit</button>
        </form>
    </div>
</template>

<style lang="scss">

</style>

<script language="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({})
    export default class GeneralSettings extends Vue {
    }
</script>
