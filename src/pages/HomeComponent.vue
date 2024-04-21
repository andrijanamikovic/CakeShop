<template>
    <div>
        <v-col>
            <v-container>
                <div class="carousel-container">
                    <v-carousel style="width: 90%; height: 90%;" hide-delimiters
                        prev-icon="mdi-arrow-left-thin-circle-outline" next-icon="mdi-arrow-right-thin-circle-outline"
                        class="carousel-style" show-arrows="hover">
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
                                    <img class="card-image" src="../assets/cake.png" />
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
                                    <img class="card-image" src="../assets/cookies.png" to="cookies" />
                                </v-col>
                                <v-col cols="6" class="button-pages">
                                    <v-card-actions>
                                        <v-btn class="action-button" color="white" text="KOLACI" to="cookies"></v-btn>
                                    </v-card-actions>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-container>
                </div>
            </v-row>
        </v-col>
    </div>
</template>

<script>
export default {
    computed: {
        actions() {
            const cakes = JSON.parse(JSON.stringify(this.$store.getters.getCakes))
            const cookies = JSON.parse(JSON.stringify(this.$store.getters.getCookies))
            console.log('Cakes: ', cakes)
            const actions = cakes.concat(cookies).filter(item => item.akcija)
            console.log('Akcije: ', actions)
            return actions
        }
    }
}
</script>


<style scoped>
.carousel-container {
    display: flex;
    justify-content: center;
    align-items: left;
    padding-top: 60px;
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
</style>
