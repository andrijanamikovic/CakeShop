<template>
    <div class="container">
        <div class="title">
            <h1>Torte</h1>
        </div>
        <v-carousel hide-delimiters prev-icon="mdi-chevron-left" next-icon="mdi-chevron-right">
            <v-carousel-item v-for="(chunk, index) in chunkedCakes" :key="index">
                <v-row>
                    <v-col v-for="item in chunk" :key="item.key" cols="16" sm="12" md="4" lg="4">
                        <v-card class="card-container" elevated>
                            <div class="card-content">
                                <v-img class="small-image" :src="item.image" contain />
                                <v-card-text class="text-center">{{ item.naziv }}</v-card-text>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-carousel-item>
        </v-carousel>
    </div>
</template>

<script>
export default {
    computed: {
        cakes() {
            return JSON.parse(JSON.stringify(this.$store.getters.getCakes))
        },
        chunkedCakes() {
            const size = 3;
            return this.cakes.reduce((acc, cur, idx) => {
                if (idx % size === 0) {
                    acc.push(this.cakes.slice(idx, idx + size));
                }
                return acc;
            }, []);
        }
    }
}
</script>


<style scoped>
.title {
    display: flex;
    justify-content: center;
    background-color: #ffb6c1;
    color: white;
}

.container {
    background-color: #ffdde2;
    width: 100%;
    height: 100vh;
    padding-top: 60px;
}

.v-carousel {
    padding-top: 100px;
}

.card-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #ffb6c1;
    color: white;
}

.card-content {
    text-align: center;
}


.small-image {
    max-height: 250px;
    width: auto;
    padding-right: 20px;
    padding-top: 40px;
}

.text-center {
    text-align: center;
}
</style>