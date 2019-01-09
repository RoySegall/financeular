<template>
    <form class="login" @submit="submitForm" novalidate>
        <div class="login-icon">
            <i v-bind:class="loginIcon"></i>
        </div>

        <div class="row context-switching">
            <div v-if="!validate" class="col-md-6 sign-in" v-bind:class="{'active': this.context === 'sign-in'}"><a
                    @click="contextSwitch('sign-in')"
            >Sign in</a></div>
            <div v-if="!validate" class="col-md-6 sign-up" v-bind:class="{'active': this.context === 'sign-up'}"><a
                    @click="contextSwitch('sign-up')"
            >Sign up</a></div>

            <div v-if="validate" class="col-md-12 sign-up active">Validating</div>
        </div>

        <div v-if="errors.length !== 0" class="results bg-danger text-white">
            <ul>
                <li v-for="error in errors">{{error}}</li>
            </ul>
        </div>

        <div v-if="successMessage !== ''" class="results bg-success text-white">
            {{successMessage}}
        </div>

        <div v-if="validate">
            {{validateText}}
        </div>

        <div class="login-input" v-if="!validate">
            <div class="col-auto">
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text"><i class="fal fa-pen"></i></div>
                    </div>
                    <input type="text" class="form-control" v-bind:class="{'is-invalid': this.touchedInputs['username']}"
                           v-model="user.username" placeholder="Username">
                </div>
            </div>

            <div class="col-auto">
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text"><i class="fal fa-unlock"></i></div>
                    </div>
                    <input type="password" class="form-control" placeholder="Password"
                           v-bind:class="{'is-invalid': this.touchedInputs['password']}" v-model="user.password">
                </div>
            </div>


            <div class="sign-up" v-if="context === 'sign-up'">
                <div class="col-auto">
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text"><i class="fal fa-unlock"></i></div>
                        </div>
                        <input type="password" class="form-control" placeholder="Password(again)"
                               v-bind:class="{'is-invalid': this.touchedInputs['passAgain']}"
                               v-model="user.passAgain">
                    </div>
                </div>

                <div class="col-auto">
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text"><i class="fal fa-envelope"></i></div>
                        </div>
                        <input type="email" class="form-control" placeholder="Email" v-model="user.email"
                               v-bind:class="{'is-invalid': this.touchedInputs['email']}">
                    </div>
                </div>

                <div class="col-auto">
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text"><i class="fal fa-envelope"></i></div>
                        </div>
                        <input type="email" class="form-control" placeholder="Email(again)" v-model="user.emailAgain"
                               v-bind:class="{'is-invalid': this.touchedInputs['emailAgain']}">
                    </div>
                </div>
            </div>

            <a class="back-button btn btn-light"><router-link to="/">Go back</router-link></a>
            <button class="btn btn-primary" type="submit">{{this.submitButtonText}}</button>

            <hr/>

            <a class="login-button facebook"><i class="fab fa-facebook-f"></i> Login using Facebook</a>
            <a class="login-button google"><i class="fab fa-google"></i> Login using Google</a>
        </div>
    </form>
</template>


