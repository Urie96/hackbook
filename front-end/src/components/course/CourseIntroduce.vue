<template>
  <div v-html="course.description" id="introduce"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { course } from './store';

export default defineComponent({
  setup() {
    return { course };
  },
});
</script>

<style>
#introduce {
  text-align: left;
  padding: 0 1rem;
  margin: 20px 0;
}
#introduce h1,
h2 {
  line-height: 1.35;
  margin: 50px 0 13px 0;
  font-size: 23px;
  font-weight: 700;
}
#introduce p,
li {
  font-size: 15px;
  font-weight: 400;
  white-space: normal;
  word-break: break-word;
  line-height: 28px;
  margin: 0;
  padding: 0;
}
#introduce ul {
  padding-inline-start: 20px;
}
#introduce a {
  list-style: decimal;
  line-height: 28px;
  font-size: 15px;
  font-weight: 400;
  word-break: break-word;
  white-space: normal;
  color: #fa8919;
  text-decoration: none !important;
  border-bottom: 1px solid #fa8919;
}
#introduce img {
  max-width: 100%;
  height: auto;
}
</style>