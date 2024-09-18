<template>
    <VueFlow :nodes="nodes" :edges="edges">
        <Panel :style="{ display: 'flex', gap: '4px'}" position="top-left">
            <button @click="showAiNodeInformation = true;"> add Ai powered node </button>
            <button @click="showStaticNodeInformation = true;"> add static node </button>
        </Panel>
    </VueFlow>
    <!-- Edge example -->
    <dialog :open="showNewEdgeInformation">
        <p>Node relation between {{ nodeLabelSource }} - {{ nodeLabelTarget }}</p>
        <form method="dialog">
            <div>
                <label for="edge-name">Relation name</label>
                <input type="text" name="edge-name" id="edge-name" v-model="edgeName" />
            </div>
            <div>
                <label for="edge-navigation-input">When to navigate this route</label>
                <textarea name="edge-navigation-input" id="edge-navigation-input" placeholder="Type here when this route needs to be taken by the agent. Be as specific as you can be. So for instance when the caller says 'yes' or 'no'." rows="5" v-model="aiPromptSelection"></textarea>
            </div>
            <button @click="addNewEdge">OK</button> 
        </form>
    </dialog>
    <!-- Static node example -->
    <dialog :open="showStaticNodeInformation">
        <p>New static node</p>
        <form method="dialog">
            <div>
                <label for="static-node-type">Node type</label>
                <select id="static-node-type"v-model="staticNodeType">
                    <option disabled value="">Please select one</option>
                    <option>Default</option>
                    <option>Intent</option>
                    <option>SMS</option>
                    <option>Transfer</option>
                    <option value="yes-no-question">Yes/No Question</option>
                </select>
            </div>
            <div>
                <label for="static-node-name">Name</label>
                <input type="text" name="static-node-name" id="static-node-name" v-model="staticNodeName" />
            </div>
            <div>
                <label for="static-message-input">Message </label>
                <textarea name="static-message-input" id="static-message-input" placeholder="Type here the message of the assistant" rows="5" v-model="staticNodeMessage"></textarea>
            </div>
            <button @click="addOrUpdateStaticNode">OK</button> 
        </form>
    </dialog>
    <!-- AI powered node example -->
    <dialog :open="showAiNodeInformation">
        <p>New AI powered node</p>
        <form method="dialog">
            <div>
                <label for="node-name">Node type</label>
                <select v-model="aiNodeType">
                    <option disabled value="">Please select one</option>
                    <option>Default</option>
                    <option>Intent</option>
                    <option>SMS</option>
                    <option>Transfer</option>
                </select>
            </div>
            <div>
                <label for="node-name">Name</label>
                <input type="text" name="node-name" id="node-name" v-model="aiNodeName" />
            </div>
            <div>
                <label for="ai-prompt-input">Prompt </label>
                <textarea name="ai-prompt-input" id="ai-prompt-input" placeholder="Type here the prompt you want to send to the LLM" rows="5" v-model="aiPromptSelection"></textarea>
            </div>
            <div>
                <label for="ai-model-selection">Select model</label>
                <select id="ai-model-selection" v-model="aiModelSelection">
                    <option disabled value="">Please select one</option>
                    <option>GPT Turbo 3.5</option>
                    <option>GPT-4o</option>
                    <option>Gemini Flask 1.5</option>
                </select>
            </div>
            <div>
                <label for="ai-completion-input">Completion </label>
                <textarea name="ai-completion-input" id="ai-completion-input" placeholder="Describe when this node step is completed successfully. You could think about one or multiple criteria that need to be met." rows="5" v-model="aiCompletionInput"></textarea>
            </div>
            <div>
                <label for="ai-escalation-input">Escalation path </label>
                <textarea name="ai-escalation-input" id="ai-escalation-input" placeholder="Describe what needs to be done when the digital agent is not able to complete this step." rows="5" v-model="aiEscalationInput"></textarea>
            </div>
            <button @click="onAddOrUpdateAiNode">OK</button> 
        </form>
    </dialog>
  </template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Node, Edge, Connection } from '@vue-flow/core'
import { VueFlow, useVueFlow, Panel } from '@vue-flow/core'

