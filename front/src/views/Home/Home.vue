<template>
    <div class="home">
        <div v-if="!budget">
            <div class="col-12 no-income">
                <input name="income"
                       type="number"
                       placeholder="What is you budget?"
                       class="form-control animated bounce fast income-setter"
                       @keyup.enter="applyBudget"
                       v-model="tempBudget"/>

                <span class="d-block d-sm-none small-device-submit">
                    <button type="button"
                            class="btn btn-success"
                            @click="applyBudget">
                        <i class="fal fa-sign-in-alt"></i> Start build your budget!
                    </button>
                </span>

                <p class="lead"> Or
                    <router-link to="authenticate">authenticate</router-link>
                    for a better experience
                </p>
            </div>
        </div>

        <div v-if="budget">
            <div class="row upper">
                <div class="col-4 col-md-6 text-left animated fadeInLeft fast">
                    <input name="income"
                           type="number"
                           placeholder="Income"
                           v-model="budget"
                           class="form-control income-setter d-inline"/>

                    <a class="btn btn-info d-inline text-white"
                       @click="setCurrentIncomeAsDefault"
                       v-html="setCurrentIncomeText"
                       v-if="getShowAwesomeButtons() !== ''"></a>
                </div>
                <div class="col-8 col-md-6 text-right animated fadeInRight fast">
                    Balance: <span v-bind:class="this.balanceClass">{{this.balance}}</span>
                    Total: <span>{{this.total}}</span>
                </div>
            </div>

            <div class="row blocks">
                <div class="block col-md-5 col-12 animated fadeInDown fast" v-for="(block, blockIndex) in blocks">

                    <div class="block-header">
                        <div class="title">
                            <input type="text" placeholder="Enter title here" v-model="block.title"
                                   class="form-control title"/>

                            <div class="dropdown">
                                <a @click="removeExpenseBlock(blockIndex)" title="Remove item"><i class="far fa-trash text-danger"></i></a>
                                <a @click="addBlock" title="Add another block"><i class="far fa-layer-plus text-success"></i></a>
                            </div>
                        </div>
                    </div>

                    <div class="expenses" v-for="(item, itemIndex) in block.items">
                        <div class="expense row">
                            <div class="title col-6">
                                <input type="text"
                                       placeholder="Title"
                                       class="form-control"
                                       v-model="item.title"/>
                            </div>
                            <div class="value col-6">
                                <input type="number"
                                       placeholder="Value"
                                       class="form-control"
                                       v-model="item.value"
                                       v-on:keyup="calculateBalance"/>
                            </div>
                            <div class="remove" v-if="block.items.length-1 !== itemIndex">
                                <a @click="removeExpenseItem(blockIndex, itemIndex)"><i class="far fa-trash text-danger"></i></a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="actions row animated slideInLeft fast d-none d-md-block">
                <div class="col-md-4 d-inline-block text-left">
                    <button type="button"
                            class="btn btn-primary"
                            v-on:click="addBlock">
                        <i class="fal fa-layer-plus"></i> Add another section
                    </button>
                    <router-link to="authenticate" class="btn btn-success" v-if="getShowAwesomeButtons() === ''">
                        <i class="fal fa-sign-in-alt"></i> Login and save
                    </router-link>
                    <a class="btn btn-danger text-white" @click="logout" v-if="getShowAwesomeButtons() !== ''"><i class="fal fa-sign-out-alt"></i> Logout</a>
                    <router-link to="dashboard" class="btn btn-success" v-if="getShowAwesomeButtons() !== ''">
                        <i class="fal fa-chart-line"></i> Dashboard
                    </router-link>
                </div>

                <div class="col-md-8 text-right d-inline-block" v-if="getShowAwesomeButtons() !== ''">
                    <a class="btn btn-info d-inline text-white"
                       @click="setCurrentBudgetAsDefault"
                       v-html="setCurrentBudgetText"></a>

                    <a class="btn btn-danger d-inline text-white"
                       @click="removeCurrentBudget"
                       v-if="getShowDelete() !== null"
                       v-html="removeCurrentBudgetText"></a>

                </div>
            </div>

            <div class="actions d-block d-sm-none">
                <div class="col-12">
                    <button type="button"
                            class="btn btn-primary"
                            v-on:click="addBlock">
                        <i class="fal fa-layer-plus"></i> Add another section
                    </button>
                </div>

                <div class="col-12">
                    <router-link to="authenticate" class="btn btn-success" v-if="getShowAwesomeButtons() === ''">
                        <i class="fal fa-sign-in-alt"></i> Login and save
                    </router-link>
                </div>

                <div class="col-12">
                    <a class="btn btn-danger text-white" @click="logout" v-if="getShowAwesomeButtons() !== ''"><i class="fal fa-sign-out-alt"></i> Logout</a>
                    <router-link to="dashboard" class="btn btn-success" v-if="getShowAwesomeButtons() !== ''">
                        <i class="fal fa-chart-line"></i> Dashboard
                    </router-link>
                </div>

                <div class="col-12" v-if="getShowAwesomeButtons() !== ''">
                    <a class="btn btn-info text-white"
                       @click="setCurrentBudgetAsDefault"
                       v-html="setCurrentBudgetText"></a>

                    <a class="btn btn-danger text-white"
                       @click="removeCurrentBudget"
                       v-if="getShowDelete() !== null"
                       v-html="removeCurrentBudgetText"></a>

                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">

    .home {

        .no-income {

            .income-setter {
                margin: 0 auto;
            }

            .lead {
                margin-top: 1em;
            }
        }

        .income-setter {
            width: 25%;
            border: none;
            border-bottom: solid 1px $blue1;
            border-radius: 0;
            background: $background;
            margin-right: 1em;
        }

        .blocks {
            text-align: center;

            .block {
                height: fit-content;
                margin: 1em auto;
                padding: 0;
                border: solid 1px $blue1;
                background: $white2;
                border-bottom: none;

                input {
                    margin: 0;
                    border-radius: 0;
                    border: none;
                    border-bottom: 1px solid $blue1;

                    &.title {
                        text-align: center;
                        border-bottom: solid 1px $blue2;
                        color: $blue3;
                    }
                }

                .dropdown {
                    position: absolute;
                    z-index: 1;
                    right: 5px;
                    top: 5px;

                    a {
                        padding: 0 0.5em;
                    }
                }

                .expense {
                    position: relative;

                    .title {
                        padding-right: 0;
                        border-right: $blue1 solid 1px;
                    }

                    .value {
                        padding-left: 0;
                    }

                    .remove {
                        position: absolute;
                        right: 1.75em;
                        top: 0.5em;
                    }

                    border-bottom: none;
                }
            }

            .budget-actions {
                margin: 1em auto 0;

                a {
                    margin-right: 0.5em;
                }
            }
        }

        .actions {

            margin-top: 1em;

            .btn {
                margin-right: .5em;
            }
        }
    }

    @media only screen and (max-width: 700px) {
        .home {

            .upper .text-right {
                padding-top: 10px;
            }

            .small-device-submit {
                padding-top: 1em;

                button {
                    width: 100%
                }
            }

            .income-setter {
                width: 100%;

            }
            .actions {
                button, a {
                    margin-top: .5em;
                    width: 100%;
                }
            }
        }
    }

