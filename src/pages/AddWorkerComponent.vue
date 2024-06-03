<template>
    <div class="container">
        <div class="image-container">
            <img class="button-image" src="../../public/assets/addUser.png" />
        </div>
        <v-container class="flex-container">
            <div class="form-container">
                <v-form @submit.prevent="registerEmployee">
                    <v-row>
                        <v-col cols="12" md="6" v-for="(value, key) in userFiltered" :key="key" v-model="user">
                            <v-text-field :label="key" v-model="newUser[key]"></v-text-field>
                        </v-col>
                    </v-row>
                    <base-button class="submitButton" type="submit" color="primary">Submit</base-button>
                </v-form>
            </div>
            <p color="mint">{{ updateMessage }}</p>
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: null,
            newUser: null,
            isEditing: false,
            editedData: {},
            isChangingPassword: false,
            newPassword: '',
            confirmedPassword: '',
            errorMessage: '',
            updateMessage: '',
        }
    },
    created() {
        const userJSON = localStorage.getItem('loggedInUser')
        this.user = userJSON ? JSON.parse(userJSON) : null
        this.newUser = Object.keys(this.user).reduce((acc, key) => {
            acc[key] = null;
            return acc;
        }, {});
        console.log('Korisnici: ', this.users)
    },
    computed: {
        userFiltered() {
            const fieldsToExclude = ["type", "image"]
            const filteredObject = {};
            for (const key in this.user) {
                if (!fieldsToExclude.includes(key)) {
                    filteredObject[key] = this.user[key];
                }
            }
            return filteredObject
        },
        users() {
            return this.$store.getters.getUsers
        }
    },
    methods: {
        async registerEmployee() {
            const key = this.newUser.key
            console.log('Svi korisnici: ', this.users)
            if (this.users.find(item => item.key === key) !== undefined) {
                this.updateMessage = 'Already have this username'
                return
            }
            const adresa = this.newUser["Adresa"]
            const name = this.newUser["Ime Prezime"]
            const number = this.newUser["Kontakt telefon"]
            const email = this.newUser["email"]
            const password = this.newUser["password"]
            const registerWorker = {
                "Adresa": adresa,
                "Ime Prezime": name,
                "Kontakt telefon": number,
                "email": email,
                "key": key,
                "image": "",
                "password": password,
                "type": "worker"
            }
            const response = await fetch(
                "https://cakeshop-1641c-default-rtdb.europe-west1.firebasedatabase.app/users.json",
                {
                    method: "POST",
                    body: JSON.stringify(registerWorker),
                }
            )
            if (!response.ok) {
                this.updateMessage = 'Failed to update data'
            } else {
                this.updateMessage = 'Data updated'
            }
            this.isChangingPassword = false
        },
    }
}
</script>


<style scoped>
.container {
    display: flex;
    align-content: center;
    background-color: #ffdde2;
    width: 100%;
    height: 100vh;
    padding-top: 150px;
    margin: 0;
}


.image-container {
    flex: 1;
    display: flex;
    justify-content: center;
    padding-left: 30px;
}

.button-image {
    flex: 1;
    display: flex;
    align-content: center;
    justify-items: center;
    padding-left: 30px;
    width: 300px;
    height: 200px;
}

.text-center {
    text-align: center;
}

.form-container {
    flex: 2;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* Take up 2/3 of the available space */
}

form {
    display: flex;
    flex-direction: column;
    width: 80%;
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