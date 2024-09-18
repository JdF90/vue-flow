<template>
    <div class="layout-flow">
      <VueFlow :nodes="nodes" :edges="edges" @nodes-initialized="layoutGraph('LR')">
        <!-- <template #node-process="props">
          <ProcessNode :data="props.data" :source-position="props.sourcePosition" :target-position="props.targetPosition" />
        </template> -->

        <Panel :style="{ display: 'flex', gap: '4px'}" position="top-left">
            <button @click="showPopup"> new node </button>
        </Panel>
  
        <template #edge-animation="edgeProps">
          <AnimationEdge
            :id="edgeProps.id"
            :source="edgeProps.source"
            :target="edgeProps.target"
            :source-x="edgeProps.sourceX"
            :source-y="edgeProps.sourceY"
            :targetX="edgeProps.targetX"
            :targetY="edgeProps.targetY"
            :source-position="edgeProps.sourcePosition"
            :target-position="edgeProps.targetPosition"
          />
        </template>
      </VueFlow>
    </div>
    <dialog :open="showAiNodeInformation">
        <p>New AI powered node</p>
        <form method="dialog">
            <button> Add new node </button>
            <button @click="routeToNewFlow"> Add new flow </button>
        </form>
    </dialog>
  </template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { initialEdges } from '../data/initialEdges';
import { initialNodes } from '../data/initialNodes';
import { useLayout } from '../logic/useLayout';
import { useRunProcess } from '../logic/useRunProcess';

// import ProcessNode from './components/ProcessNode.vue'
import AnimationEdge from '../components/AnimationEdge.vue'
//import { Background } from '@vue-flow/background'
import { Panel, VueFlow, useVueFlow } from '@vue-flow/core'

console.log('in example 2')

const { fitView } = useVueFlow()
const nodes = ref(initialNodes);
const edges = ref(initialEdges);
const { graph, layout } = useLayout();
const { stop, reset } = useRunProcess({ graph })

const showPopup = async () => {
    nodes.value.push({
      id: '8',
      position: { x: 0, y: 0 },
      type: "process",
    });

    edges.value.push(
        { id: 'e7-8', source: '7', target: '8', type: "animation", animated: true },
    )

    await layoutGraph();
}

async function layoutGraph() {
  stop()

  reset(nodes.value)

  nodes.value = layout(nodes.value, edges.value)

  nextTick(() => {
    fitView()
  })
}

</script>

<style scoped>

.layout-flow {
    height: 100vh;
    width: 100vw;
}

</style>
