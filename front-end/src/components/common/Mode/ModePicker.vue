<template>
  <div class="mode-options">
    <h4 class="title">Choose mode</h4>
    <ul class="color-mode-options">
      <li
        v-for="(mode, index) in modeOptions"
        :key="index"
        :class="{ active: mode.mode === currentMode }"
        @click="currentMode = mode.mode"
      >
        {{ mode.title }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';

enum Mode {
  DARK = 'dark',
  AUTO = 'auto',
  LIGHT = 'light',
}

const render = (mode: Mode) => {
  switch (mode) {
    case Mode.DARK:
      document.body.classList.add('dark');
      break;
    case Mode.LIGHT:
      document.body.classList.remove('dark');
  }
};

const applyMode = (() => {
  let interval: NodeJS.Timeout;
  return (mode: Mode) => {
    if (mode === Mode.AUTO) {
      const auto = () => {
        const hour = new Date().getHours();
        render(hour < 6 || hour >= 18 ? Mode.DARK : Mode.LIGHT);
      };
      interval = setInterval(auto, 1000 * 60);
      auto();
    } else {
      clearInterval(interval);
      render(mode);
    }
  };
})();

export default defineComponent({
  setup() {
    const modeOptions = ref([
      { mode: Mode.DARK, title: 'dark' },
      { mode: Mode.AUTO, title: 'auto' },
      { mode: Mode.LIGHT, title: 'light' },
    ]);
    const currentMode = ref(Mode.AUTO);

    const savedMode: unknown = localStorage.getItem('mode');
    if (savedMode) {
      currentMode.value = savedMode as Mode;
    }

    const getClass = (mode: Mode) =>
      mode !== currentMode.value ? mode : `${mode} active`;

    watchEffect(() => {
      applyMode(currentMode.value);
      localStorage.setItem('mode', currentMode.value as string);
    });

    return { modeOptions, currentMode, getClass };
  },
});
</script>

<style lang="stylus">
.mode-options {
  background-color: var(--background-color);
  min-width: 125px;
  margin: 0;
  padding: 1em;
  box-shadow: var(--box-shadow);
  border-radius: $borderRadius;

  .title {
    margin-top: 0;
    margin-bottom: 0.6rem;
    font-weight: bold;
    color: var(--text-color);
  }

  .color-mode-options {
    display: flex;
    flex-wrap: wrap;

    li {
      text-align: center;
      font-size: 12px;
      color: var(--text-color);
      line-height: 18px;
      padding: 3px 6px;
      border-top: 1px solid #666;
      border-bottom: 1px solid #666;
      background-color: var(--background-color);
      cursor: pointer;
      $borderRadius = 0.25rem;

      &:first-child {
        border-radius: $borderRadius 0 0 $borderRadius;
        border-left: 1px solid #666;
      }

      &:last-child {
        border-radius: 0 $borderRadius $borderRadius 0;
        border-right: 1px solid #666;
      }

      &.active {
        background-color: var(--theme);
        color: #fff;
      }

      &:not(.active) {
        border-right: 1px solid #666;
      }
    }
  }
}
</style>
