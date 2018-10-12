<template>
    <div class="home">
        <div v-if="!budget">
            <div class="col-12 no-income">
                <input name="income" type="number" placeholder="What is you budget?"
                       class="form-control animated bounce fast income-setter" @keyup.enter="applyBudget"
                       v-model="tempBudget"/>
            </div>
        </div>

        <div v-if="budget">
            <div class="row upper">
                <div class="col-6 text-left animated fadeInLeft fast">
                    <input name="income" type="number" placeholder="Income" v-model="budget"
                           class="form-control income-setter"/>
                </div>
                <div class="col-6 text-right animated fadeInRight fast">
                    Balance: <span v-bind:class="this.balanceClass">{{this.balance}}</span>
                    Total: <span>{{this.total}}</span>
                </div>
            </div>

            <div class="row blocks">
                <div class="block col-5 animated fadeInDown fast" v-for="block in blocks">

                    <div class="block-header">
                        <div class="title">
                            <input type="text" placeholder="Enter title here" v-model="block.title" class="form-control title" />

                            <div class="dropdown">
                                <!--<button >-->
                                    <!--<i class="fal fa-bars"></i>-->
                                <!--</button>-->

                                <span id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fal fa-bars"></i></span>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                    <button class="dropdown-item" type="button" v-on:click="addBlock"><i class="fal fa-layer-plus"></i> Add another section</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="expenses" v-for="item in block.items">
                        <div class="expense row" @click.once="addItem(block.items)">
                            <div class="title col-md-6"><input type="text" placeholder="Title" class="form-control"
                                                               v-model="item.title"/></div>
                            <div class="value col-md-6"><input type="number" placeholder="Value" class="form-control"
                                                               v-model="item.value" v-on:keyup="calculateBalance"/></div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="actions row animated slideInLeft fast">
                <div class="col-8 text-left">
                    <button type="button" class="btn btn-primary" v-on:click="addBlock"><i class="fal fa-layer-plus"></i> Add another section</button>
                    <button type="button" class="btn btn-success"><i class="fal fa-sign-in-alt"></i> Login and save</button>
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
        }

        .income-setter {
            width: 25%;
            border: solid 1px $blue1;
            border-radius: 0;
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
                }

                .expense {

                    .title {
                        padding-right: 0;
                        border-right: $blue1 solid 1px;
                    }

                    .value {
                        padding-left: 0;
                    }

                    border-bottom: none;
                }
            }
        }

        .actions {

            button {
                margin-right: .5em;
            }
        }
    }
</style>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Block from './Block';
    import Items from "./Items";

    @Component({})

    export default class Home extends Vue {

        private budget: any = 0;
        private tempBudget: any = null;
        private total: number = 0;
        private balance: number = 0;
        private balanceClass: string = 'text-primary';

        private blocks = [
            new Block(),
        ];

        public applyBudget() {
            this.budget = this.tempBudget;
        }

        public addItem(items: any) {
            items.push(new Items());
        }

        public addBlock() {
            this.blocks.push(new Block());
        }

        public calculateBalance() {
            this.balance = 0;
            this.total = 0;

            this.blocks.forEach((block) => {
                block.items.forEach((item) => {
                    if (typeof item.value != 'number') {
                        item.value = 0;
                    }
                    this.total += parseInt(item.value);
                });
            });

            this.processBalance();
        }

        public processBalance() {

            this.balance = this.budget - this.total;

            if (this.balance <= 0) {
                this.balanceClass = 'text-danger';
                return;
            }

            this.balanceClass = 'text-success';
        }
    }
</script>
