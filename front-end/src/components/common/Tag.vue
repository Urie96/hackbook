<template>
  <span class="urie__tag" :style="{ backgroundColor: getOneColor() }">
    <slot></slot>
  </span>
</template>

<script>
function getOneColor() {
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
  const index = Math.floor(Math.random() * tagColorArr.length);
  return tagColorArr[index];
}

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
  color: #fff;
  transition: all 0.5s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;

  &:hover {
    transform: scale(1.04);
  }
}
</style>