</style>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import Block from './Block';
import Item from './Item';

@Component({})

export default class Home extends Vue {

    private budget: any = 0;
    private tempBudget: any = null;
    private total: number = 0;
    private balance: number = 0;
    private balanceClass: string = 'text-primary';
    private setCurrentIncomeText = '<i class="fal fa-wallet"></i> Save as default income';
    private setCurrentBudgetText = '<i class="fal fa-file-spreadsheet"></i> Save as default budget';
    private removeCurrentBudgetText = '<i class="fal fa-times"></i> Remove the default budget';
    private blocks = [
        new Block(),
    ];

    public data() {
        let budget = 0;
        let blocks = [new Block()];

        if (this.$store.state.income.DefaultIncome !== null) {
            // Getting the income from the state.
            budget = this.$store.state.income.DefaultIncome;
        }

        if (this.$store.state.budget.BudgetTemplate !== null) {
            if (this.getBudgetTemplate().length !== 0) {
                blocks = this.getBudgetTemplate();
            }
        }

        return {
            budget,
            blocks,
        };
    }

    public getBudgetTemplate() {
        return this.$store.state.budget.BudgetTemplate;
    }

    public getShowDelete() {
        return window.localStorage.getItem('budgetTemplate');
    }

    /**
     * Saving the current income as the default income.
     */
    public setCurrentIncomeAsDefault() {
        this.setCurrentIncomeText = '<i class="fal fa-spin fa-spinner-third"></i> Saving';
        this.$store.commit('saveIncome', this.budget);
        this.$store.dispatch('sync');

        this.setCurrentIncomeText = '<i class="fal fa-check"></i> Done';
        const self = this;

        setTimeout(() => {
            self.setCurrentIncomeText = '<i class="fal fa-wallet"></i> Save as default income';
        }, 3000);
    }

