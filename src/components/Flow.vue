<template>
    <VueFlow :nodes="nodes" :edges="edges">
        <Panel :style="{ display: 'flex', gap: '4px'}" position="top-left">
            <button @click="showNodeWidget = true"> Add Node </button>
        </Panel>
    </VueFlow>
    <Sidebar v-if="showNodeWidget" @open-node-modal="openNodeModal"/>
    <NodeModal v-if="showIntentNodeModal"/>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Node, Edge} from '@vue-flow/core'
import { VueFlow, Panel } from '@vue-flow/core';
import NodeModal from './DefaultNodeModal.vue';
import Sidebar from './Sidebar.vue';

const edges = ref<Edge[]>([]);
const nodes = ref<Node[]>([]);
const showIntentNodeModal = ref(false);
const showNodeWidget = ref(false);
const showTransferNodeModal = ref(false);

const openNodeModal = (nodeType: string) => {
    showNodeWidget.value = false;
    
    nodeType === "intent" ? showIntentNodeModal.value = true : showTransferNodeModal.value = true;
}

</script>

<style scoped>

</style>
