<template>
    <div>
        <h1 class="text-left">Dashboard</h1>

        <hr/>

        <div class="row settings-wrapper">
            <div class="menu col-md-2">
                <ul>
                    <li v-for="(menu, key) in menu_items" v-bind:class="{selected: active === key, first: key === 'general', last: key === 'expenses'}" v-html="menu" @click="changeActiveMenu(key)"></li>
                    <li><router-link to="/"><i class="fal fa-hand-point-left"></i> Go back</router-link></li>
                </ul>
            </div>

            <div class="page col-md-10">
                <GeneralSettings v-if="active === 'general' "></GeneralSettings>
                <RecurringSettings v-if="active === 'payments' "></RecurringSettings>
                <IncomeSettings v-if="active === 'incomes' "></IncomeSettings>
                <ExpensesSettings v-if="active === 'expenses' "></ExpensesSettings>
            </div>
        </div>
    </div>

</template>

<style lang="scss">

    .settings-wrapper {
        margin: 0;
        border: $blue1 solid 1px;
        min-height: 75vh;

        .page {
            padding: 1em;
            background: $background-blue;
            text-align: left;

            .setting {
                background: white;
                padding: 1em;
                height: 100%;
                border: $blue1 solid 1px;
            }
        }

        .menu {
            padding: 0;
            margin: 0;
            background: white;
            text-align: left;

            ul {
                margin: 0;
                padding: 0;

                li {
                    list-style-type: none;
                    font-size: 1.25em;
                    padding: .5em 1em;

                    &:hover {
                        cursor: pointer;
                        color: $blue7;
                    }

                    &.selected {
                        background: $background-blue;
                        color: $blue6;
                    }

                    &.first {
                        border-top: none;
                    }

                }
            }
        }
    }

</style>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import GeneralSettings from './GeneralSettings.vue';
    import RecurringSettings from './RecurringSettings.vue';
    import IncomeSettings from './IncomeSettings.vue';
    import ExpensesSettings from './ExpensesSettings.vue';

    @Component({
        components : { GeneralSettings, RecurringSettings, IncomeSettings, ExpensesSettings }
    })

    export default class Dashboard extends Vue {

        private menu_items: object;
        private active: string = 'general';

        public data() {
            return {
                menu_items: {
                    general: '<i class="fal fa-cog"></i> General settings',
                    payments: '<i class="fal fa-recycle"></i> Recurring payments',
                    incomes: '<i class="fal fa-credit-card"></i> Manage incomes',
                    expenses: '<i class="fal fa-hands-usd"></i> Default expenses',
                },
                active: 'general',
            };
        }

        public changeActiveMenu(key) {
            this.active = key;
        }
    }

</script>
