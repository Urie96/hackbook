<template>
  <el-container
    style="margin: 12px 5px 12px 5px; overflow: hidden"
    @click.native="turn"
  >
    <el-aside width="80px">
      <el-image
        style="width: 80px; height: 104px; border-radius: 5px"
        :src="courseItem.image"
        fit="fill"
      >
      </el-image>
    </el-aside>
    <el-main class="right">
      <div class="info">
        <div class="flex-row" style="align-items: center">
          <div class="title">
            {{ courseItem.title }}
          </div>
          <i
            v-if="courseItem.isFavorite"
            style="color: #e6a23c"
            class="el-icon-star-on"
          ></i>
        </div>
        <div class="brief">{{ courseItem.brief }}</div>
      </div>
      <div>
        <el-tag type="info" size="mini" class="author-info">
          {{ courseItem.teacherName }}
        </el-tag>
        <el-tag type="info" size="mini" class="author-info">
          {{ courseItem.teacherTitle }}
        </el-tag>
      </div>
      <div class="flex-row">
        <div>
          <span class="price">{{ courseItem.price }}</span>
          <span class="buy-count">{{ courseItem.purchasedCount }}</span>
        </div>
        <div class="learn">
          <i v-if="!courseItem.done" class="el-icon-loading"> </i>
          {{ isLastStudy ? '继续学习' : '学习' }}
          <i class="el-icon-caret-right"></i>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
export default {
  props: ['courseItem'],
  computed: {
    isLastStudy() {
      return (
        this.courseItem.id ===
        Number(localStorage.getItem('last_study_course_id'))
      );
    },
  },
  methods: {
    turn() {
      this.$router.push({
        name: 'course',
        params: { id: this.courseItem.id },
      });
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
.learn {
  font-size: 10px;
  font-weight: 500;
  color: #606266;
}
.buy-count {
  font-size: 10px;
  color: #606266;
}
.price {
  font-weight: 700;
  color: #ff7452;
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
}
.price:before {
  content: '\FFE5';
  display: inline-block;
  vertical-align: initial;
  font-size: 10px;
  color: #ff7452;
}
.right {
  padding: 0 0 0 10px;
  text-align: left;
  position: relative;
  min-height: 105px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}
.title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #333;
  font-weight: 700;
  /* max-width: 100px; */
}
.brief {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 10px;
  color: #666;
  margin-top: 3px;
  /* max-width: 100px; */
}
.author-info {
  margin-right: 6px;
  max-width: 50%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
