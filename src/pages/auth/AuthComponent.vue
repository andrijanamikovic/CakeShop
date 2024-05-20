<template>
    <div class="container">
        <base-card>
            <form @submit.prevent="submitForm">
                <div class="form-control">
                    <label for="username">Username</label>
                    <input type="username" id="username" v-model.trim="username" />
                </div>
                <div class="form-control">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model.trim="password" />
                </div>
                <div class="form-control" v-if="mode === 'signup'">
                    <label for="password">Confirm password</label>
                    <input type="password" id="password" v-model.trim="confirmedPassword" />
                </div>
                <p v-if="!formIsValid && mode === 'signup'">
                    Please enter a valid username, and password need to be at least 6
                    characters long
                </p>
                <p v-if="!formIsValid && mode === 'login'">
                    Please enter a valid username and password
                </p>
                <base-button>{{ submitButtonCaption }}</base-button>
                <base-button type="button" mode="flat" @click="switchAuthMode">{{
                switchModeButtonCaption
            }}</base-button>
            </form>
        </base-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            confirmedPassword: '',
            formIsValid: true,
            mode: 'login',
            isLoading: false,
            error: null,
            users: []
        };
    },
    computed: {
        submitButtonCaption() {
            if (this.mode === 'login') {
                return 'Login';
            } else {
                return 'Register';
            }
        },
        switchModeButtonCaption() {
            if (this.mode === 'login') {
                return 'Register';
            } else {
                return 'Login';
            }
        },
    },
    methods: {
        async submitForm() {
            this.formIsValid = true;
            if (
                this.username === '' ||
                this.password.length < 6 ||
                (this.mode == 'signup' && this.password != this.confirmedPassword)
            ) {
                this.formIsValid = false;
                return;
            }
            try {
                this.isLoading = true;
                if (this.users.length === 0)
                    this.users = this.$store.getters.getUsers
                if (this.mode == 'login') {
                    await this.$store.dispatch('login', {
                        username: this.username,
                        password: this.password,
                        users: this.users
                    });
                } else {
                    await this.$store.dispatch('signup', {
                        username: this.username,
                        password: this.password,
                    });
                }
                if (!this.$store.getters.getLoggedIn) throw ('Wrong username or password')
                localStorage.setItem('loggedInUser', JSON.stringify(this.$store.getters.getUser));
                const redirectUrl = '/' + (this.$route.query.redirect || 'home');
                this.$router.replace(redirectUrl);
            } catch (error) {
                this.error = error.message || 'Failed to authenticate, try later';
                this.formIsValid = false
            }
            this.isLoading = false;
        },
        switchAuthMode() {
            if (this.mode === 'login') {
                this.mode = 'signup';
            } else {
                this.mode = 'login';
            }
        },
        handleError() {
            this.error = null;
        },
    },
};
</script>
<style scoped>
.container {
    padding-top: 200px;
}

form {
    margin: 1rem;
    padding: 1rem;
}

.form-control {
    margin: 0.5rem 0;
}

label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
    color: #ffb6c1;
}

input,
textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    padding: 0.15rem;
}

input:focus,
textarea:focus {
    border-color: #3d008d;
    background-color: #faf6ff;
    outline: none;
}
</style>