const { addEdges, addNodes, findNode, getNodes, onConnect } = useVueFlow();

console.log('in example 1')

// General node information
const newId = ref(1);
const nodes = ref<Node[]>([]);

// AI Powered Nodes
const aiModelSelection = ref('');
const aiPromptSelection = ref('');
const aiCompletionInput = ref('');
const aiEscalationInput = ref('');
const aiNodeName = ref('');
const aiNodeType = ref('');
const showAiNodeInformation = ref(false);
const updateAiNodeInformation = ref(false);
const aiNodeToUpdate = ref('0');

function onAddOrUpdateAiNode() {
    showAiNodeInformation.value = false;

    if (updateAiNodeInformation.value) {
        const node = findNode(aiNodeToUpdate.value);
        node!.data = {
            'aiPromptSelection': aiPromptSelection.value,
            'aiModelSelection': aiModelSelection.value,
            'aiCompletionInput': aiCompletionInput.value,
            'aiEscalationInput': aiEscalationInput.value,
        }
        node!.label = aiNodeName.value;
        resetStateAiNode();
        return;
    }

    const nodeToAdd = {
        id: `${newId.value++}`,
        position: { x: Math.random() * 500, y: Math.random() * 500 },
        label: aiNodeName.value,
        data: {
            'aiPromptSelection': aiPromptSelection.value,
            'aiModelSelection': aiModelSelection.value,
            'aiCompletionInput': aiCompletionInput.value,
            'aiEscalationInput': aiEscalationInput.value,
        },
        connectable: true,
        events: { doubleClick: (nodeEvent: { event: PointerEvent, node: Node }) => {
            const { node } = nodeEvent;
            const { data } = node;
            aiNodeName.value = node.label as string;
            aiCompletionInput.value = data.aiCompletionInput;
            aiEscalationInput.value = data.aiEscalationInput;
            aiModelSelection.value = data.aiModelSelection;
            aiPromptSelection.value = data.aiPromptSelection;
            showAiNodeInformation.value = true;
            updateAiNodeInformation.value = true;
            aiNodeToUpdate.value = node.id;
        }}
    }
    addNodes(nodeToAdd);
    resetStateAiNode();
}

function resetStateAiNode() {
    aiModelSelection.value = '';
    aiCompletionInput.value = '';
    aiEscalationInput.value = '';
    aiNodeName.value = '';
    showAiNodeInformation.value = false;
    aiPromptSelection.value = '';
}

// Static Nodes
const showStaticNodeInformation = ref(false);
const staticNodeMessage = ref('');
const staticNodeName = ref('');
const staticNodeType = ref('');
const updateStaticNodeInformation = ref(false);
const staticNodeToUpdate = ref('0');

