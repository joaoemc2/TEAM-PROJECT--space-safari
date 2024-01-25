<script setup lang="ts"></script>

<template>
  <div class="menu-fundo"></div>
  <main class="menu-lateral"></main>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.menu-fundo {
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  z-index: 998;
  background-color: black;
  opacity: 0.2;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}
.menu-lateral {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 300px;
  height: 100%;
  min-height: 100vh;
  z-index: 998;
  background-color: red;
  z-index: 999;
}
</style>
