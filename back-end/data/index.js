/* eslint-disable */
const fs = require('fs');

function getData() {
  const db = {
    courses: [],
    sections: [],
    courseIntroduces: [],
    articles: [],
    articleContents: [],
    comments: [],
    blues: [],
  };
  const data1 = JSON.parse(
    fs.readFileSync(`${__dirname}/lagou-db.json`).toString()
  );
  normalize(db, data1);
  const data2 = JSON.parse(
    fs.readFileSync(`${__dirname}/geek-db.json`).toString()
  );
  normalize(db, data2);
  const data3 = JSON.parse(
    fs.readFileSync(`${__dirname}/blue-db.json`).toString()
  );
  db.blues = data3;
  for (let prop in db) {
    console.log(prop, db[prop].length);
  }
  return db;
}

function normalize(db, data) {
  Object.values(data).forEach((course) => {
    db.courses.push(course);
    course.id = db.courses.length;
    const intro = course.courseIntroduce || {};
    delete course.courseIntroduce;
    intro.courseId = course.id;
    db.courseIntroduces.push(intro);
    const sections = course.sections || {};
    delete course.sections;
    course.articleCount = 0;
    course.done = true;
    Object.values(sections).forEach((section) => {
      db.sections.push(section);
      section.id = db.sections.length;
      section.courseId = course.id;
      const articles = section.articles || {};
      delete section.articles;
      Object.values(articles).forEach((article) => {
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

function getData3() {
  const dataPath = 'db4.json';
  const data = JSON.parse(fs.readFileSync(dataPath).toString());
  const db = {
    courses: [],
    sections: [],
    courseIntroduces: [],
    articles: [],
    articleContents: [],
    comments: [],
  };
  Object.values(data).forEach((course) => {
    db.courses.push(course);
    course.id = db.courses.length;
    const intro = course.courseIntroduce || {};
    delete course.courseIntroduce;
    intro.courseId = course.id;
    db.courseIntroduces.push(intro);
    const sections = course.sections || {};
    delete course.sections;
    course.done = true;
    Object.values(sections).forEach((section) => {
      db.sections.push(section);
      section.id = db.sections.length;
      section.courseId = course.id;
      const articles = section.articles || {};
      delete section.articles;
      Object.values(articles)
        .sort((a, b) => a.publishDate - b.publishDate)
        .forEach((article) => {
          db.articles.push(article);
          article.id = db.articles.length;
          article.sectionId = section.id;
          article.courseId = course.id;
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
        });
    });
  });
  for (let prop in db) {
    console.log(prop, db[prop].length);
  }
  return db;
}

function getData2() {
  const dataPath = 'lagou-db.json';
  const data = JSON.parse(fs.readFileSync(dataPath).toString());
  const db = {
    courses: [],
    sections: [],
    courseIntroduces: [],
    articles: [],
    articleContents: [],
    comments: [],
  };

  Object.values(data).forEach((course) => {
    db.courses.push(course);
    course.id = db.courses.length;
    const intro = course.courseIntroduce || {};
    delete course.courseIntroduce;
    intro.courseId = course.id;
    db.courseIntroduces.push(intro);
    const sections = course.sections || {};
    delete course.sections;
    course.articleCount = 0;
    course.done = true;
    Object.values(sections).forEach((section) => {
      db.sections.push(section);
      section.id = db.sections.length;
      section.courseId = course.id;
      const articles = section.articles || {};
      delete section.articles;
      Object.values(articles).forEach((article) => {
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
  for (let prop in db) {
    console.log(prop, db[prop].length);
  }
  return db;
}

module.exports = getData;
