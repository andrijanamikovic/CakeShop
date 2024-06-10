<template>
    <div class="container">
        <base-card class="card-container">
            <h2 class="title">Narudžbine</h2>
            <v-divider></v-divider>
            <div v-if="hasItems">
                <div class="list-container">
                    <v-col cols="12">
                        <v-col v-for="data in items" :key="data.key" class="order-item">
                            <p class="data">{{ data.key }}</p>
                            <div v-for="item in data.items" :key="item.key" class="item-detail">
                                <p class="data">{{ item.key }} x {{ item.quantity }}</p>
                            </div>
                            <v-col>
                                <v-text-field v-model="time" placeholder="Minuti pripreme" single-line type="number" />
                                <v-text-field v-model="rejectionMessage" placeholder="Razlog odbijanja" single-line />
                            </v-col>
                            <v-btn icon="$vuetify" variant="text" @click="rejectOrder(data)">
                                <v-icon class="button-image">mdi-close-circle-outline</v-icon>
                            </v-btn>
                            <v-btn icon="$vuetify" variant="text" @click="acceptOrder(data)">
                                <v-icon class="button-image">mdi-check-circle-outline</v-icon>
                            </v-btn>
                        </v-col>
                    </v-col>
                </div>
            </div>
            <div v-else>
                <h2 class="title">{{ message }}</h2>
            </div>
        </base-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: "Nema novih narudžbina",
            time: NaN,
            rejectionMessage: "",
        }
    },
    computed: {
        items() {
            return this.$store.getters.getOrders
        },
        hasItems() {
            return this.items.length > 0
        },
        getLoggedInUser() {
            return this.$store.getters.getUser
        },
    },
    mounted() {
        console.log('U orders mi: ', this.items)
    },
    methods: {
        removeItem(user) {
            fetch(
                `https://cakeshop-1641c-default-rtdb.europe-west1.firebasedatabase.app/orders/${user}.json`,
                {
                    method: "DELETE",
                }
            )
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(() => {
                    // Handle the data
                    const items = this.$store.getters.getOrders.filter(data => data.key !== user);
                    this.$store.dispatch('setOrders', items);
                })
                .catch((error) => {
                    console.error("There was a problem with the fetch operation:", error);
                });
        },
        acceptOrder(data) {
            const user = data.key
            this.removeItem(user)
            const dataToSend = {
                "key": user,
                "time": this.time
            }
            fetch(
                `https://cakeshop-1641c-default-rtdb.europe-west1.firebasedatabase.app/accepted/${user}.json`,
                {
                    method: "POST",
                    body: JSON.stringify(dataToSend),
                }
            )
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .catch((error) => {
                    console.error("There was a problem with the fetch operation:", error);
                });
        },
        rejectOrder(data) {
            const user = data.key
            this.removeItem(user)
            const dataToSend = {
                "key": user,
                "message": this.rejectionMessage
            }
            fetch(
                `https://cakeshop-1641c-default-rtdb.europe-west1.firebasedatabase.app/rejected/${user}.json`,
                {
                    method: "POST",
                    body: JSON.stringify(dataToSend),
                }
            )
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .catch((error) => {
                    console.error("There was a problem with the fetch operation:", error);
                });
        }
    }
}
</script>

<style scoped>
.container {
    padding-top: 100px;
}

.card-container {
    background-color: #ffb6c1;
}

.title {
    text-align: center;
    color: white;
}

.list-container {
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.order-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
}

.item-detail {
    display: flex;
    justify-content: center;
    align-items: center;
}

.data {
    padding: 20px;
    color: white;
    text-align: center;
}

.button-image {
    padding: 20px;
    color: white;
}

.buttons-container {
    display: flex;
    justify-content: center;
}
</style>
