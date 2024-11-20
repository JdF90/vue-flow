<template>
    <dialog :open="true">
        <p>New transfer node</p>
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
                <label for="extension">Extension</label>
                <input name="extension" id="extension" type="number" placeholder="Fill in the extension you want to be called" v-model="extension"></input>
            </div>
            <div>
                <label for="stayInLine">Stay in line</label>
                <input name="stayInLine" id="stayInLine" type="checkbox" v-model="stayInLine"></input>
            </div>
            <button @click="addNewNode">Create</button> 
        </form>
    </dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { TransferNode } from '../types/TransferNode';

const emit = defineEmits(["addNewTransferNode"]);

const nodeName = ref('');
const nodeMessage = ref('');
const extension = ref<undefined | number>(undefined);
const stayInLine = ref(false);

const addNewNode = () => {
    emit("addNewTransferNode", { name: nodeName.value, message: nodeMessage.value, extension: extension.value, stayInLine: stayInLine.value } as TransferNode);
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
