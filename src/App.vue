<script setup lang="ts">
import { Ref, ref } from "vue";
import ChessBoard from "@/components/chess_board/ChessBoard.vue";
import generate from "./core/generator";
import Exercice from "./core/exercice";

const interactive = ref(false);
const answerMode = ref(false);
const exercice: Ref<Exercice|null> = ref(null);
const selectedCells: Ref<Array<string>> = ref([]);
const correctCells: Ref<Array<string>> = ref([]);
const wrongCells: Ref<Array<string>> = ref([]);
const missingCells: Ref<Array<string>> = ref([]);
const fen = ref("");
const atLeastAGameStarted = ref(false);
const indicationMessage = ref("Please, start a new game.");
const actionMessage = ref("Start a new game");

function handleCellClick(cellStr: string) {
  if (selectedCells.value.includes(cellStr)) {
    selectedCells.value = selectedCells.value.filter((e) => e !== cellStr);
  }
  else {
    selectedCells.value = [...selectedCells.value, cellStr];
  }
}

function throwAction() {
  if (!atLeastAGameStarted.value) {
    startNewGame();
    atLeastAGameStarted.value = true;
  } else if (answerMode.value) {
    startNewGame();
  } else {
    showAnswer();
  }
}

function startNewGame() {
  const ex = generate();
  exercice.value = ex;
  selectedCells.value = [];
  correctCells.value = [];
  wrongCells.value = [];
  missingCells.value = [];
  fen.value = ex.fen;
  interactive.value = true;
  answerMode.value = false;
  actionMessage.value = "Submit";
  indicationMessage.value = "Please, select all correct cells.";
}

function showAnswer() {
  interactive.value = false;
  answerMode.value = true;
  correctCells.value = exercice.value?.getGoodCellsFromSubmission(selectedCells.value) ?? [];
  wrongCells.value = exercice.value?.getWrongCellsFromSubmission(selectedCells.value) ?? [];
  missingCells.value = exercice.value?.getMissingCellsFromSubmission(selectedCells.value) ?? [];
  actionMessage.value = "New game";
  indicationMessage.value = "Here's the answer.";
}
</script>

<template>
  <div id="main">
    <p>
      {{ indicationMessage }}
    </p>
    <ChessBoard v-if="atLeastAGameStarted" size="65vmin" :fen="fen" :selectedCells="selectedCells" :correctCells="correctCells"
      :wrongCells="wrongCells" :missingCells="missingCells" @cellClick="handleCellClick" :interactive="interactive" />
    <button @click="throwAction">{{ actionMessage }}</button>
  </div>
</template>

<style scoped>
#main {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
</style>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
}

:root {
  color: #0f0f0f;
  background-color: #f6f6f6;
}

input,
button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  color: #0f0f0f;
  background-color: #ffffff;
  transition: border-color 0.25s;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  margin: 10px;
}

button {
  cursor: pointer;
}

button:hover {
  border-color: #396cd8;
}

button:active {
  border-color: #396cd8;
  background-color: #e8e8e8;
}

input,
button {
  outline: none;
}

@media (prefers-color-scheme: dark) {
  :root {
    color: #f6f6f6;
    background-color: #2f2f2f;
  }

  input,
  button {
    color: #ffffff;
    background-color: #0f0f0f98;
  }

  button:active {
    background-color: #0f0f0f69;
  }
}
</style>