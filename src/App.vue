<script setup lang="ts">
import { useTranslation } from "i18next-vue";
const { t } = useTranslation();
import { Ref, ref } from "vue";
import ChessBoard from "@/components/chess_board/ChessBoard.vue";
import Modal from "@/components/Modal.vue";
import generate from "@/core/generator";
import Exercice from "@/core/exercice";

const interactive = ref(false);
const answerMode = ref(false);
const exercice: Ref<Exercice | null> = ref(null);
const selectedCells: Ref<Array<string>> = ref([]);
const correctCells: Ref<Array<string>> = ref([]);
const wrongCells: Ref<Array<string>> = ref([]);
const missingCells: Ref<Array<string>> = ref([]);
const fen = ref("");
const atLeastAGameStarted = ref(false);
const indicationMessage = ref(t("indication-start"));
const actionMessage = ref(t("action-start"));
const legendModalActive = ref(false);
const explanationsModalActive = ref(false);

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
  actionMessage.value = t("action-submit");
  indicationMessage.value = t("indication-game");
}

function showAnswer() {
  interactive.value = false;
  answerMode.value = true;
  correctCells.value = exercice.value?.getGoodCellsFromSubmission(selectedCells.value) ?? [];
  wrongCells.value = exercice.value?.getWrongCellsFromSubmission(selectedCells.value) ?? [];
  missingCells.value = exercice.value?.getMissingCellsFromSubmission(selectedCells.value) ?? [];
  actionMessage.value = t("action-start");
  indicationMessage.value = t("indication-answer");
}

function showLegendModal() {
  legendModalActive.value = true;
}

function closeLegendModal() {
  legendModalActive.value = false;
}

function showExplanations() {
  explanationsModalActive.value = true;
}

function closeExplanationsModal() {
  explanationsModalActive.value = false;
}
</script>

<template>
  <div id="main">
    <p>
      {{ indicationMessage }}
      <button v-if="answerMode" @click="showLegendModal">{{ t("action-see-legend") }}</button>
      <button v-else-if="atLeastAGameStarted" @click="showExplanations">{{ t("action-see-explanations") }}</button>
    </p>
    <ChessBoard v-if="atLeastAGameStarted" size="65vmin" :fen="fen" :selectedCells="selectedCells"
      :correctCells="correctCells" :wrongCells="wrongCells" :missingCells="missingCells" @cellClick="handleCellClick"
      :interactive="interactive" />
    <button @click="throwAction">{{ actionMessage }}</button>

    <Teleport to="body">
      <modal :show="legendModalActive" @close="closeLegendModal">
        <template #header>
          <h3>{{ t("legend-title") }}</h3>
        </template>

        <template #body>
          <div class="legend-modal-body">
            <div class="legend-color bg-green"></div>
            <p>{{  t("legend-correct") }}</p>
          </div>
          <div class="legend-modal-body">
            <div class="legend-color bg-red"></div>
            <p>{{  t("legend-wrong") }}</p>
          </div>
          <div class="legend-modal-body">
            <div class="legend-color bg-gray"></div>
            <p>{{  t("legend-missing") }}</p>
          </div>
        </template>

        <template #footer>
          <div class="legend-footer">
            <button @click="closeLegendModal">{{ t("action-close-modal") }}</button>
          </div>
        </template>
      </modal>
    </Teleport>

    <Teleport to="body">
      <modal :show="explanationsModalActive" @close="closeExplanationsModal">
        <template #header>
          <h3>{{ t("explanations-title") }}</h3>
        </template>

        <template #body>
          <p class="explanation">{{ t("explanations-content-1") }}</p>
          <p class="explanation">{{ t("explanations-content-2") }}</p>
          <p class="explanation">{{ t("explanations-content-3") }}</p>
        </template>

        <template #footer>
          <div class="explanations-footer">
            <button @click="closeExplanationsModal">{{ t("action-close-modal") }}</button>
          </div>
        </template>
      </modal>
    </Teleport>
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

.legend-modal-body {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.legend-color {
  display: block;
  width: 5vmin;
  height: 5vmin;
  margin: 10px;
  border: 2px solid black;
}


.legend-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}

.bg-green {
  background-color: green;
}

.bg-red {
  background-color: red;
}

.bg-gray {
  background-color: gray;
}

p.explanation {
  font-size: x-small;
}


.explanations-footer {
  display: flex;
  justify-content: center;
  align-items: center;
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