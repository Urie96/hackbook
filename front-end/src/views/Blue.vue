<template>
  <div class="main">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>
<style scoped>
.main {
  margin: 0 auto;
  max-width: 700px;
}
</style>