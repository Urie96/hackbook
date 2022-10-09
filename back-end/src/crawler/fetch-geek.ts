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
  Origin: 'https://time.geekbang.org',
  Cookie:
    'gksskpitn=939cae7f-3604-4ca5-b46a-50098e46090d; sajssdk_2015_cross_new_user=1; LF_ID=1641958283766-5666122-2043241; GCID=f1148d8-e288e25-edf9c3a-7163c28; GRID=f1148d8-e288e25-edf9c3a-7163c28; _ga=GA1.2.1861476544.1641958284; _gid=GA1.2.336246817.1641958284; _gat=1; GCESS=BgcEUohv_Q0BAQYEIZXvDwwBAQEIL4MhAAAAAAALAgYAAwSXS95hBAQALw0ACgQAAAAAAgSXS95hCAEDCQEBBQQAAAAA; SERVERID=1fa1f330efedec1559b3abbcb6e30f50|1641958296|1641958283; Hm_lvt_59c4ff31a9ee6263811b23eb921a5083=1641958284,1641958297; Hm_lpvt_59c4ff31a9ee6263811b23eb921a5083=1641958297; Hm_lvt_022f847c4e3acd44d4a2481d9187f1e6=1641958284,1641958297; Hm_lpvt_022f847c4e3acd44d4a2481d9187f1e6=1641958297; gk_process_ev={%22count%22:4%2C%22target%22:%22%22%2C%22utime%22:1641958285940%2C%22referrer%22:%22https://time.geekbang.org/dashboard/course%22%2C%22referrerTarget%22:%22page_geektime_login%22}; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%222196271%22%2C%22first_id%22%3A%2217e4c57198ee5b-08ba75eca7ebf4-1d326253-2007040-17e4c57198fcc2%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E5%BC%95%E8%8D%90%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC%22%2C%22%24latest_referrer%22%3A%22https%3A%2F%2Faccount.infoq.cn%2F%22%2C%22%24latest_landing_page%22%3A%22https%3A%2F%2Ftime.geekbang.org%2Fdashboard%2Fcourse%22%7D%2C%22%24device_id%22%3A%2217e4c57198ee5b-08ba75eca7ebf4-1d326253-2007040-17e4c57198fcc2%22%7D',
};

const toGeekId = (id: any) => (id ? 'G' + id : undefined);

const { post } = requester(header);

main();

const phones = [
  17713541424, 17828228827, 15196473896, 15732933533, 18228580670,
  13875080072, 17336575801, 15623836152, 13114516778, 15927916425, 18975667456,
];

async function main() {
  await init();
  // await login(phones[1], nvc);
  const url = 'https://time.geekbang.org/serv/v3/lecture/list';
  const data = await post(url, {
    label_id: 0,
    type: 1,
  });
  console.log(data.body.data.list);
  data.body.data.list
    // .slice(2, 3)
    .map((v) => v.pid)
    .forEach(async (id) => {
      await saveCourseInfo(id);
      await saveSections(id);
      await saveArticles(id);
    });
}

async function saveCourseInfo(id: string) {
  const url = 'https://time.geekbang.org/serv/v1/column/intro';
  const data = await post(url, { cid: id });
  const course = new Course();
  const v = data.body.data;
  course.id = toGeekId(id);
  course.title = v.column_title;
  course.teacherName = v.author_name;
  course.teacherTitle = v.author_intro;
  course.price = v.column_price / 100;
  course.brief = v.column_subtitle;
  course.image = v.lecture_url;
  course.articleCount = v.article_count;
  course.purchasedCount = v.sub_count;
  await save(course);
  const description = new CourseDescription();
  description.content = v.column_intro;
  description.courseId = course.id;
  await save(description);
}

async function saveSections(id: string) {
  const url = `https://time.geekbang.org/serv/v1/chapters`;
  const res = await post(url, { cid: id });

  for (const v of res.body.data) {
    const section = new Section();
    section.id = toGeekId(v.id);
    section.title = v.title;
    section.courseId = toGeekId(id);
    await save(section);
  }
}

async function saveArticles(courseId: string) {
  const url = `https://time.geekbang.org/serv/v1/column/articles`;
  const res = await post(url, {
    cid: courseId,
    order: 'earliest',
    prev: 0,
    sample: false,
    size: 500,
  });
  res.body.data.list.forEach(async (v) => {
    const article = new Article();
    article.id = toGeekId(v.id);
    if (v.chapter_id === '0') {
      // 极客时间部分专栏没有section，需要创建以关联article
      const sectionId = toGeekId(courseId) + 'ORPHAN';
      const section = await Section.findOne(sectionId);
      if (!section) {
        const sec = new Section();
        sec.courseId = toGeekId(courseId);
        sec.id = sectionId;
        sec.title = '';
        await save(sec);
      }
      article.sectionId = sectionId;
    } else {
      article.sectionId = toGeekId(v.chapter_id);
    }
    article.title = v.article_title;
    article.publishDate = new Date(
      1000 * Number(v.article_ctime)
    ).toLocaleDateString();
    await save(article);
    saveArticleContent(article, v.id);
  });
}

async function saveArticleContent(article: Article, id: string) {
  if (has({ articleContentId: toGeekId(id) })) return;
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
  const content = new ArticleContent();
  content.articleId = toGeekId(id);
  content.content = res.body.data.article_content;
  await save(content);
  console.log(id, '爬取成功');
  saveComments(article, id); // 只有购买了，评论才有回复
}

async function saveComments(article: Article, id: string) {
  const url = 'https://time.geekbang.org/serv/v1/comments';
  const res = await post(url, {
    aid: id,
    prev: 0,
  });
  res?.body.data.list.forEach(async (v) => {
    const comment = new ArticleComment();
    comment.id = toGeekId(v.id);
    comment.nickName = v.user_name;
    comment.likeCount = v.like_count;
    comment.content = v.comment_content;
    comment.article = article;
    await save(comment);

    if (v.replies) {
      v.replies.forEach((r) => {
        const reply = new ArticleComment();
        reply.parentComment = comment;
        reply.nickName = r.user_name;
        reply.content = r.content;
        reply.id = toGeekId(r.id);
      });
    }
  });
  console.log(id, 'comments saved');
}

async function login(phone: number, nvc: string) {
  const url = 'https://account.geekbang.org/account/ticket/login';
  const res = await post(url, {
    platform: 3,
    appid: 1,
    remember: 1,
    data: nvc,
    source: '',
    ucode: '',
    sc: {
      uid: '',
      report_source: 'H5',
      utm_identify: '',
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_content: '',
      utm_term: '',
      share_code: '',
      original_id:
        '17738a35d968ba-061f2b6741aac6-5437971-304500-17738a35d97850',
      refer: '极客时间',
    },
    country: 86,
    cellphone: String(phone),
    password: 'youling',
  });
  console.log(res.body);
  await post('https://account.infoq.cn/account/ticket/token', {
    token: res.body.data.oss_token,
  });
}
