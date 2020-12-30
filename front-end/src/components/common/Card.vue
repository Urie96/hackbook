<template>
  <div class="urie__card">
    <van-image
      lazy-load
      width="5rem"
      height="6.5rem"
      fit="cover"
      :src="$attrs.img"
    />
    <div><slot></slot></div>
  </div>
</template>

<style lang="stylus" scoped>
.urie__card {
  display: flex;
  padding: 0.5rem 1rem;
  height: 6.5rem;

  &>:first-child {
    flex-shrink: 0;
    border-radius: 5px;
    overflow: hidden;
  }

  &>:last-child {
    flex: 1;
    overflow: hidden;
    height: 100%;
    padding-left: 0.5rem;
  }
}
</style>