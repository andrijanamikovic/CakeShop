<template>
    <header>
        <nav>
            <ul class="back">
                <li><router-link to="/"><img src="../../assets/back.png" class="button-image"></router-link></li>
            </ul>
            <h1>Slatki zalogaj</h1>
            <ul>
                <li><router-link to="/"><img src="../../assets/home.png" class="button-image"></router-link></li>
                <li><router-link to="/"><img src="../../assets/phone.png" class="button-image"></router-link></li>
                <li><router-link to="/"><img src="../../assets/cart.png" class="button-image"></router-link></li>
                <li><router-link to="/"><img src="../../assets/user.png" class="button-image"></router-link></li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default ({

})
</script>



<style scoped>
header {
    width: 100%;
    height: 5%;
    background-image: url('../../assets/background.jpg');
    background-color: #e74ca9;
    display: flex;
    justify-content: center;
    align-items: center;
}

header .button-image {
    width: 4rem;
    height: auto;
    float: right;
    align-items: right;
}

header a {
    text-decoration: none;
    color: #f391e3;
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

header nav {
    width: 100%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
</style>
