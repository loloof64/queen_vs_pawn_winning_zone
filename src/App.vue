<script setup lang="ts">
import {Ref, ref} from "vue";
import ChessBoard from "@/components/chess_board/ChessBoard.vue";

const selectedCells: Ref<Array<string>> = ref([]);

function handleCellClick(cellStr: string) {
  if (selectedCells.value.includes(cellStr)) {
    selectedCells.value = selectedCells.value.filter((e) => e !== cellStr);
  }
  else {
    selectedCells.value = [...selectedCells.value, cellStr];
  }
}
</script>

<template>
  <div id="main">
    <ChessBoard size="80vmin" 
    :selectedCells="selectedCells"
    :correctCells="['h2', 'f1']"
    :wrongCells="['h2', 'c1']"
    @cellClick="handleCellClick"
    :interactive="false" />
    <button>Submit</button>
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
html, body, #app {
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