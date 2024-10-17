<script setup lang="ts">
interface Props {
    size?: String,
    fontSize?: String,
    reversed?: boolean,
};

const { size = "95vmin", fontSize = "4vmin", reversed = false } = defineProps<Props>()

function isFileCoordinateLineFor(cellIndex: number): boolean {
    const lineIndex = Math.floor(cellIndex / 10);
    return (lineIndex === 0) || (lineIndex === 9);
}

function getFileCoordFor(cellIndex: number): string {
    const colIndex = cellIndex % 10;
    return ["", "A", "B", "C", "D", "E", "F", "G", "H", ""][reversed ? 9 - colIndex : colIndex];
}

function isRankCoordinateColFor(cellIndex: number): boolean {
    const colIndex = cellIndex % 10;
    return (colIndex === 0) || (colIndex === 9);
}

function getRankCoordFor(cellIndex: number): string {
    const lineIndex = Math.floor(cellIndex / 10);
    return ["", "8", "7", "6", "5", "4", "3", "2", "1", ""][reversed ? 9 - lineIndex : lineIndex];
}

function isWhiteCell(cellIndex: number): boolean {
    const row = Math.floor(cellIndex / 10);
    const col = cellIndex % 10;
    return (row + col) % 2 > 0;
}
</script>

<template>
    <div class="board_root">
        <template v-for="(_, cellIndex) in new Array(100)">
            <div v-if="isFileCoordinateLineFor(cellIndex)" class="coord">{{ getFileCoordFor(cellIndex) }}</div>
            <div v-else-if="isRankCoordinateColFor(cellIndex)" class="coord">{{ getRankCoordFor(cellIndex) }}</div>
            <div v-else class="cell"
                :class="{ 'white-cell': isWhiteCell(cellIndex), 'black-cell': !isWhiteCell(cellIndex) }"></div>
        </template>
    </div>
</template>

<style lang="css" scoped>
.board_root {
    width: v-bind(size);
    height: v-bind(size);
    background-color: rgb(48, 39, 179);
    display: grid;
    grid-template-columns: 1fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 1fr;
    grid-template-rows: 1fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 1fr;
}

.coord {
    color: gold;
    font-weight: bold;
    font-size: v-bind(fontSize);
    display: flex;
    justify-content: center;
    align-items: center;
}

.cell {
    width: 100%;
    height: 100%;
}

.white-cell {
    background-color: navajowhite;
}

.black-cell {
    background-color: peru;
}
</style>