<template>
  <SWPopup />
  <router-view />
</template>
<script>
import SWPopup from '@/components/pwa/SWPopup.vue';

export default {
  components: { SWPopup },
};
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

.iconfont {
  font-size: inherit;
}

.spin {
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
  display: inline-block;
}

@keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}

.hover-big {
  transition: all 0.5s;

  &:hover {
    transform: scale(1.2) !important;
  }
}

.hover-color {
  transition: all 0.5s;

  &:hover {
    color: var(--theme) !important;
  }
}

.van-nav-bar .van-icon, .van-nav-bar__text {
  color: var(--theme);
}
</style>
