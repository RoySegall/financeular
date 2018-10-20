<template>
    <div class="setting">
        <form>
            <div class="form-group">
                <label for="exampleInputEmail1">Add new expenses</label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                       placeholder="">
            </div>
            <button type="submit" class="btn btn-primary"><i class="fal fa-save"></i> Submit</button>
        </form>

        <hr/>

        <table class="table table-striped">
            <thead>
            <tr>
                <th scope="col">Income</th>
                <th scope="col">Valid since</th>
                <th scope="col">Work place</th>
                <th scope="col">Options</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>15,000</td>
                <td>June 2018</td>
                <td>Coffe des chat</td>
                <td>Set as default | Remove</td>
            </tr>
            <tr>
                <td>6,000</td>
                <td>June 2010 - May 2011</td>
                <td>Pizza la tom</td>
                <td>Set as default | Remove</td>
            </tr>
            </tbody>
        </table>    </div>
</template>

<style lang="scss">

</style>

<script language="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({})
    export default class ExpensesSettings extends Vue {
    }
</script>