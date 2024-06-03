<template>
    <v-container v-if="!iSChosen" class="chose-type-container">
        <div class="pages-container">
            <v-container>
                <v-card color="#ffdde2" class="mx-auto">
                    <v-row>
                        <v-col cols="6">
                            <img class="card-image" src="/assets/cake.png" />
                        </v-col>
                        <v-col cols="6" class="button-pages">
                            <v-btn class="action-button" color="white" text="DODAJ TORTU"
                                @click="chose('cake')"></v-btn>
                        </v-col>
                    </v-row>
                </v-card>
            </v-container>
            <v-container>
                <v-card color="#ffdde2" class="mx-auto">
                    <v-row>
                        <v-col cols="6">
                            <img class="card-image" src="/assets/cookies.png" to="cookies" />
                        </v-col>
                        <v-col cols="6" class="button-pages">
                            <v-btn class="action-button" color="white" text="DODAJ KOLAČ"
                                @click="chose('cookie')"></v-btn>
                        </v-col>
                    </v-row>
                </v-card>
            </v-container>
        </div>
    </v-container>
    <v-container class="chose-type-container" v-else-if="isDone">
        <v-row>
            <v-col v-for="image in images" :key="image" cols="12" sm="6" md="4">
                <v-card @click="selectImage(image)" :class="{ 'selected': selectedImage === image }">
                    <v-img :src="image" height="150px"></v-img>
                </v-card>
            </v-col>
            <v-col>
                <v-form @submit.prevent>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="Naziv" v-model="naziv"></v-text-field>
                            <v-text-field label="Opis" v-model="opis"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Sastojci" v-model="sastojci"></v-text-field>
                            <v-text-field label="Cena" v-model="cena"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <base-button class="submitButton" mode="accept" color="accept"
                            @click="addItem">Submit</base-button>
                        <base-button class="submitButton" mode="reject" color="reject"
                            @click="returnBack">Discard</base-button>
                    </v-row>
                </v-form>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
import cakes from '../data/cakes.json'
import cookies from '../data/cookies.json'
export default {
    data() {
        return {
            iSChosen: false,
            type: "",
            images: null,
            selectedImage: null,
            naziv: '',
            opis: '',
            sastojci: '',
            cena: 0,
            isDone: false,
        }
    },
    methods: {
        chose(item) {
            this.type = item
            this.iSChosen = true
        },
        selectImage(item) {
            this.selectedImage = item
        },
        addItem() {
            //add item to json file
            return 0
        },
        returnBack() {
            this.type = ""
            this.iSChosen = false
        }
    },
    watch: {
        type(newType) {
            this.isDone = false
            if (newType === 'cake') {
                this.images = Object.keys(cakes).map(key => cakes[key].image)
            } else {
                this.images = Object.keys(cookies).map(key => cookies[key].image)
            }
            this.isDone = true
        }
    }
}
</script>

<style scoped>
.chose-type-container {
    display: flex;
    justify-content: center;
    align-items: left;
    padding-top: 200px;
}

.pages-container {
    display: flex;
    justify-content: center;
    align-items: left;
    width: 100%;
    padding: 20px 20px 60px 20px;
}

.card-image {
    padding-right: 20px;
    max-height: 400px;
    width: auto;
    object-fit: cover;
    padding: 10px 10px 10px 10px;
}

.button-pages {
    display: flex;
    justify-content: center;
    align-items: center;
}

.action-button {
    height: 100%;
    background-color: #ffb6c1;
}

.v-card {
    cursor: pointer;
    transition: transform 0.2s;
}

.v-card:hover {
    transform: scale(1.05);
}

.selected {
    border: 4px solid #ffb6c1;
    transform: scale(1.05);
}

.submitButton {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>