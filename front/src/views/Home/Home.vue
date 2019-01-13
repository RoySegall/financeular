<template>
    <div class="home">
        <div v-if="getConsiderAnonymous()">
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

        <div v-if="!getConsiderAnonymous()">
            <div class="row upper">
                <div class="col-4 col-md-6 text-left animated fadeInLeft fast">
                    <input name="income"
                           type="number"
                           placeholder="Income"
                           v-model="budget"
                           class="form-control income-setter d-inline"/>
                </div>
                <div class="col-8 col-md-6 text-right animated fadeInRight fast">

                    <a class="btn btn-info d-inline text-white"
                       v-if="getShowAwesomeButtons()" @click="syncToServer()">
                        <i class="fal fa-cloud-upload"></i> Sync
                    </a>


                    <a class="btn d-inline text-white" v-bind:class="this.balanceClass"
                       v-if="getShowAwesomeButtons() !== ''">
                        <i v-bind:class="{
                        'fal fa-balance-scale-right': this.balance < 0,
                        'fal fa-balance-scale': this.balance === 0,
                        'fal fa-balance-scale-left': this.balance > 0,
                        }"></i> {{this.balance}}
                    </a>

                    <a class="btn btn-primary d-inline text-white"
                       v-if="getShowAwesomeButtons() !== ''">
                        <i class="fal fa-calculator"></i> {{this.total}}
                    </a>
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
                <div class="col-md-12 d-inline-block text-left">
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
            </div>
        </div>
    </div>
</template>

<style lang="scss">

    .home {

        .upper {
            .btn {
                margin-left: 0.25em;
                cursor: default;
            }
        }

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
            border-bottom: solid 1px $color5;
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
                border: solid 1px $color1;
                background: $white2;
                border-bottom: none;

                input {
                    margin: 0;
                    border-radius: 0;
                    border: none;
                    border-bottom: 1px solid $color1;

                    &.title {
                        text-align: center;
                        border-bottom: solid 1px $color2;
                        color: $color3;
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
                        border-right: $color1 solid 1px;
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
    private balanceClass: string = 'btn-primary';

    private blocks = [
        new Block(),
    ];

    public data() {
        let budget = 0;
        let blocks = [new Block()];

        if (this.$store.state.income.DefaultIncome !== null) {
            // Getting the income from the state.
            budget = this.getIncome();
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

    /**
     * Checking if the user is anonymous.
     */
    public getConsiderAnonymous() {
        if (this.$store.state.auth.AccessToken) {
            return false;
        }

        if (this.$store.state.income.DefaultIncome) {
            return true;
        }

        if (!this.$store.state.income.TempIncome) {
            return true;
        }

        return false;
    }

    /**
     * Getting the access token from the store.
     */
    public getAccessToken() {
        return this.$store.state.auth.AccessToken;
    }

    /**
     * Get the income from the store.
     */
    public getIncome() {
        return this.$store.state.income.DefaultIncome;
    }

    /**
     * Get the budget template from the store.
     */
    public getBudgetTemplate() {
        return this.$store.state.budget.BudgetTemplate;
    }

    /**
     * Saving the temp budget as the current budget.
     */
    public applyBudget() {
        this.$store.commit('setTempIncome', this.tempBudget);
        this.$store.commit('setSyncWhenLogin', true);

        this.budget = this.tempBudget;
    }

    /**
     * Add a block.
     */
    public addBlock() {
        this.blocks.push(new Block());
    }

    /**
     * Iterate over all the items and calculating the blance.
     */
    public calculateBalance() {
        this.balance = 0;
        this.total = 0;

        this.blocks.forEach((block) => {
            block.items.forEach((item) => {
                this.total = this.total + parseInt('' + item.value, 10);
            });
        });

        this.calculateProcessBalanceClass();
    }

    /**
     * Remove an expense item from the blocks.
     *
     * @param blockIndex
     *  The index of the blocks.
     * @param itemIndex
     *  The index of the item.
     */
    public removeExpenseItem(blockIndex: number, itemIndex: number) {
        this.$store.commit('removeItem', {block: blockIndex, item: itemIndex});
    }

    /**
     * Remove a complete expense block.
     *
     * @param blockIndex
     *  The block index in the block arrays.
     */
    public removeExpenseBlock(blockIndex: number) {
        this.$store.commit('removeBlock', blockIndex);
        this.blocks = this.getBudgetTemplate();
    }

    /**
     * Calculating the class of the balance item in the upper row.
     */
    public calculateProcessBalanceClass() {

        this.balance = this.budget - this.total;

        if (this.balance === 0) {
            this.balanceClass = 'btn-info';
            return;
        }

        if (this.balance <= 0) {
            this.balanceClass = 'btn-danger';
            return;
        }

        this.balanceClass = 'btn-success';
    }

    /**
     * For every change in the blocks we need to see which item need to be
     * removed and calculate the balance.
     *
     * @param val
     *  The new value.
     * @param oldVal
     *  The original value.
     */
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

    /**
     * On temp income change - set the tempincome of the store.
     */
    @Watch('budget')
    public onBudgetChanged(val: any) {
        this.calculateBalance();
        this.$store.commit('setTempIncome', val);
    }

    /**
     * Go over a block item and remove what we don't need.
     */
    public leaveEmptyItem() {
        this.blocks.forEach((block) => {
            // Get the last item.
            const lastItem = block.items[block.items.length - 1];

            if (lastItem.title !== '' || lastItem.value !== 0) {
                // The last item has a title or a value. Append a new one in the bottom of the block.
                block.items.push(new Item());
            }
        });
    }

    /**
     * Check if we need to show the awesome buttons.
     *
     * todo: check if we can use consider as anonymous.
     */
    public getShowAwesomeButtons() {
        return this.$store.state.auth.AccessToken;
    }

    /**
     * Logging out the user.
     */
    public logout() {
        this.$store.dispatch('logout');
        window.location.reload();
    }

    /**
     * Syncing the data to the server.
     */
    public syncToServer() {
        this.$store.dispatch('sync');
    }

}
</script>
