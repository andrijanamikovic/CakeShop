<template>
    <header>
        <nav>
            <ul class="back">
                <li v-if="isLoggedIn">
                    <v-btn icon="$vuetify" variant="text" to="/">
                        <v-icon class="button-image">mdi-logout</v-icon>
                    </v-btn>
                </li>
            </ul>
            <h1 class="title">Slatki zalogaj</h1>
            <ul class="icons">
                <li v-if="isLoggedIn">
                    <v-btn icon="$vuetify" variant="text" to="/home">
                        <v-icon class="button-image">mdi-home-variant</v-icon>
                    </v-btn>
                </li>
                <li v-if="isLoggedIn">
                    <v-btn icon="$vuetify" variant="text" href="tel:${+38161234567}">
                        <v-icon class="button-image">mdi-phone</v-icon>
                    </v-btn>
                </li>
                <li v-if="isLoggedIn">
                    <v-btn icon="$vuetify" variant="text" to="/">
                        <v-icon class="button-image">mdi-cart-outline</v-icon>
                    </v-btn>
                </li>
                <li v-if="isLoggedIn">
                    <v-btn icon="$vuetify" variant="text" to="/account">
                        <v-icon class="button-image">mdi-account-box</v-icon>
                    </v-btn>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default ({
    computed: {
        isLoggedIn() {
            return true
            // return this.$store.getters.getLoggedIn;
        }
    }
})
</script>



<style scoped>
header {
    position: fixed;
    width: 100%;
    background-image: url('../../../public/assets/background.jpg');
    background-color: #ffb6c1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10vh;
    z-index: 999;
}

header .button-image {
    width: 8rem;
    height: auto;
    float: right;
    align-items: right;
    font-size: 42px;
}

header a {
    text-decoration: none;
    color: white;
    display: inline-block;
    border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
    border: 5px solid #ffd8f9;
}

.title {
    color: white;
    text-align: center;
    align-items: center;
    margin-left: auto;
    font-size: 42px;
}

.title a {
    color: white;
    margin: 0;
}

.title a:hover,
.title a:active,
.title a.router-link-active {
    border-color: transparent;
}

header nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;
}

header ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

li {
    margin: 0 0.5rem;
}

.icons {
    margin-left: auto;
    /* Pushes the icons to the right */
}

@media screen and (max-width: 600px) {

    /* Adjust font size for smaller screens */
    .title {
        font-size: 22px;
        /* Smaller font size for screens <= 600px */
    }
}
</style>
