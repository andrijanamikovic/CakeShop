<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<style scoped>
.card {
    border-radius: 12px;
    box-shadow: 0 2px 8px rgb(0, 0, 0, 0.26);
    margin: 2rem auto;
    max-width: 40rem;
}
</style>