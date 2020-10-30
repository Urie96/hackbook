<template>
  <div
    v-loading="loading"
    style="min-height: 200px"
    v-html="content"
    id="introduce"
  ></div>
</template>
<script>
export default {
  props: ['courseId'],
  data() {
    return {
      loading: true,
      content: '',
    };
  },
  watch: {
    courseId() {
      this.init();
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      try {
        this.loading = true;
        const [data] = await this.$axios.get(
          `courses/${this.courseId}/courseIntroduces?_limit=1`
        );
        if (data) {
          this.content = data.content;
        }
      } catch (e) {
        this.$message({
          message: e,
          type: 'error',
        });
      }
    },
    turnToArticle(id) {
      this.$router.push({
        name: 'article',
        params: { id },
      });
    },
  },
};
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