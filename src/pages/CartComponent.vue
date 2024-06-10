<template>
    <div class="container">
        <base-card class="card-container">
            <h2 class="title">Korpa</h2>
            <v-divider></v-divider>
            <div v-if="hasItems">
                <div class="list-container">
                    <v-col>
                        <v-row cols="12" md="6" v-for="data in items" :key="data.item.key">
                            <img :src="data.item.image" class="left-image">
                            <p class="data">{{ data.quantity }} x {{ data.item.cena }} din</p>
                            <v-btn icon="$vuetify" variant="text" @click="removeItem(data.item)">
                                <v-icon class="button-image">mdi-close-circle-outline</v-icon>
                            </v-btn>
                        </v-row>
                    </v-col>
                </div>
                <v-col>
                    <div class="buttons-container">
                        <base-button mode="accept" @click="acceptOrder">Potvrdi&nbsp;&nbsp;&nbsp;</base-button>
                        <base-button mode="reject" @click="rejectOrder">Odustani</base-button>
                    </div>
                </v-col>
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
            message: "Prazna korpa!"
        }
    },
    computed: {
        items() {
            return this.$store.getters.getItems
        },
        hasItems() {
            return this.items.length > 0
        },
        getLoggedInUser() {
            return this.$store.getters.getUser
        },
    },
    methods: {
        rejectOrder() {
            this.$store.dispatch('setItems', [])
        },
        removeItem(item) {
            let items = this.items
            items = items.filter(data => data.item != item)
            this.$store.dispatch('setItems', items)
        },
        acceptOrder() {
            const user = this.getLoggedInUser?.key
            const items = this.items
            const data = items.map(data => ({
                "key": data.item.key,
                "quantity": data.quantity
            }))
            console.log('data: ', data, 'user ', user)
            fetch(
                `https://cakeshop-1641c-default-rtdb.europe-west1.firebasedatabase.app/orders/${user}.json`,
                {
                    method: "POST",
                    body: JSON.stringify(data),
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
                    this.message = "Poslata narudzbina!"
                    this.$store.dispatch('setItems', [])
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
    padding-top: 20px;
    padding-left: 20px;
    padding-bottom: 20px;
    display: flex;
    justify-content: center;
    /* Horizontally align items to the center */
    align-items: center;
}

.left-image {
    flex: 1;
    padding-top: 20px;
    padding-left: 20px;
    padding-bottom: 20px;
    max-width: 100px;
    /* Fit the image within the available space */
    max-height: 100px;
    display: grid;
    place-items: center;
    /* Take up the entire available space */
}

.data {
    padding-top: 20px;
    padding-left: 20px;
    padding-bottom: 20px;
    flex: 2;
    color: white;
    max-width: 50%;
    align-items: right;
    display: grid;
    place-items: center;
}

.button-image {
    padding-top: 20px;
    padding-bottom: 20px;
    color: white;
    display: grid;
    place-items: center;
}

.buttons-container {
    display: flex;
    justify-content: center;
}
</style>