function addOrUpdateStaticNode() {
    showStaticNodeInformation.value = false;

    if (updateStaticNodeInformation.value) {
        const node = findNode(staticNodeToUpdate.value);
        node!.data = {
            'staticNodeMessage': staticNodeMessage.value,
            'staticNodeType': staticNodeType.value,
        }
        node!.label = staticNodeName.value;
        resetStateStaticNode();
        return;
    }

    if (staticNodeType.value === "yes-no-question") {
        const yesNoQuestionNodeId = newId.value++;
        const yesNodeId = newId.value++;
        const noNodeId = newId.value++;

        const yesNoQuestionNode = {
            id: `${yesNoQuestionNodeId}`,
            position: { x: Math.random() * 500, y: Math.random() * 500 },
            label: staticNodeName.value,
            data: {
                'staticNodeMessage': staticNodeMessage.value,
                'staticNodeType': staticNodeType.value,
            },
            connectable: true,
            events: { doubleClick: (nodeEvent: { event: PointerEvent, node: Node }) =>  {
                const { node } = nodeEvent;
                const { data } = node;
                staticNodeMessage.value = data.staticNodeMessage;
                staticNodeType.value = data.staticNodeType;
                staticNodeName.value = node.label as string;
                updateStaticNodeInformation.value = true;
                staticNodeToUpdate.value = node.id;
                showStaticNodeInformation.value = true;
                }
            }
        }

        const yesNode = {
            id: `${yesNodeId}`,
            position: { x: Math.random() * 500, y: Math.random() * 500 },
            label: 'Edit',
            connectable: true,
            events: { doubleClick: (nodeEvent: { event: PointerEvent, node: Node }) =>  {
                const { node } = nodeEvent;
                const { data } = node;
                staticNodeMessage.value = data.staticNodeMessage;
                staticNodeType.value = data.staticNodeType;
                staticNodeName.value = node.label as string;
                updateStaticNodeInformation.value = true;
                staticNodeToUpdate.value = node.id;
                showStaticNodeInformation.value = true;
                }
            }
        }

        const noNode = {
            id: `${noNodeId}`,
            position: { x: Math.random() * 500, y: Math.random() * 500 },
            label: 'Edit',
            connectable: true,
            events: { doubleClick: (nodeEvent: { event: PointerEvent, node: Node }) =>  {
                const { node } = nodeEvent;
                const { data } = node;
                staticNodeMessage.value = data.staticNodeMessage;
                staticNodeType.value = data.staticNodeType;
                staticNodeName.value = node.label as string;
                updateStaticNodeInformation.value = true;
                staticNodeToUpdate.value = node.id;
                showStaticNodeInformation.value = true;
                }
            }
        }

        const yesEdge = {
            source: `${yesNoQuestionNodeId}`,
            target: `${yesNodeId}`,
            label: 'Yes',
        }

        const noEdge = {
            source: `${yesNoQuestionNodeId}`,
            target: `${noNodeId}`,
            label: 'No'
        }

        addNodes([yesNoQuestionNode, yesNode, noNode]);
        addEdges([yesEdge, noEdge]);

        return;
    }

    const nodeToAdd = {
        id: `${newId.value++}`,
        position: { x: Math.random() * 500, y: Math.random() * 500 },
        label: staticNodeName.value,
        data: {
            'staticNodeMessage': staticNodeMessage.value,
            'staticNodeType': staticNodeType.value,
        },
        connectable: true,
        events: { doubleClick: (nodeEvent: { event: PointerEvent, node: Node }) =>  {
            const { node } = nodeEvent;
            const { data } = node;
            staticNodeMessage.value = data.staticNodeMessage;
            staticNodeType.value = data.staticNodeType;
            staticNodeName.value = node.label as string;
            updateStaticNodeInformation.value = true;
            staticNodeToUpdate.value = node.id;
            showStaticNodeInformation.value = true;
            }
        }
    }
    addNodes(nodeToAdd);
    resetStateStaticNode();
}

function resetStateStaticNode() {
    staticNodeMessage.value = '';
    staticNodeName.value = '';
    staticNodeType.value = '';
}

// Edges
const edges = ref<Edge[]>([]);
const edgeName = ref('');
const newEdgeParams = ref<Connection>({} as Connection);
const nodeLabelSource = ref('');
const nodeLabelTarget = ref('');
const showNewEdgeInformation = ref(false);

onConnect((params) => {
    newEdgeParams.value = params;
    const sourceNodeId = params.source;
    const targetNodeId = params.target;
    getNodes.value.forEach(node => {
        if (node.id === sourceNodeId) {
            nodeLabelSource.value = node.label as string

            return;
        }
        if (node.id === targetNodeId) {
            nodeLabelTarget.value = node.label as string

            return;
        }
    });
    showNewEdgeInformation.value = true;
});

function addNewEdge() {
    const newEdge = {
        ...newEdgeParams.value,
        label: edgeName.value,
    } as Connection;
    addEdges(newEdge);
    resetEdgeInformation();
}

function resetEdgeInformation() {
    edgeName.value = '';
    newEdgeParams.value = {} as Connection;
    nodeLabelSource.value = '';
    nodeLabelTarget.value = '';
    showNewEdgeInformation.value = false;
}

</script>

<style scoped>

dialog {
    height: fit-content;
    width: 500px;
    top: 100px;
}

form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

form > div {
    display: flex;
    flex-direction: column;
}

.vue-flow__edge-textbg {
    fill: red;
}

</style>
