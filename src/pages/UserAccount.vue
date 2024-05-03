<template>
    <div class="container">
        <v-container class="flex-container">
            <img :src="user.image" class="left-image">
            <div class="form-container">
                <v-form v-if="!isEditing" @submit.prevent="submitEdit">
                    <v-row>
                        <v-col cols="12" md="6" v-for="(value, key) in userFiltered" :key="key">
                            <v-text-field v-if="showField(key)" :label="key" v-model="user[key]"
                                readonly></v-text-field>
                        </v-col>
                    </v-row>
                    <base-button class="submitButton" type="submit" color="primary"
                        @click="editField()">Update</base-button>
                    <base-button v-if="!isChangingPassword" @click="changePassword()">Change
                        password</base-button>
                </v-form>
                <v-form v-else @submit.prevent="updateAccount">
                    <v-row>
                        <v-col cols="12" md="6" v-for="(value, key) in userFiltered" :key="key">
                            <v-text-field :label="key" v-model="user[key]"></v-text-field>
                        </v-col>
                    </v-row>
                    <base-button class="submitButton" type="submit" color="primary">Submit</base-button>
                    <base-button v-if="!isChangingPassword" @click="changePassword()">Change
                        password</base-button>
                </v-form>
                <v-form v-if="isChangingPassword" @submit.prevent="submitPassword">
                    <v-col>
                        <div class="form-control">
                            <label for="password">Password</label>
                            <input type="password" id="password" v-model.trim="newPassword" />
                        </div>
                        <div class="form-control">
                            <label for="password">Confirm password</label>
                            <input type="password" id="password" v-model.trim="confirmedPassword" />
                        </div>
                    </v-col>
                    <p>{{ errorMessage }}</p>
                    <base-button class="submitButton" type="submit" color="primary">Change password</base-button>
                </v-form>
                <p color="mint">{{ updateMessage }}</p>
            </div>
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: null,
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
    },
    computed: {
        userFiltered() {
            const fieldsToExclude = ["password", "image", "key"]
            const filteredObject = {};
            for (const key in this.user) {
                if (!fieldsToExclude.includes(key)) {
                    filteredObject[key] = this.user[key];
                }
            }
            return filteredObject
        }
    },
    methods: {
        editField() {
            this.isEditing = true;
            // Make a copy of the original data to editedData
            this.editedData = Object.assign({}, this.user);
        },
        changePassword() {
            this.isChangingPassword = true;
        },
        submitEdit() {
            // Update accountData with editedData
            this.user = Object.assign({}, this.user);
            this.isEditing = false;
            this.isChangingPassword = false;
        },
        async submitPassword() {
            if (this.newPassword !== this.confirmedPassword) {
                this.errorMessage = 'Passwords do not match'
            } else if (this.newPassword.length < 6) {
                this.errorMessage = 'Password need to be at least 6 character long'
            } else {
                this.errorMessage = ''
                this.isChangingPassword = false;
                this.user.password = this.newPassword
                await this.updateAccount()
                this.updateMessage = 'Password changed'
            }
        },
        async updateAccount() {
            // Here you would implement the logic to update the account data
            const key = this.user.key
            console.log('User: ', JSON.stringify(this.user))
            const response = await fetch(`https://cakeshop-1641c-default-rtdb.europe-west1.firebasedatabase.app/users/${key}.json`, {
                method: 'PUT',
                body: JSON.stringify(this.user)
            })
            if (!response.ok) {
                this.updateMessage = 'Failed to update data'
            } else {
                this.updateMessage = 'Data updated'
            }
            this.isChangingPassword = false
        },
        showField(key) {
            switch (key) {
                case 'password': return false;
                case 'image': return false;
                case 'key': return false;
            }
            return true
        },
    }
}
</script>


<style scoped>
.container {
    background-color: #ffdde2;
    width: 100%;
    height: 100vh;
    padding-top: 150px;
}

.text-center {
    text-align: center;
}

.flex-container {
    display: flex;
}

.left-image {
    flex: 1;
    max-width: 50%;
    /* Fit the image within the available space */
    max-height: 50%;
    /* Take up the entire available space */
    margin-right: 20px;
    /* Adjust as needed */
}

.form-container {
    flex: 2;
    /* Take up 2/3 of the available space */
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