<template>
    <dialog :open="true">
        <p>New intent node</p>
        <form method="dialog">
            <div>
                <label for="node-name">Name</label>
                <input type="text" name="node-name" id="node-name" v-model="nodeName" />
            </div>
            <div>
                <label for="message">Message</label>
                <textarea name="message" id="message" placeholder="Type here the message you want the agent to speak out" rows="5" v-model="nodeMessage"></textarea>
            </div>
            <div>
                <label for="message">Possible Intents</label>
                <textarea name="message" id="message" placeholder="Type here the list of possible intents separated by a comma" rows="5" v-model="intentList"></textarea>
            </div>
            <button @click="addNewNode">Create</button> 
        </form>
    </dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(["addNewDefaultNode"]);

const nodeName = ref('');
const nodeMessage = ref('');
const intentList = ref('');

const addNewNode = () => {
    emit("addNewDefaultNode", { nodeName: nodeName, nodeMessage: nodeMessage, intentList: intentList.value.trim().split(",") });
}

</script>

<style scoped>

dialog {
    height: fit-content;
    width: 500px;
    top: 100px;
}

dialog > form > div > label {
    display: inline-block;
    width: 120px;
    margin-right: 10px;
}

input {
    width: 100%;
}

textarea {
    width: 100%;
}

button {
    margin-top: 10px;
}

</style>
