<template>
  <span class="urie__tag" :style="{ backgroundColor: getOneColor() }">
    <slot></slot>
  </span>
</template>

<script>
const getOneColor = (() => {
  const tagColorArr = [
    '#e15b64',
    '#f47e60',
    '#f8b26a',
    '#abbd81',
    '#849b87',
    '#e15b64',
    '#f47e60',
    '#f8b26a',
    '#f26d6d',
    '#67cc86',
    '#fb9b5f',
    '#3498db',
  ];
  return () => tagColorArr[Math.floor(Math.random() * tagColorArr.length)];
})();

export default {
  setup() {
    return { getOneColor };
  },
};
</script>

<style lang="stylus">
span.urie__tag {
  vertical-align: middle;
  margin: 0.25rem;
  padding: 0.15rem 0.4rem;
  border-radius: 0.25rem;
  color: var(--background-color);
  transition: all 0.5s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  opacity: var(--color-opacity, 1);

  &:hover {
    transform: scale(1.04);
  }
}
</style>
