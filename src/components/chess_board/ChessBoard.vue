<script setup lang="ts">
interface Props {
    size?: String,
    fontSize?: String,
};

const { size = "95vmin", fontSize = "4vmin" } = defineProps<Props>()

function getMediumCellsArray(): string[] {
    return new Array(80);
}

function isCoordIndex(index: number): boolean {
    return (index % 10 == 0) || (index % 10 == 9);
}

function cellIndexToRankCoord(index: number): string {
    return ["8", "7", "6", "5", "4", "3", "2", "1"][index / 10];
}

function isWhiteCell(index: number): boolean {
    const row = Math.floor(index / 10);
    const col = index % 10;
    console.log(index, row+col)
    return (row + col) % 2 > 0;
}
</script>

<template>
    <div class="board_root">
        <div>&nbsp;</div>
        <div class="coord">A</div>
        <div class="coord">B</div>
        <div class="coord">C</div>
        <div class="coord">D</div>
        <div class="coord">E</div>
        <div class="coord">F</div>
        <div class="coord">G</div>
        <div class="coord">H</div>
        <div>&nbsp;</div>
        <template v-for="(_, cellIndex) in getMediumCellsArray()">
            <div class="coord" v-if="isCoordIndex(cellIndex)">{{ cellIndexToRankCoord(cellIndex) }}</div>
            <div class="cell" v-else
                :class="{ 'white-cell': isWhiteCell(cellIndex), 'black-cell': !isWhiteCell(cellIndex) }"></div>
        </template>
        <div>&nbsp;</div>
        <div class="coord">A</div>
        <div class="coord">B</div>
        <div class="coord">C</div>
        <div class="coord">D</div>
        <div class="coord">E</div>
        <div class="coord">F</div>
        <div class="coord">G</div>
        <div class="coord">H</div>
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