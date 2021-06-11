import { partial, requester } from './tools';
import {
  Article,
  Course,
  CourseDescription,
  Section,
  ArticleContent,
  ArticleComment,
} from '../models';
import { init, has, save } from './dao';

const header = {
  'x-l-req-header': '{deviceType:1}',
  cookie:
    'gate_login_token=7fdf0b2967573fcbb9ef1fa613873fde81701a47799d8f2caa4233631bee13c3',
};

const toLagouId = (id: any) => (id ? 'L' + id : undefined);

const { get } = requester(header);

saveCourseList();

async function saveCourseList() {
  await init();
  const res = await get(
    'https://gate.lagou.com/v1/neirong/edu/homepage/getCourseList?deviceSourceCode=2'
  );
  const courseList = res.body.content.courseCardList[0].courseList as any[];
  console.log('拉勾现在课程数：' + courseList.length);
  courseList.forEach((c) => {
    const course = partial(
      c,
      new Course(),
      'teacherName',
      'teacherTitle',
      'title',
      'brief',
      'image'
    );
    course.id = toLagouId(c.id);
    course.purchasedCount = c.pruchasedCount.match(/[\d.w]+/)?.[0] || '';
    course.price = Number(c.price.match(/\d+/)?.[0]);
    save(course);
    saveDecorateDescription(c.id);
    saveCourseLessons(c.id);
  });
}

async function saveDecorateDescription(courseID: number) {
  const data = await get(
    `https://gate.lagou.com/v1/neirong/kaiwu/getCourseDescription?courseId=${courseID}`
  );
  let content = '';
  data.body.content.courseDescription.forEach((v: any) => {
    content += `<h3>${v.title}</h3>`;
    switch (v.type) {
      case 'image':
        content += `<img src="${v.content[0]}">`;
        break;
      case 'text':
        v.content.map((str, i) => `<p>${i + 1}. ${str}</p>`);
        content += `<img src="${v.content[0]}">`;
        break;
      case 'teacher':
        // console.log(v.content);
        content += JSON.parse(v.content[0]).description;
        break;
      default:
        content += v.content[0];
    }
  });
  const description = new CourseDescription();
  description.content = content;
  description.courseId = toLagouId(courseID);
  save(description);
}

async function saveCourseLessons(courseID) {
  const res = await get(
    `https://gate.lagou.com/v1/neirong/kaiwu/getCourseLessons?courseId=${courseID}`
  );
  res.body?.content?.courseSectionList?.forEach(async (s) => {
    const section = new Section();
    section.courseId = toLagouId(courseID);
    section.id = toLagouId(s.id);
    section.title = s.sectionName;
    await save(section);
    s.courseLessons.forEach(async (a) => {
      const article = new Article();
      article.id = toLagouId(a.id);
      article.sectionId = toLagouId(s.id);
      article.title = a.theme;
      article.publishDate = '';
      await save(article);
      await saveArticleContent(article, a.id);
      saveLessonComments(article, courseID, a.id);
    });
  });
}

async function saveArticleContent(article: Article, articleId) {
  if (has({ articleContentId: article.id })) return;
  const url = `https://gate.lagou.com/v1/neirong/kaiwu/getCourseLessonDetail?lessonId=${articleId}`;
  const res = await get(url);
  try {
    article.publishDate = res.body.content?.publishDate;
    if (article.publishDate) {
      await save(article);
    }
    const content = new ArticleContent();
    content.articleId = toLagouId(articleId);
    content.content = res.body.content.textContent;
    if (!content.content) {
      console.log(articleId, 'failed because of empty text content');
    } else {
      await save(content);
      console.log(articleId, '爬取成功');
    }
  } catch (error) {
    console.log(articleId, error.message);
  }
}

async function saveLessonComments(article: Article, courseId, articleId) {
  const data = await get(
    `https://gate.lagou.com/v1/neirong/course/comment/getCourseCommentList?courseId=${courseId}&lessonId=${articleId}&pageNum=1`
  );
  try {
    data.body.content.courseCommentList.forEach(async (comment) => {
      const ac = new ArticleComment();
      ac.id = toLagouId(comment.commentId);
      ac.content = comment.comment;
      ac.likeCount = Number(comment.likeCount);
      ac.nickName = comment.nickName;
      ac.article = article;
      await ac.save();
      const reply = comment.replayComment;
      if (reply) {
        const r = new ArticleComment();
        r.parentComment = ac;
        r.nickName = reply.nickName;
        r.id = toLagouId(reply.commentId);
        r.content = reply.comment;
        r.likeCount = Number(reply.likeCount);
        await save(r);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
}
