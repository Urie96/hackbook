<template>
  <div class="main" v-loading.fullscreen.lock="loading">
    <div class="title">
      {{ article.title }}
    </div>
    <div class="info">{{ article.publishDate }} {{ course.teacherName }}</div>
    <Content :content="content" />
    <el-divider></el-divider>
    <div class="neighbor">
      <el-button
        type="primary"
        plain
        icon="el-icon-arrow-left"
        :disabled="!neighbor.left"
        @click.native="turnToArticle(neighbor.left.id)"
      >
        上一章
      </el-button>
      <el-button
        type="primary"
        plain
        :disabled="!neighbor.right"
        @click.native="turnToArticle(neighbor.right.id)"
      >
        下一章
        <i class="el-icon-arrow-right el-icon--right"></i>
      </el-button>
    </div>
    <el-divider></el-divider>
    <Comment :articleId="id" />
  </div>
</template>

<script>
import Content from './Content.vue';
import Comment from './Comment.vue';

export default {
  props: ['id'],
  data() {
    return {
      article: {},
      content: '',
      loading: true,
      course: {},
      neighbor: {},
    };
  },
  watch: {
    id() {
      this.initData();
    },
  },
  components: { Content, Comment },
  deactivated() {
    this.loading = false;
  },
  methods: {
    addStudyInfo() {
      localStorage.setItem('last_study_course_id', this.course.id);
    },
    async initData() {
      try {
        this.loading = true;
        const data = await this.$axios.get(
          `articles/${this.id}?_embed=articleContents&_embed=comments&_expand=course`
        );
        this.article = data;
        this.content = data.articleContents[0].content;
        this.course = data.course;
        this.addStudyInfo();
        const articles = await this.$axios.get(
          `course/${data.course.id}/articles`
        );
        const index = articles.findIndex((v) => v.id === Number(this.id));
        this.neighbor.left = articles[index - 1];
        this.neighbor.right = articles[index + 1];
        this.loading = false;
      } catch (e) {
        this.$message({
          message: e,
          type: 'error',
        });
      }
    },
    turnToArticle(id) {
      this.$router.replace({
        name: 'article',
        params: { id },
      });
    },
  },
  mounted() {
    this.initData();
  },
};
</script>
<style scoped>
.neighbor {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.main {
  padding: 20px;
  text-align: justify;
}
.title {
  color: #353535;
  font-weight: bold;
  font-size: 22px;
  margin: 5px 0px;
}
.info {
  color: #888;
  font-size: 13px;
  font-weight: 400;
}
</style>