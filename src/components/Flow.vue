<template>
    <VueFlow :nodes="nodes" :edges="edges">
        <Panel :style="{ display: 'flex', gap: '4px'}" position="top-left">
            <button @click="showNodeWidget = true"> Add Node </button>
            <button @click="saveFlow"> Save Flow </button>
        </Panel>
    </VueFlow>
    <Sidebar v-if="showNodeWidget" @open-node-modal="openNodeModal"/>
    <IntentNodeModal v-if="showIntentNodeModal" @add-new-intent-node="addNewIntentNode"/>
    <TransferNodeModal v-if="showTransferNodeModal" @add-new-transfer-node="addNewTransferNode"/>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Node, Edge, NodeChange} from '@vue-flow/core'
import { VueFlow, Panel, useVueFlow } from '@vue-flow/core';
import IntentNodeModal from './IntentNodeModal.vue';
import TransferNodeModal from './TransferNodeModal.vue';
import Sidebar from './Sidebar.vue';
import { IntentNode } from '../types/IntentNode';
import { TransferNode } from '../types/TransferNode';
import { updateNodePosition } from '../data/nodePositions';

const { addEdges, dimensions, getNodes, onConnect, onNodesChange } = useVueFlow();

const edges = ref<Edge[]>([]);
const nodes = ref<Node[]>([]);
const showIntentNodeModal = ref(false);
const showNodeWidget = ref(false);
const showTransferNodeModal = ref(false);
const currentId = ref(1);

const addNewIntentNode = (newIntentNode: IntentNode) => {
    const id = generateNextId();
    const x = Math.random() * dimensions.value.width;
    const y = Math.random() * dimensions.value.height;

    nodes.value.push({
        id,
        position: { x, y },
        data: {
            label: newIntentNode.name,
            ...newIntentNode,
        }
    });

    showIntentNodeModal.value = false;
}

const addNewTransferNode = (newTransferNode: TransferNode) => {
    const id = generateNextId();
    const x = Math.random() * dimensions.value.width;
    const y = Math.random() * dimensions.value.height;

    nodes.value.push({
        id,
        position: { x, y },
        data: {
            label: newTransferNode.name,
            ...newTransferNode,
        }
    });

    console.log("add new transfer node");
    showTransferNodeModal.value = false;
}

const generateNextId = () => {
    return String(currentId.value++);
}

const openNodeModal = (nodeType: string) => {
    showNodeWidget.value = false;
    
    nodeType === "intent" ? showIntentNodeModal.value = true : showTransferNodeModal.value = true;
}

onConnect((params) => {
    const id = generateNextId();
    const sourceNodeId = params.source;
    const targetNodeId = params.target;
    addEdges({ id, source: sourceNodeId, target: targetNodeId});
});

const saveFlow = () => {
    const nodes = getNodes;
    console.log(nodes);
}

onNodesChange((changes: NodeChange[]) => {
  if (changes.length === 1 && changes[0].type === "dimensions") {
    console.log("adding a node");
  }

  if(changes.length === 1 && changes[0].type === "position" && !changes[0].dragging) {
    updateNodePosition(changes[0].id, x, y);
  }
});

</script>

<style scoped>

</style>
