const request = require('superagent');
const syncDB = require('./db.js');
const asyncPool = require('./asyncPool.js');

const dbPath = '../back-end/data/lagou-db.json'
const Cookie = 'gate_login_token=d527dc38cff1ebaa7821b5f9bd6bd93b820e588d9b8aa0eb7db6e00028296c62'

let db = null;

async function saveCourseList() {
  db = syncDB(dbPath);
  const res = await get(
    'https://gate.lagou.com/v1/neirong/edu/homepage/getCourseList?deviceSourceCode=2'
  );
  const { courseList } = res.body.content.courseCardList[0];

  courseList.forEach((course) => {
    db[course.id] = {
      ...(db[course.id] || {}),
      title: course.title,
      brief: course.brief,
      image: course.image,
      teacherName: course.teacherName,
      teacherTitle: course.teacherTitle,
      price: Number(course.price.match(/\d+/)?.[0]),
      purchasedCount: course.pruchasedCount,
    };
  });

  courseList.forEach((course) => {
    const courseDB = db[course.id];
    // freePurchase(course.id);
    if (!courseDB.courseIntroduce) {
      saveDecorateDescription(courseDB, course.id);
    }
    saveCourseLessons(courseDB, course.id);
  });
}

async function saveLessonDetail(articleDB, articleId) {
  const url = `https://gate.lagou.com/v1/neirong/kaiwu/getCourseLessonDetail?lessonId=${articleId}`;
  const res = await get(url);
  if (!res) {
    console.log(articleId, 'failed because of empty res');
    return;
  }
  if (!res.body) {
    console.log(articleId, 'failed because of empty res body');
    return;
  }
  if (!res.body.content) {
    console.log(articleId, 'failed because of empty res body content');
    return;
  }
  articleDB.publishDate = res.body.content.publishDate;
  if (!res.body.content.textContent) {
    console.log(articleId, 'failed because of empty text content');
  }
  articleDB.content = res.body.content.textContent;
  console.log(articleId, '爬取成功');
}

async function saveLessonComments(articleDB, courseID, lessonID) {
  const data = await get(
    `https://gate.lagou.com/v1/neirong/course/comment/getCourseCommentList?courseId=${courseID}&lessonId=${lessonID}&pageNum=1`
  );
  if (!data) {
    return;
  }
  articleDB.comments = data.body.content.courseCommentList.map((comment) => {
    const commentDB = {
      content: comment.comment,
      likeCount: comment.likeCount,
      nickName: comment.nickName,
    };
    const reply = comment.replayComment;
    if (reply) {
      commentDB.replies = [
        {
          nickName: reply.nickName,
          content: reply.comment,
          likeCount: reply.likeCount,
        },
      ];
    }
    return commentDB;
  });
}

async function saveDecorateDescription(courseDB, courseID) {
  const data = await get(
    `https://gate.lagou.com/v1/neirong/kaiwu/getCourseDescription?courseId=${courseID}`
  );
  let content = '';
  data.body.content.courseDescription.forEach((v) => {
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
        content += JSON.parse(v.content).description;
        break;
      default:
        content += v.content[0];
    }
  });
  // console.log(content);
  if (content.length > 0) {
    courseDB.courseIntroduce = {
      content,
    };
  }
}

async function saveCourseLessons(courseDB, courseID) {
  const res = await get(
    `https://gate.lagou.com/v1/neirong/kaiwu/getCourseLessons?courseId=${courseID}`
  );
  const { content } = res.body;
  courseDB.sections = courseDB.sections || {};
  const sectionsDB = courseDB.sections;
  content.courseSectionList.forEach((section) => {
    sectionsDB[section.id] = sectionsDB[section.id] || {};
    const sectionDB = sectionsDB[section.id];
    sectionDB.name = section.sectionName;
    sectionDB.articles = sectionDB.articles || {};
    const articlesDB = sectionDB.articles;
    section.courseLessons.forEach((article) => {
      articlesDB[article.id] = articlesDB[article.id] || {};
      const articleDB = articlesDB[article.id];
      articleDB.title = article.theme;
      if (!articleDB.content) {
        saveLessonDetail(articleDB, article.id);
      }
      if (!articleDB.comments) {
        saveLessonComments(articleDB, courseID, article.id);
      }
    });
  });
}

// eslint-disable-next-line no-unused-vars
async function freePurchase(courseID) {
  await get(
    `https://gate.lagou.com/v1/neirong/edu/member/drawCourse?courseId=${courseID}`
  );
}

const get = (() => {
  const agent = request.agent().set({
    'x-l-req-header': '{deviceType:1}',
    cookie: Cookie,
  });
  const { todo } = asyncPool(50);
  return async (url) => {
    const sendFunc = () => agent.get(url);
    try {
      const response = await todo(sendFunc);
      if (response) {
        return response;
      }
      console.log('no response: ', url);
    } catch (e) {
      if (e.response) {
        const err = e.response.text;
        console.log(url, err.substring(0, err.indexOf(`\n`)));
      } else {
        console.log(url, e);
      }
    }
  };
})();

saveCourseList();
