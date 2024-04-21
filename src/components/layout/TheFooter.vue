<template>
    <footer>
        <nav class="flex-container">
            <p class="left">Adresa: <a :href="googleMapsLink">Slatka ulica br.1</a></p>
            <p class="center">Email: <a :href="emailLink">slatkizalogaj@gmail.com</a></p>
            <p class="right">Broj: <a :href="callLink">+38161234567</a></p>
        </nav>
    </footer>
</template>

<script>
export default ({
    computed: {
        googleMapsLink() {
            return 'https://maps.app.goo.gl/oXBUiUG5qy6u7ycV7';
        },
        emailLink() {
            return 'mailto:${slatkizalogaj@gmail.com}';
        },
        callLink() {
            return 'tel:${+38161234567}';
        }
    }
})
</script>



<style scoped>
footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: auto;
    background-color: #ffb6c1;
    display: flex;
    z-index: 999;
}

footer .button-image {
    width: 4rem;
    height: auto;
    float: right;
    align-items: right;
}

footer p {
    color: white;
    margin: 0;
}

footer a {
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

h1 {
    margin: 0;
    color: white;
    text-align: center;
    line-height: 5rem;
    align-items: center;
    font-size: 4rem;
}

h1 a {
    color: white;
    margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
    border-color: transparent;
}

footer nav {
    width: calc(100% - 40px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin: auto;
}

.left {
    margin-right: auto;
}

.right {
    margin-left: auto;
}

@media screen and (min-width: 600px) {

    /* Apply styles for screens wider than 600px */
    footer {
        height: 5%;
        /* Reset height for larger screens */
        flex-direction: row;
        /* Change flex-direction back to row */
    }

    footer nav {
        width: auto;
        /* Reset width for larger screens */
    }

    footer p {
        margin: 0 10px;
        /* Adjust margin for larger screens */
    }
}
</style>