<style lang="scss">

    .login {
        color: black;
        background: white;
        position: absolute;
        width: 40%;
        margin: 0 auto;
        padding: 1em;
        top: calc(25vh);
        left: calc(60vh);
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
                max-width: 40%;
                margin: 0 auto;
                font-weight: bold;
                color: $blue1;
                border-bottom: solid $blue2 1px;
                padding-bottom: .5em;
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

        .back-button {
            a {
                color: black;
                font-weight: bold;
            }
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
import Http from "../../services/Http";
import moment from 'moment';

@Component({})

export default class Authenticate extends Vue {

    public texts: { [s: string]: string; } = {
        'sign-in': 'Sign in',
        'sign-up': 'Sign up',
    };

    public icons: { [s: string]: string; } = {
        'sign-in': 'fal fa-sign-in-alt text-primary',
        'sign-up': 'fal fa-user-edit text-primary',
    };

    public successMessage = '';
    public context = 'sign-in';
    public submitButtonText = this.texts[this.context];
    public loginIcon: string = 'fal fa-sign-in-alt text-primary';
    public errors: string[] = [];
    public touchedInputs: any = {};
    public success = '';
    public validate: boolean = false;
    public validateText: string = 'You started the validation process. This could take a while.';
    public user = {
        username: '',
        password: '',
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

    public created() {
        if (this.$route.query.state === undefined || this.$route.query.token === undefined) {
            return;
        }

        let state = this.$route.query.state;

        if (state !== 'validate_user') {
            return;
        }

        // We need to validate the user.
        this.loginIcon = 'fal fa-spinner-third fa-spin text-warning';
        this.validate = true;
        const self = this;

        Http.request({
            method: 'GET',
            url: `api/user/validate?access_token=${this.$route.query.token}`,
        })
            .then((response) => {
                self.loginIcon = 'fal fa-check text-success';
                self.validateText = 'Success! You are now a valid user.';

                // todo: the refresh token and the expires and set all the data.
                self.$store.commit('setAccessToken', response.data.access_token);
                self.$store.commit('saveBudgetForNextTime', self.$store.state.budget.BudgetTemplate);
                self.$store.commit('saveIncome', self.$store.state.income.TempIncome);
                self.$store.commit('clearTempIncome');

                setTimeout(() => {
                    window.location = '/';
                }, 3000);
            })
            .catch((error) => {
                self.loginIcon = 'fal fa-times-circle text-danger';
                self.validateText = error.response.data.error;
            });
    }

    public contextSwitch(context: string) {
        this.context = context;

        this.submitButtonText = this.texts[context];
        this.loginIcon = this.icons[context];
        this.errors = [];
        this.touchedInputs = {};
    }

    public validEmail(email: string) {
        /* tslint:disable:max-line-length */
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        /* tslint:enable:max-line-length */
        return re.test(String(email).toLowerCase());
    }

    public submitForm(e: any) {
        const self = this;

        e.preventDefault();

        self.errors = [];
        self.touchedInputs = {};

        if (this.user.username === '') {
            this.errors.push('Please fill in the username');
            self.touchedInputs.username = true;
        }
        if (this.user.password === '') {
            this.errors.push('Please fill in the password');
            self.touchedInputs.password = true;
        }

        if (this.context === 'sign-up') {
            if (this.user.passAgain === '') {
                this.errors.push('Please fill in the password(again)');
                self.touchedInputs.passAgain = true;
            }

            if (this.user.password !== '' && this.user.passAgain !== this.user.password) {
                this.errors.push('The passwords are not matching');
                self.touchedInputs.pass = true;
                self.touchedInputs.passAgain = true;
            }

            if (this.user.email === '') {
                this.errors.push('Please fill in the email');
                self.touchedInputs.email = true;
            }

            if (this.user.emailAgain === '') {
                this.errors.push('Please fill in the email(again)');
                self.touchedInputs.emailAgain = true;
            }

            if (!this.validEmail(this.user.email)) {
                this.errors.push('The email should be valid');
                self.touchedInputs.email = true;
            }

            if (this.user.emailAgain !== '' && this.user.emailAgain !== this.user.email) {
                this.errors.push('The emails addresses are not matching');
                self.touchedInputs.email = true;
                self.touchedInputs.emailAgain = true;
            }

            if (self.errors.length === 0) {
                self.errors = [];
                self.loginIcon = 'fal fa-spinner-third fa-spin';

                Http.request({
                    method: 'POST',
                    url: 'api/user/register',
                    data: self.user,
                })
                    .then((response) => {
                        self.loginIcon = 'fal fa-check text-success';
                        self.successMessage = 'Your registration process has been completed. ' +
                            'Please check your email for more instructions';

                        self.$store.commit('setAccessToken', response.data.access_token);
                        self.$store.dispatch('sync');
                    })
                    .catch((error) => {
                        self.loginIcon = 'fal fa-times-circle text-danger';
                        Object.keys(error.response.data).forEach((key: string) => {
                            self.touchedInputs[key] = true;
                            self.errors.push(error.response.data[key].join("<br />"));
                        });
                    });
            } else {
                this.loginIcon = 'fal fa-times text-danger';
            }
        }

        if (self.context === 'sign-in') {
            const payload = btoa(`${moment().format('DD/MM/Y')}_${self.user.username}_${self.user.password}`);

            Http.request({
                method: 'POST',
                url: 'api/user/login',
                data: {
                    auth: payload
                }
            })
                .then((response) => {
                    self.loginIcon = 'fal fa-check text-success';
                    self.successMessage = 'You are not logged in';

                    self.$store.commit('setAccessToken', response.data);
                    self.$store.dispatch('sync');

                    setTimeout(() => {
                        window.location = '/';
                    }, 3000);
                })
                .catch((error) => {
                    self.loginIcon = 'fal fa-times-circle text-danger';
                    Object.keys(error.response.data).forEach((key: string) => {
                        self.touchedInputs[key] = true;
                        self.errors.push(error.response.data.error);
                    });
                });
        }
    }

}
</script>
