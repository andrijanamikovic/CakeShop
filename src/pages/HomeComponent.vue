<template>
    <v-container>
        <div v-if="userNotAdmin">
            <v-alert class="alert-container" v-if="this.message" :color="this.type" :icon="`$` + this.type"
                title="Alert title" :text="this.message"></v-alert>
            <v-col>
                <v-container>
                    <div class="carousel-container">
                        <v-carousel style="width: 90%; height: 90%;" hide-delimiters
                            prev-icon="mdi-arrow-left-thin-circle-outline"
                            next-icon="mdi-arrow-right-thin-circle-outline" class="carousel-style" show-arrows="hover">
                            <v-carousel-item v-for="item in actions" :key="item.key">
                                <div class="carousel-item">
                                    <img class="small-image" :src="item.image" />
                                    <div class="carousel-text">
                                        <h2> {{ item.naslov }}</h2>
                                        <p>{{ item.tekst }}</p>
                                    </div>
                                </div>
                            </v-carousel-item>
                        </v-carousel>
                    </div>
                </v-container>
                <v-row>
                    <div class="pages-container">
                        <v-container>
                            <v-card color="#ffdde2" class="mx-auto">
                                <v-row>
                                    <v-col cols="6">
                                        <img class="card-image" src="/assets/cake.png" />
                                    </v-col>
                                    <v-col cols="6" class="button-pages">
                                        <v-card-actions to="/cakes">
                                            <v-btn class="action-button" color="white" text="TORTE" to="/cakes"></v-btn>
                                        </v-card-actions>
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
                                        <v-card-actions>
                                            <v-btn class="action-button" color="white" text="KOLACI"
                                                to="cookies"></v-btn>
                                        </v-card-actions>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-container>
                    </div>
                </v-row>
            </v-col>
        </div>
        <div v-if=userAdmin>
            <div class="admin-container">
                <base-card class="admin-base-card pa-4">
                    <v-row class="admin-row mb-3 mt-3">
                        <base-button @click="goTo('orders')" class="admin-button">NARUDŽBINE</base-button>
                    </v-row>
                    <v-row class="admin-row mb-3">
                        <base-button @click="goTo('addItem')" class="admin-button">DODAJ PROIZVOD</base-button>
                    </v-row>
                    <v-row class="admin-row mb-3">
                        <base-button @click="goTo('addWorker')" class="admin-button">DODAJ KOLEGU</base-button>
                    </v-row>
                </base-card>
            </div>
        </div>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            message: "",
            type: ""
        }
    },
    computed: {
        actions() {
            const cakes = JSON.parse(JSON.stringify(this.$store.getters.getCakes))
            const cookies = JSON.parse(JSON.stringify(this.$store.getters.getCookies))
            console.log('Cakes: ', cakes)
            const actions = cakes.concat(cookies).filter(item => item.akcija)
            console.log('Akcije: ', actions)
            return actions
        },
        userNotAdmin() {
            return this.$store.getters.getUser?.type === 'user'
        },
        userAdmin() {
            return this.$store.getters.getUser?.type === 'worker'
        },
        user() {
            return this.$store.getters.getUser
        }
    },
    methods: {
        getImagePath(item) {
            return require(item.image)
        },
        goTo(path) {
            this.$router.replace('/' + path);
        }
    },
    created() {
        if (this.userAdmin) {
            fetch('https://cakeshop-1641c-default-rtdb.europe-west1.firebasedatabase.app/orders.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // Handle the data
                    this.$store.dispatch('setOrders', data);
                    console.log('Items: ', data);
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        } else {
            console.log('user: ', this.user);
            fetch(
                `https://cakeshop-1641c-default-rtdb.europe-west1.firebasedatabase.app/accepted/${this.user.key}.json`,
                {
                    method: "GET",
                }
            )
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data) {
                        const keys = Object.keys(data)
                        if (keys.length > 0) {
                            const firstKey = keys[0]
                            this.message = 'Vasa narudbina bice spremna za ' + data[firstKey].time
                            this.type = "success"
                        }
                    }
                    fetch(
                        `https://cakeshop-1641c-default-rtdb.europe-west1.firebasedatabase.app/accepted/${this.user.key}.json`,
                        {
                            method: "DELETE",
                        }
                    )
                })
                .catch((error) => {
                    console.error("There was a problem with the fetch operation:", error);
                });

            fetch(
                `https://cakeshop-1641c-default-rtdb.europe-west1.firebasedatabase.app/rejected/${this.user.key}.json`,
                {
                    method: "GET",
                }
            )
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data) {
                        const keys = Object.keys(data)
                        console.log('Kljuc ovde: ', keys)
                        if (keys.length > 0) {
                            const firstKey = keys[0]
                            this.message = 'Vasa narudbina je odbijena zbog: ' + data[firstKey].message
                            this.type = "error"
                            console.log("Poruka: ", this.message)
                        }
                    }
                    fetch(
                        `https://cakeshop-1641c-default-rtdb.europe-west1.firebasedatabase.app/rejected/${this.user.key}.json`,
                        {
                            method: "DELETE",
                        }
                    )
                        .catch((error) => {
                            console.error("There was a problem with the fetch operation:", error);
                        });
                });
        }
    }
}
</script>


<style scoped>
.alert-container {
    display: flex;
    justify-content: center;
    align-items: left;
    color: white;
    font-size: 12px;
    padding-top: 120px;
}

.carousel-container {
    display: flex;
    justify-content: center;
    align-items: left;
    padding-top: 120px;
}

.carousel-item {
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 300px;
    background-color: #ffdde2;
    padding: 20px 20px 20px 20px;
}

.small-image {
    max-height: 250px;
    width: auto;
    padding-right: 20px;

}

.carousel-text {
    padding: 20px 20px 20px 20px;
    background-color: #ffb6c1;
    color: white;
}

.carousel-style {
    outline: none;
    background-color: #ffdde2;
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

.admin-container {
    padding-top: 200px;
    height: 100%;
}

.admin-base-card {
    display: block;
    height: 500px;
}

.admin-row {
    height: 30%;
}

.admin-button {
    width: 100%;
}
</style>
