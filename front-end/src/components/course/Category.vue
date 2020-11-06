<template>
  <el-collapse
    accordion
    v-model="lastSectionId"
    v-loading="loading"
    style="min-height: 200px; padding: 0 1rem"
  >
    <el-collapse-item
      :name="section.id"
      v-for="section of sections"
      :key="section.id"
    >
      <template slot="title">
        <div class="section">
          {{ section.name }}（{{ section.articles.length }}讲）
        </div>
      </template>
      <div
        class="lesson-item"
        v-for="article of section.articles"
        :key="article.id"
        :style="article.done || { color: '#999' }"
        @click="article.done ? turnToArticle(article.id) : void 0"
      >
        <div style="padding-right: 30px">
          {{ article.title }}
        </div>
        <i :class="getClass(article)"></i>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>
<script>
/*eslint-disable*/
export default {
  props: ['courseId'],
  data() {
    return {
      loading: true,
      sections: [],
      lastArticleId: 0,
      lastSectionId: 0,
    };
  },
  computed: {
    getClass() {
      return (article) => {
        if (article.id === this.lastArticleId) {
          return 'el-icon-video-pause bold';
        }
        if (article.done) {
          return 'el-icon-video-play';
        }
        return 'el-icon-lock';
      };
    },
  },
  watch: {
    courseId() {
      this.init();
    },
  },
  activated() {
    this.lastArticleId = Number(
      localStorage.getItem(`course_${this.courseId}_last_study_article_id`)
    );
    this.lastSectionId = Number(
      localStorage.getItem(`course_${this.courseId}_last_study_section_id`)
    );
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      this.loading = true;
      const data = await this.$axios.get(
        `courses/${this.courseId}/sections?_embed=articles`
      );
      this.sections = data;
      if (!this.lastSectionId) {
        this.lastSectionId = this.sections[0].id;
      }
      this.loading = false;
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
<style scoped>
i {
  font-size: 15px;
  color: gray;
}
.lesson-item {
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
}
.section {
  max-width: 100%;
  font-weight: 700;
  font-size: 15px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 0.64rem 0 0.507rem;
}
.bold {
  font-weight: bolder;
  font-size: 20px;
}
</style>