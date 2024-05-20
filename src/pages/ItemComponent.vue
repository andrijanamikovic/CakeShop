<template>
    <div>
        <div class="item-container">
            <base-card class="base-card-container">
                <div class="image-container">
                    <img :src="item.image" alt="Cake Image" class="cake-image" />
                    <base-button v-if="!addingComment" @click="addCommentEnable">Dodaj komentar</base-button>
                </div>
                <!-- Text on the right -->
                <div class="cake-details">
                    <h2>{{ item.naziv }}</h2>
                    <p>{{ item.opis }}</p>
                    <p> Sastojci: {{ item.sastojci }}</p>
                    <p v-if="item.akcija">{{ item.naslov }}: {{ item.tekst }}</p>
                    <p>Cena: {{ item.cena }} dinara</p>
                    <div class="cart-container">
                        <v-text-field v-model="quantity" hide-details single-line type="number" />
                        <div class="centered-output"> = {{ quantity * item.cena }}</div>
                        <v-btn icon="$vuetify" variant="text">
                            <v-icon class="button-image" @click="addToCart">mdi-cart-outline</v-icon>
                        </v-btn>
                    </div>
                </div>
            </base-card>
        </div>
        <div class="adding-comment" v-if="addingComment">
            <div class="textarea-container">
                <v-textarea label="Tekst komentara" v-model="newComment"></v-textarea>
            </div>
            <div class="buttons-container">
                <base-button mode="accept" @click="addComment">Potvrdi&nbsp;&nbsp;&nbsp;</base-button>
                <base-button mode="reject" @click="addCommentDisable">Odustani</base-button>
            </div>
        </div>
        <div :v-if="hasComments" class="list-comments">
            <v-list>
                <base-card class="comments-card">
                    <v-table>
                        <thead>
                            <tr>
                                <th class="text-header">
                                    Username
                                </th>
                                <th class="text-header">
                                    Comment
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(comment, key) in comments" :key="key">
                                <td>{{ key }}</td>
                                <td>{{ comment }}</td>
                            </tr>
                        </tbody>
                    </v-table>
                </base-card>
            </v-list>
        </div>
    </div>

</template>

<script>
/* eslint-disable */
import BaseButton from '../components/ui/BaseButton.vue';
import BaseCard from '../components/ui/BaseCard.vue';
export default {
    components: { BaseCard, BaseButton },
    data() {
        return {
            item: null,
            quantity: 0,
            addingComment: false,
            newComment: '',
            comments: null,
            allComments: null,
            key: null
        }
    },
    computed: {
        getLoggedInUser() {
            return this.$store.getters.getUser
        },
        hasComments() {
            if (!this.comments) return false
            return this.comments?.length !== 0
        }
    },
    methods: {
        getAllData() {
            const currentRoute = this.$route.path;
            if (currentRoute.startsWith('/cakes/')) {
                return this.$store.getters.getCakes
            } else if (currentRoute.startsWith('/cookies/')) {
                return this.$store.getters.getCookies
            }
            return null
        },
        addCommentEnable() {
            this.addingComment = true
        },
        addCommentDisable() {
            this.addingComment = false
        },
        addComment() {

            const user = this.getLoggedInUser?.key
            const text = this.newComment
            const key = this.$route.params.itemId
            const comment = {}
            comment[user] = text
            const method = this.hasComments ? 'PUT' : 'POST'
            fetch(
                `https://cakeshop-1641c-default-rtdb.europe-west1.firebasedatabase.app/comments/${key}/${user}.json`,
                {
                    method: method,
                    body: JSON.stringify(text),
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
                    this.comments[user] = this.newComment
                })
                .catch((error) => {
                    console.error("There was a problem with the fetch operation:", error);
                });
        },
        addToCart() {
            const addItem = {
                item: this.item,
                quantity: this.quantity
            }
            this.$store.dispatch('addItem', addItem)
        }
    },
    created() {
        const data = this.getAllData()
        const key = this.$route.params.itemId
        this.item = data.find(item => item.key === key)
        fetch('https://cakeshop-1641c-default-rtdb.europe-west1.firebasedatabase.app/comments.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Handle the data
                this.comments = data[key]
                this.allComments = data
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    },
    updated() {
        this.item = this.getAllData().find(item => item.key === this.$route.params.itemId)
        const key = this.$route.params.itemId
        // this.comments = this.getAllData()[key]
        // console.log('Komentari: ', this.comments)
    }

}
</script>


<style scoped>
.item-container {
    display: flex;
    align-items: center;
    padding-top: 120px;
    margin-bottom: 20px;
}

.base-card-container {
    display: flex;
}

.image-container {
    flex: 1;
    align-items: left;
    /* Adjust as needed */
    height: auto;
    margin-right: 20px;
}

.cake-image {
    max-width: 200px;
    max-height: 400px;

}

.cake-details {
    flex: 2;
}

.cake-details h2 {
    font-size: 1.5rem;
    margin-bottom: 5px;
}

.cake-details p {
    margin-bottom: 10px;
}

.cart-container {
    display: flex
}

.centered-output {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    min-height: 36px;
}

.adding-comment {
    display: flex;
    align-items: center;
    justify-content: center;
}

.textarea-container {
    flex: 1;
    max-width: 50%;
}

.buttons-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    margin-left: 10px;
    /* Adjust as needed */
}

.comments-card {
    align-items: center;
    background-color: #ffb6c1;
    color: white;
}

.text-header {
    align-items: center;
    background-color: #ffb6c1;
    color: white;
}
</style>