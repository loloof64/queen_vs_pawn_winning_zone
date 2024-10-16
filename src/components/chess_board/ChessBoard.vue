<script setup lang="ts">
interface Props {
    size?: String
};

const { size = "95vmin" } = defineProps<Props>()
</script>

<template>
    <div class="board_root">
        
    </div>
</template>

<style lang="css" scoped>
.board_root {
    width: v-bind(size);
    height: v-bind(size);
    background-color: rgb(48, 39, 179);
}
</style>