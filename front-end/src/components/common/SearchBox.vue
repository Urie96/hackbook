<template>
  <div class="search-box">
    <input
      ref="input"
      aria-label="Search"
      :value="modelValue"
      :class="{ focus: focused || modelValue }"
      :placeholder="placeholder"
      autocomplete="off"
      spellcheck="false"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="focused = true"
      @blur="focused = false"
    />
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: ['modelValue', 'placeholder'],
  emits: ['update:modelValue'],
  setup() {
    const focused = ref(false);
    return { focused };
  },
};
</script>

<style lang="stylus" scoped>
$accentColor ?= var(--theme);
$textColor ?= #2c3e50;
$borderColor ?= #eaecef;
$codeBgColor ?= #282c34;
$arrowBgColor ?= #ccc;
$badgeTipColor ?= #42b983;
$badgeWarningColor ?= darken(#ffe564, 35%);
$badgeErrorColor ?= #DA5961;
$MQNarrow ?= 959px;
$MQMobile ?= 719px;
$MQMobileNarrow ?= 419px;

.search-box {
  display: inline-block;
  position: relative;

  input {
    cursor: text;
    width: 10rem;
    height: 2rem;
    color: lighten($textColor, 25%);
    display: inline-block;
    border: 1px solid darken($borderColor, 10%);
    border-radius: 2rem;
    font-size: 0.9rem;
    line-height: 2rem;
    padding: 0 0.5rem 0 2rem;
    outline: none;
    transition: all 0.2s ease;
    background: var(--background-color) url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='13'%3e%3cg stroke-width='2' stroke='%23aaa' fill='none'%3e%3cpath d='M11.29 11.71l-4-4'/%3e%3ccircle cx='5' cy='5' r='4'/%3e%3c/g%3e%3c/svg%3e") 0.6rem 0.5rem no-repeat;
    background-size: 1rem;

    &.focus {
      cursor: auto;
      border-color: $accentColor;
    }
  }
}

@media (max-width: $MQNarrow) {
  .search-box {
    input {
      cursor: pointer;
      width: 0;
      border-color: transparent;
      position: relative;

      &.focus {
        cursor: text;
        left: 0;
        width: 10rem;
      }
    }
  }
}

@media (max-width: $MQMobile) {
  .search-box {
    margin-right: 0;
  }
}

@media (max-width: $MQMobileNarrow) {
  .search-box {
    input.focus {
      width: 8rem;
    }
  }
}
</style>