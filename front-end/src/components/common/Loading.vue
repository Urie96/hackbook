<template>
  <van-overlay :show="$attrs.loading" lock-scroll>
    <div class="wrapper">
      <van-loading type="spinner" size="48" />
    </div>
  </van-overlay>
</template>

<style lang="stylus" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
