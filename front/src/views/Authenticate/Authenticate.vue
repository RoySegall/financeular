<template>
    <div class="login">
        <div class="login-icon">
            <i v-bind:class="loginIcon"></i>
        </div>

        <div class="row context-switching">
            <div class="col-md-6 sign-in"><a @click="contextSwitch('sign-in')"
                                             v-bind:class="{'active': this.context === 'sign-in'}">Sign in</a></div>
            <div class="col-md-6 sign-up"><a @click="contextSwitch('sign-up')"
                                             v-bind:class="{'active': this.context === 'sign-up'}">Sign up</a></div>
        </div>

        <div class="login-input">
            <div class="col-auto">
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text"><i class="fal fa-pen"></i></div>
                    </div>
                    <input type="text" class="form-control" v-model="user.name" placeholder="Username">
                </div>
            </div>

            <div class="col-auto">
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text"><i class="fal fa-unlock"></i></div>
                    </div>
                    <input type="password" class="form-control" placeholder="Password" v-model="user.pass">
                </div>
            </div>


            <div class="sign-up" v-if="context === 'sign-up'">
                <div class="col-auto">
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text"><i class="fal fa-unlock"></i></div>
                        </div>
                        <input type="password" class="form-control" placeholder="Password(again)"
                               v-model="user.passAgain">
                    </div>
                </div>

                <div class="col-auto">
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text"><i class="fal fa-envelope"></i></div>
                        </div>
                        <input type="email" class="form-control" placeholder="Email" v-model="user.email">
                    </div>
                </div>

                <div class="col-auto">
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text"><i class="fal fa-envelope"></i></div>
                        </div>
                        <input type="email" class="form-control" placeholder="Email(again)" v-model="user.emailAgain">
                    </div>
                </div>
            </div>

            <button class="btn btn-primary" @click="submitForm()">{{this.submitButtonText}}</button>

            <hr/>

            <a class="login-button facebook"><i class="fab fa-facebook-f"></i> Login using Facebook</a>
            <a class="login-button google"><i class="fab fa-google"></i> Login using Google</a>
        </div>
    </div>
</template>


<style lang="scss">

    .login {
        color: black;
        background: white;
        position: absolute;
        width: 50%;
        margin: 0 auto;
        padding: 1em;
        top: calc(25vh);
        left: calc(35vh);
        border-radius: .5em;

        .context-switching {
            padding-bottom: 1em;

            a {
                text-transform: uppercase;

                &:hover {
                    font-weight: bold;
                    cursor: pointer;
                    color: $blue2;
                }
            }

            .active {
                font-weight: bold;
                padding-bottom: 1px;
                color: $blue1;
            }
        }

        .input-group-text {
            width: 2.5em;
        }

        .login-button {
            padding: 10px;
            border: none;
            border-radius: 4px;
            margin: 5px;
            opacity: 0.85;
            display: inline-block;
            font-size: 17px;
            line-height: 20px;
            text-decoration: none;
            color: white !important;

            &:hover {
                opacity: 1;
                color: white;
            }

            &.facebook {
                background-color: #3B5998;
                color: white;
            }

            &.google {
                background-color: #dd4b39;
                color: white;
            }
        }

        .title {
            font-weight: bold;
        }

        .login-icon {
            background: white;
            font-size: 4em;
            position: absolute;
            top: -1.5em;
            left: 42%;
            border-radius: .5em .5em 0 0;
            width: 2em;
        }

        .login-input {

            button {
                font-weight: bold;
            }
        }
    }
</style>


<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({})

    export default class Authenticate extends Vue {

        public texts = {
            'sign-in': 'Sign in',
            'sign-up': 'Sign up',
        };

        public icons = {
            'sign-in': 'fal fa-sign-in-alt text-primary',
            'sign-up': 'fal fa-user-edit text-primary',
        };

        public context = 'sign-in';
        public submitButtonText = this.texts[this.context];
        public loginIcon = 'fal fa-sign-in-alt text-primary';
        public errors = [];
        public success = '';
        public user = {
            name: '',
            pass: '',
            passAgain: '',
            email: '',
            emailAgain: '',
        };

        public data() {
            return {
                errors: [],
                wait: false,
            };
        }

        public contextSwitch(context) {
            this.context = context;

            this.submitButtonText = this.texts[context];
            this.loginIcon = this.icons[context];
        }

        public submitForm() {
            const self = this;
            self.errors = [];

            if (this.user.pass !== '' && this.user.name !== '') {
                this.errors = [];
                self.loginIcon = 'fal fa-spinner-third fa-spin';

            } else {
                if (this.user.name === '') {
                    this.errors.push('Please fill in the username');
                }
                if (this.user.pass === '') {
                    this.errors.push('Please fill in the password');
                }
            }
        }

    }
</script>
