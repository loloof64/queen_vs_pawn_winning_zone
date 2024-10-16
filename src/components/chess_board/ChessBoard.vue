<script setup lang="ts">
interface Props {
    size?: String,
    fontSize?: String,
    reversed?: boolean,
};

const { size = "95vmin", fontSize = "4vmin", reversed = false } = defineProps<Props>()

function getMediumCellsArray(): string[] {
    return new Array(80);
}

function isCoordIndex(index: number): boolean {
    return (index % 10 == 0) || (index % 10 == 9);
}

function cellIndexToRankCoord(index: number): string {
    const baseIndex = Math.floor(index / 10);
    return ["8", "7", "6", "5", "4", "3", "2", "1"][reversed ? 7 - baseIndex : baseIndex];
}

function getFileCoordForCol(index: number): string {
    return ["A", "B", "C", "D", "E", "F", "G", "H"][reversed ? 7 - index : index];
}

function isWhiteCell(index: number): boolean {
    const row = Math.floor(index / 10);
    const col = index % 10;
    return (row + col) % 2 > 0;
}
</script>

<template>
    <div class="board_root">
        <div>&nbsp;</div>
        <div class="coord">{{getFileCoordForCol(0)}}</div>
        <div class="coord">{{getFileCoordForCol(1)}}</div>
        <div class="coord">{{getFileCoordForCol(2)}}</div>
        <div class="coord">{{getFileCoordForCol(3)}}</div>
        <div class="coord">{{getFileCoordForCol(4)}}</div>
        <div class="coord">{{getFileCoordForCol(5)}}</div>
        <div class="coord">{{getFileCoordForCol(6)}}</div>
        <div class="coord">{{getFileCoordForCol(7)}}</div>
        <div>&nbsp;</div>
        <template v-for="(_, cellIndex) in getMediumCellsArray()">
            <div class="coord" v-if="isCoordIndex(cellIndex)">{{ cellIndexToRankCoord(cellIndex) }}</div>
            <div class="cell" v-else
                :class="{ 'white-cell': isWhiteCell(cellIndex), 'black-cell': !isWhiteCell(cellIndex) }"></div>
        </template>
        <div>&nbsp;</div>
        <div class="coord">{{getFileCoordForCol(0)}}</div>
        <div class="coord">{{getFileCoordForCol(1)}}</div>
        <div class="coord">{{getFileCoordForCol(2)}}</div>
        <div class="coord">{{getFileCoordForCol(3)}}</div>
        <div class="coord">{{getFileCoordForCol(4)}}</div>
        <div class="coord">{{getFileCoordForCol(5)}}</div>
        <div class="coord">{{getFileCoordForCol(6)}}</div>
        <div class="coord">{{getFileCoordForCol(7)}}</div>
        <div>&nbsp;</div>
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