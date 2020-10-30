const request = require('superagent');
const syncDB = require('./db.js');
const asyncPool = require('./asyncPool.js');

function post(url, data) {
  return send('post', url, data);
}

const send = (() => {
  const agent = request.agent().set({
    Origin: 'https://time.geekbang.org',
    'Accept-Encoding': 'gzip, deflate, br',
    Cookie:
      'acw_tc=2760824e16034451035722190e75b2f24fc13a2e88e3012fb10d557a4e478a; gksskpitn=3d9dc94c-436d-4772-9140-8041bb460b38; sajssdk_2015_cross_new_user=1; LF_ID=1603445105205-5038128-3356093; _ga=GA1.2.836727366.1603445105; _gid=GA1.2.868427941.1603445105; Hm_lvt_59c4ff31a9ee6263811b23eb921a5083=1603445105; GCID=5965e5b-4ce8765-267dd73-bda56b1; GRID=5965e5b-4ce8765-267dd73-bda56b1; GCESS=BQIEf6GSXwgBAwEItYIhAAAAAAAEBAAvDQAJAQELAgUABQQAAAAABwScnn1tDAEBCgQAAAAAAwR_oZJfBgTU_iH.; Hm_lpvt_59c4ff31a9ee6263811b23eb921a5083=1603445122; Hm_lvt_022f847c4e3acd44d4a2481d9187f1e6=1603445105,1603445122; Hm_lpvt_022f847c4e3acd44d4a2481d9187f1e6=1603445122; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%222196149%22%2C%22first_id%22%3A%2217554c6a1b3ac9-0bf4049ac280c7-6b3e057d-1296000-17554c6a1b47d0%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_landing_page%22%3A%22https%3A%2F%2Ftime.geekbang.org%2Fcolumn%2Fintro%2F100002201%3Ftab%3Dcatalog%22%7D%2C%22%24device_id%22%3A%2217554c6a1b3ac9-0bf4049ac280c7-6b3e057d-1296000-17554c6a1b47d0%22%7D; SERVERID=1fa1f330efedec1559b3abbcb6e30f50|1603445167|1603445103; gk_process_ev={%22count%22:4%2C%22utime%22:1603445168627%2C%22referrer%22:%22https://account.geekbang.org/%22%2C%22target%22:%22page_course_intro_unbought%22%2C%22referrerTarget%22:%22page_course_intro_unbought%22}    ',
  });
  let userAgent = 0;
  const { todo } = asyncPool(50);
  return async (method, url, data) => {
    let sendFunc;
    if (method === 'post') {
      sendFunc = () =>
        agent
          .set({ 'User-Agent': ++userAgent % 10000 })
          .post(url)
          .send(data);
    } else if (method === 'get') {
      sendFunc = () => agent.get(url);
    }
    try {
      const response = await todo(sendFunc);
      if (response) {
        return response;
      }
      console.log('no response: ', url);
    } catch (e) {
      console.log(e.message);
    }
  };
})();

function getValue(obj, ...path) {
  const get = (o, p) => {
    if (!o[p]) {
      o[p] = {};
    }
    return o[p];
  };
  path.forEach((p) => {
    obj = get(obj, p);
  });
  return obj;
}

async function saveSections(db, id) {
  const url = `https://time.geekbang.org/serv/v1/chapters`;
  const res = await post(url, { cid: id });
  res.body.data.forEach((v) => {
    getValue(db, v.id).name = v.title;
  });
  const chapter_ids = res.body.data.map((v) => v.id);
  {
    const url = `https://time.geekbang.org/serv/v1/column/articles`;
    const res = await post(url, {
      chapter_ids,
      cid: id,
      order: 'earliest',
      prev: 0,
      sample: false,
      size: 500,
    });
    res.body.data.list.forEach((v) => {
      const articleDB = getValue(db, v.chapter_id, 'articles', v.id);
      articleDB.publishDate = new Date(
        1000 * Number(v.article_ctime)
      ).toLocaleDateString();
      articleDB.title = v.article_title;
      articleDB.audio = v.audio_download_url || articleDB.audio;
    });
  }
  console.log(id, 'sections and articles saved');
}

// async function saveArticles(db, id) {
//   const url = `https://time.geekbang.org/serv/v1/column/articles`;
//   const res=await post(url,)
// }

async function saveCourseIntroduce(db, id) {
  if (db.courseIntroduce && db.courseIntroduce.content) {
    // return;
  }
  const res = await post('https://time.geekbang.org/serv/v1/column/intro', {
    cid: id,
  });
  const v = res.body.data;
  db.title = v.column_title;
  db.teacherName = v.author_name;
  db.teacherTitle = v.author_intro;
  db.price = v.column_price / 100;
  db.brief = v.column_subtitle;
  db.image = v.lecture_url;
  db.articleCount = v.article_count;
  db.purchasedCount = v.sub_count;
  db.courseIntroduce = {
    content: v.column_intro,
  };
  console.log(id, 'course intro saved');
}

async function saveArticleContent(db, id) {
  if (db.content) {
    return;
  }
  const url = 'https://time.geekbang.org/serv/v1/article';
  const res = await post(url, {
    id,
    is_freelyread: true,
  });
  if (!res) {
    console.log(id, 'empty response');
    return;
  }
  if (!Array.isArray(res.body.error)) {
    console.log(id, 'not purchased');
    return;
  }
  db.content = res.body.data.article_content;
  console.log(id, '爬取成功');
}

function toLocaleDateString(time) {
  return new Date(1000 * Number(time)).toLocaleDateString();
}

async function saveComments(db, id) {
  if (db.comments) {
    return;
  }
  const url = 'https://time.geekbang.org/serv/v1/comments';
  const res = await post(url, {
    aid: id,
    prev: 0,
  });
  db.comments = res.body.data.list.map((v) => {
    const c = {
      content: v.comment_content,
      date: toLocaleDateString(v.comment_ctime),
      likeCount: v.like_count,
      nickName: v.user_name,
    };
    if (v.replies) {
      c.replies = v.replies.map((r) => ({
        content: r.content,
        date: toLocaleDateString(r.ctime),
        nickName: r.user_name,
      }));
    }
    return c;
  });
  console.log(id, 'comments saved');
}

async function main() {
  const db = syncDB('./db4.json');
  const res = await post(
    'https://time.geekbang.org/serv/v3/lecture/list',
    '{"label_id":0,"type":1}'
  );
  const ids = res.body.data.list.map((v) => v.pid);
  ids.forEach(async (id) => {
    const courseDB = getValue(db, id);
    saveCourseIntroduce(courseDB, id);
    const sectionsDB = getValue(courseDB, 'sections');
    await saveSections(sectionsDB, id);
    Object.values(sectionsDB).forEach((section) => {
      if (!section.articles) {
        console.log(id, 'empty articles');
        return;
      }
      Object.keys(section.articles).forEach((aid) => {
        const articleDB = section.articles[aid];
        saveArticleContent(articleDB, aid);
        saveComments(articleDB, aid);
      });
    });
  });
}
main();

// post('https://time.geekbang.org/serv/v1/article', {
//   id: 471,
//   is_freelyread: true,
// }).then((data) => {
//   console.log(data.body);
// });
