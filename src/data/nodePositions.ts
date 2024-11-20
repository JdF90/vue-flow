
const nodePositions = []


export const updateNodePosition = (id: string, x: number, y: number) => {
    nodePositions.push({ id, x, y });
}
