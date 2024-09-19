<template>
    <aside class="sidebar-container">
        <button @click="onOpenNodeModal('intent')"> Intent Node </button>
        <button @click="onOpenNodeModal('transfer')"> Transfer Node </button>
    </aside>
</template>

<script setup lang="ts">

const emit = defineEmits(["openNodeModal"]);

const onOpenNodeModal = (nodeType: string) => {
    emit("openNodeModal", nodeType);
}

</script>

<style scoped>

.sidebar-container {
    position: absolute;
    height: 100vh;
    width: 15vw;
    background-color: greenyellow;
    top: 0;
    right: 0;
    padding: 2rem;
}

.sidebar-container > button {
    margin: 4px;
}

</style>