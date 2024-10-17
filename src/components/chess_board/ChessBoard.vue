<script setup lang="ts">
interface Props {
    size?: String,
    fontSize?: String,
    reversed?: boolean,
    fen?: String,
    selectedCells?: Array<String>,
    correctCells?: Array<String>,
    wrongCells?: Array<String>,
    interactive?: boolean,
};

const { size = "95vmin", fontSize = "3.2vmin",
    reversed = false, fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    selectedCells = [],
    correctCells = [],
    wrongCells = [],
    interactive = false } = defineProps<Props>()

const emit = defineEmits<{
    cellClick: [cell: string]
}>()

import WP from './vectors/Chess_plt45.svg';
import WN from './vectors/Chess_nlt45.svg';
import WB from './vectors/Chess_blt45.svg';
import WR from './vectors/Chess_rlt45.svg';
import WQ from './vectors/Chess_qlt45.svg';
import WK from './vectors/Chess_klt45.svg';
import BP from './vectors/Chess_pdt45.svg';
import BN from './vectors/Chess_ndt45.svg';
import BB from './vectors/Chess_bdt45.svg';
import BR from './vectors/Chess_rdt45.svg';
import BQ from './vectors/Chess_qdt45.svg';
import BK from './vectors/Chess_kdt45.svg';

function handleCellClick(cellStr: string) {
    if (!interactive) return;
    emit("cellClick", cellStr);
}

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

function isSelectedCell(cellIndex: number): boolean {
    const cellStr = getCellStrFromIndex(cellIndex);
    return selectedCells.includes(cellStr);
}

function isCorrectCell(cellIndex: number): boolean {
    const cellStr = getCellStrFromIndex(cellIndex);
    return correctCells.includes(cellStr);
}

function isWrongCell(cellIndex: number): boolean {
    const cellStr = getCellStrFromIndex(cellIndex);
    return wrongCells.includes(cellStr);
}

function isWhiteCell(cellIndex: number): boolean {
    const row = Math.floor(cellIndex / 10);
    const col = cellIndex % 10;
    return (row + col) % 2 > 0;
}


function isOccupiedCellFor(cellIndex: number): boolean {
    return getCellValueFor(cellIndex).length > 0;
}

function getPiecePathForCell(cellIndex: number): string {
    const cellValue = getCellValueFor(cellIndex);
    switch (cellValue) {
        case "P": return WP;
        case "N": return WN;
        case "B": return WB;
        case "R": return WR;
        case "Q": return WQ;
        case "K": return WK;
        case "p": return BP;
        case "n": return BN;
        case "b": return BB;
        case "r": return BR;
        case "q": return BQ;
        case "k": return BK;
        default: return "";
    }
}


function getCellValueFor(cellIndex: number): string {
    const cellsValues = getCellsValues();
    const [fileIndex, rankIndex] = getFileAndRankIndexesFor(cellIndex);

    return cellsValues[7 - rankIndex][fileIndex];
}

function getFileAndRankIndexesFor(cellIndex: number): [number, number] {
    const row = Math.floor(cellIndex / 10);
    const col = cellIndex % 10;

    const realRow = row - 1;
    const realCol = col - 1;

    const fileIndex = reversed ? 7 - realCol : realCol;
    const rankIndex = reversed ? realRow : 7 - realRow;

    return [fileIndex, rankIndex];
}

function getCellsValues(): string[][] {
    const cellsLines = fen.split(" ")[0].split("/");
    let result: string[][] = [];
    for (let line of cellsLines) {
        let lineResult: string[] = [];
        const values = line.split("");
        for (let cell of values) {
            const isDigit = "0123456789".split("").includes(cell);
            if (isDigit) {
                const digit = parseInt(cell);
                for (let _ of new Array(digit)) {
                    lineResult = [...lineResult, ""];
                }
            }
            else {
                lineResult = [...lineResult, cell];
            }
        }
        result = [...result, lineResult];
    }
    return result;
}

function getCellStrFromIndex(cellIndex: number): string {
    const [fileIndex, rankIndex] = getFileAndRankIndexesFor(cellIndex);
    const fileStr = String.fromCharCode('a'.charCodeAt(0) + fileIndex);
    const rankStr = String.fromCharCode('1'.charCodeAt(0) + rankIndex);
    return `${fileStr}${rankStr}`;
}
</script>

<template>
    <div class="board_root">
        <template v-for="(_, cellIndex) in new Array(100)">
            <div v-if="isFileCoordinateLineFor(cellIndex)" class="coord">{{ getFileCoordFor(cellIndex) }}</div>
            <div v-else-if="isRankCoordinateColFor(cellIndex)" class="coord">{{ getRankCoordFor(cellIndex) }}</div>
            <div v-else class="cell" :class="{
                'white-cell': isWhiteCell(cellIndex),
                'black-cell': !isWhiteCell(cellIndex),
                'selected-cell': isSelectedCell(cellIndex),
                'correct-cell': isCorrectCell(cellIndex),
                'wrong-cell': isWrongCell(cellIndex),
            }" @click="() => handleCellClick(getCellStrFromIndex(cellIndex))">
                <img v-if="isOccupiedCellFor(cellIndex)" class="piece" :src="getPiecePathForCell(cellIndex)" />
            </div>
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

.selected-cell {
    background-color: purple;
}

.correct-cell {
    background-color: green;
}

.wrong-cell {
    background-color: red;
}

img.piece {
    width: 100%;
    height: 100%;
    display: flex;
}
</style>