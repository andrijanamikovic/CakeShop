<template>
    <div class="container">
        <p>Nije mi implementirano ovo</p>
        <v-container class="flex-container">
            <v-icon class="button-image">mdi-account-plus-outline</v-icon>
            <div class="form-container">
                <v-form @submit.prevent="updateAccount">
                    <v-row>
                        <v-col cols="12" md="6" v-for="(value, key) in userFiltered" :key="key" v-model="user">
                            <v-text-field :label="key"></v-text-field>
                        </v-col>
                    </v-row>
                    <base-button class="submitButton" type="submit" color="primary">Submit</base-button>
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
            const fieldsToExclude = ["type", "image", "key"]
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
        submitEdit() {
            // Update accountData with editedData
            this.user = Object.assign({}, this.user);
            console.log('user', this.user)
        },
        async updateAccount() {
            // tu treba da dodam da dodaje novog korisnika tipa worker!!!
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
                case 'image': return false;
                case 'key': return false;
                case 'type': return false;
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

.button-image {
    size: 100px;
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