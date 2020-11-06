/* eslint-disable */
const fs = require('fs');
const { LAGOU_PATH, GEEK_PATH, BLUE_PATH } = require('../constants');

function normalize(db, data) {
  Object.values(data).forEach((course) => {
    db.courses.push(course);
    course.id = db.courses.length;
    const intro = course.courseIntroduce || {};
    delete course.courseIntroduce;
    intro.courseId = course.id;
    db.courseIntroduces.push(intro);
    const sections = Object.values(course.sections || {});
    delete course.sections;
    course.articleCount = 0;
    course.done = true;
    // sort sections
    sections.forEach((s) => {
      // console.log(s.articles);
      s.sortTag = Math.max(
        Object.values(s.articles || {}).map((a) => Date.parse(a.publishDate))
      );
    });
    sections.sort((a, b) => a.sortTag - b.sortTag);
    sections.forEach((section) => {
      delete section.sortTag;
      db.sections.push(section);
      section.id = db.sections.length;
      section.courseId = course.id;
      const articles = Object.values(section.articles || {});
      delete section.articles;
      // sort articles
      articles.sort(
        (a, b) => Date.parse(a.publishDate) - Date.parse(b.publishDate)
      );
      articles.forEach((article) => {
        db.articles.push(article);
        course.articleCount++;
        article.id = db.articles.length;
        article.courseId = course.id;
        article.sectionId = section.id;
        if (article.content) {
          db.articleContents.push({
            content: article.content,
            articleId: article.id,
          });
          article.done = true;
          delete article.content;
        } else {
          course.done = false;
        }
        const comments = article.comments || [];
        delete article.comments;
        comments.forEach((comment) => {
          db.comments.push(comment);
          comment.id = db.comments.length;
          comment.articleId = article.id;
          const replies = comment.replies || [];
          delete comment.replies;
          replies.forEach((reply) => {
            db.comments.push(reply);
            reply.commentId = comment.id;
          });
        });
      });
    });
  });
}

module.exports = () => {
  const db = {
    courses: [],
    sections: [],
    courseIntroduces: [],
    articles: [],
    articleContents: [],
    comments: [],
    blues: [],
  };
  const data1 = JSON.parse(fs.readFileSync(GEEK_PATH).toString());
  normalize(db, data1);
  const data2 = JSON.parse(fs.readFileSync(LAGOU_PATH).toString());
  normalize(db, data2);
  const data3 = JSON.parse(fs.readFileSync(BLUE_PATH).toString());
  db.blues = data3;
  for (let prop in db) {
    console.log(prop, db[prop].length);
  }
  return db;
};