    public applyBudget() {
        this.$store.commit('setTempIncome', this.tempBudget);
        this.budget = this.tempBudget;
    }

    public addItem(items: any) {
        items.push(new Item());
    }

    public addBlock() {
        this.blocks.push(new Block());
    }

    public calculateBalance() {
        this.balance = 0;
        this.total = 0;

        this.blocks.forEach((block) => {
            block.items.forEach((item) => {
                this.total = this.total + parseInt('' + item.value, 10);
            });
        });

        this.processBalance();
    }

    public removeExpenseItem(blockIndex: number, itemIndex: number) {
        this.$store.commit('removeItem', {block: blockIndex, item: itemIndex});
    }

    public removeExpenseBlock(blockIndex: number) {
        this.$store.commit('removeBlock', blockIndex);
        this.blocks = this.getBudgetTemplate();
    }

    public processBalance() {

        this.balance = this.budget - this.total;

        if (this.balance <= 0) {
            this.balanceClass = 'text-danger';
            return;
        }

        this.balanceClass = 'text-success';
    }

    @Watch('blocks', {immediate: true, deep: true})
    public onBlocksChanged(val: string, oldVal: string) {
        this.$store.commit('setBudgetTemplate', val);

        // Go over the blocks an empty one.
        if (oldVal !== undefined) {

            // This is not the init of the blocks and the
            this.leaveEmptyItem();
        }

        // Calculating the balance.
        this.calculateBalance();
    }

    @Watch('budget')
    public onBudgetChanged(val: any) {
        this.calculateBalance();
        this.$store.commit('setTempIncome', val);
    }

    public leaveEmptyItem() {
        this.blocks.forEach((block) => {
            // Get the last item.
            const lastItem = block.items[block.items.length - 1];

            if (lastItem.title !== '' || lastItem.value !== 0) {
                // The last item has a title or a value. Append a new one in the bottom of the block.
                this.addItem(block.items);
            }

        });
    }

    public setCurrentBudgetAsDefault() {
        this.setCurrentBudgetText = '<i class="fal fa-spin fa-spinner-third"></i> Saving';
        this.$store.commit('saveBudgetForNextTime', this.blocks);

        this.setCurrentBudgetText = '<i class="fal fa-check"></i> Done';
        const self = this;

        setTimeout(() => {
            self.setCurrentBudgetText = '<i class="fal fa-file-spreadsheet"></i> Save as default budget';
        }, 3000);
    }

    public removeCurrentBudget() {
        this.removeCurrentBudgetText = '';
        this.$store.commit('clearBudgetTemplate', this.blocks);
        this.removeCurrentBudgetText = '<i class="fal fa-times"></i> Remove the default budget';
    }

    public getShowAwesomeButtons() {
        return this.$store.state.auth.AccessToken;
    }

    public logout() {
        this.$store.dispatch('logout');
        window.location.reload();
    }
}
</script>
