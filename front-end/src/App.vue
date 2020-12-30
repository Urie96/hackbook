<template>
  <router-view />
</template>
<script>
</script>
<style lang="stylus">
#app {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

.oneline {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

:root {
  --heart: #ff6666;
  --price: #ff7452;
  --theme: #3eaf7c;
}

.c-primary {
  color: var(--theme);
}

.c-warn {
  color: #e67e22;
}

.van-cell__title {
  overflow: hidden;
}
</style>
