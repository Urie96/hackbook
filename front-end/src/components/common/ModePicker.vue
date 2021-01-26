<template>
  <div class="color-picker">
    <div class="color-button middle" @click="showMenu = !showMenu">
      <svg
        class="skin-icon"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M224 800c0 9.6 3.2 44.8 6.4 54.4 6.4 48-48 76.8-48 76.8s80 41.6 147.2 0 134.4-134.4
          38.4-195.2c-22.4-12.8-41.6-19.2-57.6-19.2C259.2 716.8 227.2 761.6 224 800zM560 675.2l-32
          51.2c-51.2 51.2-83.2 32-83.2 32 25.6 67.2 0 112-12.8 128 25.6 6.4 51.2 9.6 80 9.6 54.4 0
          102.4-9.6 150.4-32l0 0c3.2 0 3.2-3.2 3.2-3.2 22.4-16 12.8-35.2
          6.4-44.8-9.6-12.8-12.8-25.6-12.8-41.6 0-54.4 60.8-99.2 137.6-99.2 6.4 0 12.8 0 22.4
          0 12.8 0 38.4 9.6 48-25.6 0-3.2 0-3.2 3.2-6.4 0-3.2 3.2-6.4 3.2-6.4 6.4-16 6.4-16 6.4-19.2
          9.6-35.2 16-73.6 16-115.2 0-105.6-41.6-198.4-108.8-268.8C704 396.8 560 675.2 560 675.2zM224
          419.2c0-28.8 22.4-51.2 51.2-51.2 28.8 0 51.2 22.4 51.2 51.2 0 28.8-22.4 51.2-51.2 51.2C246.4
          470.4 224 448 224 419.2zM320 284.8c0-22.4 19.2-41.6 41.6-41.6 22.4 0 41.6 19.2 41.6 41.6 0
          22.4-19.2 41.6-41.6 41.6C339.2 326.4 320 307.2 320 284.8zM457.6 208c0-12.8 12.8-25.6 25.6-25.6
          12.8 0 25.6 12.8 25.6 25.6 0 12.8-12.8 25.6-25.6 25.6C470.4 233.6 457.6 220.8 457.6 208zM128
          505.6C128 592 153.6 672 201.6 736c28.8-60.8 112-60.8 124.8-60.8-16-51.2 16-99.2
          16-99.2l316.8-422.4c-48-19.2-99.2-32-150.4-32C297.6 118.4 128 291.2 128 505.6zM764.8
          86.4c-22.4 19.2-390.4 518.4-390.4 518.4-22.4 28.8-12.8 76.8 22.4 99.2l9.6 6.4c35.2 22.4
          80 12.8 99.2-25.6 0 0 6.4-12.8 9.6-19.2 54.4-105.6 275.2-524.8 288-553.6
          6.4-19.2-3.2-32-19.2-32C777.6 76.8 771.2 80 764.8 86.4z"
        />
      </svg>
    </div>
    <transition mode="out-in" name="menu-transition">
      <div v-show="showMenu" class="color-picker-menu">
        <div class="mode-options">
          <h4 class="title">Choose mode</h4>
          <ul class="color-mode-options">
            <li
              v-for="(mode, index) in modeOptions"
              :key="index"
              :class="{ active: mode.mode === currentMode }"
              @click="clickMode(mode.mode)"
            >
              {{ mode.title }}
            </li>
          </ul>
        </div>
      </div>
    </transition>
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
    const showMenu = ref(false);
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

    const clickMode = (mode: Mode) => {
      currentMode.value = mode;
      showMenu.value = false;
      localStorage.setItem('mode', currentMode.value as string);
    };

    watchEffect(() => {
      applyMode(currentMode.value);
    });

    return { showMenu, modeOptions, currentMode, getClass, clickMode };
  },
});
</script>

<style lang="stylus">
$borderRadius = 0.25rem;

.color-picker {
  position: relative;
  margin-right: 1em;
  cursor: pointer;

  .color-button {
    align-items: center;
    height: 100%;

    svg {
      width: 1.5rem;
      fill: var(--theme);
    }
  }

  .color-picker-menu {
    position: absolute;
    top: 40px;
    right: 10%;
    z-index: 150;

    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
    }

    &.menu-transition-enter-active, &.menu-transition-leave-active {
      transition: all 0.25s;
    }

    &.menu-transition-enter, &.menu-transition-leave-to {
      top: 30px;
      opacity: 0;
    }

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
  }
}
</style>
