<template>
  <div>
    <div class="head" v-loading="loading">
      <el-container>
        <el-aside width="80px" style="height: 108px">
          <el-image :src="courseInfo.image" fit="fill"> </el-image>
        </el-aside>
        <el-main>
          <div>
            <div class="title">{{ courseInfo.title }}</div>
            <div class="brief">{{ courseInfo.brief }}</div>
          </div>
          <div class="flex-row">
            <div class="author">讲师：{{ courseInfo.teacherName }}</div>
            <el-button
              :disabled="disableStar"
              size="mini"
              :type="favorite ? 'warning' : 'info'"
              icon="el-icon-star-off"
              @click.native="star"
              circle
            ></el-button>
          </div>
        </el-main>
      </el-container>
      <el-tag class="study-info">
        <div>共{{ courseInfo.articleCount }}讲</div>
        <div>{{ courseInfo.purchasedCount }}</div>
      </el-tag>
    </div>

    <el-tabs :stretch="true" value="category">
      <el-tab-pane label="简介" name="introduce">
        <Introduce :courseId="id" />
      </el-tab-pane>
      <el-tab-pane label="目录" name="category" class="111">
        <Category :courseId="id" />
      </el-tab-pane>
    </el-tabs>

    <el-backtop :right="20" :bottom="20"></el-backtop>
  </div>
</template>

<script>
import Category from './Category.vue';
import Introduce from './Introduce.vue';

export default {
  props: ['id'],
  name: 'Main',
  data() {
    return {
      loading: true,
      courseInfo: {},
      favorite: 0,
      disableStar: true,
    };
  },
  components: { Category, Introduce },
  watch: {
    id() {
      this.initData();
    },
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.loading = true;
      this.favorite = 0;
      this.$axios.get(`/courses/${this.id}`).then((data) => {
        this.courseInfo = data;
        this.loading = false;
      });
      this.$axios
        .get(`/userservice/favorites?courseId=${this.id}`)
        .then((data) => {
          this.favorite = data[0]?.id;
          this.disableStar = false;
        });
    },
    star() {
      this.disableStar = true;
      if (!this.favorite) {
        this.$axios
          .post(`/userservice/favorites`, {
            courseId: Number(this.id),
          })
          .then((data) => {
            this.favorite = data.id;
            this.$message.success('收藏成功');
            this.disableStar = false;
          });
      } else {
        this.$axios
          .delete(`/userservice/favorites/${this.favorite}`)
          .then(() => {
            this.favorite = 0;
            this.$message.success('取消收藏');
            this.disableStar = false;
          });
      }
    },
  },
};
</script>
<style scoped>
.flex-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.tab-container {
  padding: 0 0.533rem;
}
.study-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 49px;
  margin-top: 15px;
  padding: 0 13px;
  font-size: 14px;
  font-weight: 400;
}
.el-image {
  border-radius: 5px;
}
.head {
  padding: 20px 20px 17px 20px;
}
.el-main {
  text-align: left;
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 14px;
  padding: 4px 0;
  overflow: hidden;
}
.title {
  font-size: 19px;
  font-weight: 500;
  line-height: 1.2;
}
.brief {
  margin-top: 4px;
  margin-right: 10px;
  font-size: 1px;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.author {
  font-size: 12px;
  font-weight: 400;
}
</style>
<style>
.el-tabs__header {
  margin-bottom: 0;
}
.el-collapse-item__content {
  padding-bottom: 0;
}
</style>