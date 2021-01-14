import { get, post, del } from './request';
import { Notify } from '../utils';

const toInteger = (num: any) => {
  const res = Number(num);
  if (Number.isInteger(res)) {
    return res;
  }
  throw new Error('param is not an integer');
};

const lazyLoad = <T>(func: () => T) => {
  let res: T;
  return () => (res ? res : (res = func()));
};

export const getAllCourses = lazyLoad(() => get<Course[]>('/courses'));

export const getUserDislike = () => get<Dislike[]>(`/userservice/dislike`);

export const getUserFavorite = () => get<Favorite[]>(`/userservice/favorites`);

export const getUserFavoriteByCourseId = (courseId: number | string) =>
  get<Favorite[]>(`/userservice/favorites?courseId=${toInteger(courseId)}`);

export const getUserDislikeByCourseId = (courseId: number | string) =>
  get<Dislike[]>(`/userservice/dislike?courseId=${toInteger(courseId)}`);

export const addFavorite = (courseId: number | string) =>
  post(`/userservice/favorites`, {
    courseId: toInteger(courseId),
  });

export const addDislike = (courseId: number | string) =>
  post(`/userservice/dislike`, {
    courseId: toInteger(courseId),
  });

export const deleteFavorite = async (courseId: number | string) => {
  const [{ id: favId }] = await getUserFavoriteByCourseId(courseId);
  return del(`/userservice/favorites/${toInteger(favId)}`);
};

export const deleteDislike = async (courseId: number | string) => {
  const [{ id: disId }] = await getUserDislikeByCourseId(courseId);
  return del(`/userservice/dislike/${toInteger(disId)}`);
};

export const getCourseById = (courseId: number | string) =>
  getAllCourses().then((courses) =>
    courses.find((course) => course.id === Number(courseId))
  );

export const getIntroduceByCourseId = (courseId: number | string) =>
  get<CourseIntroduce[]>(
    `courseIntroduces?courseId=${toInteger(courseId)}&_limit=1`
  ).then(([first]) => first);

export const getCourseCategoryById = (courseId: number | string) =>
  get<Section[]>(`courses/${toInteger(courseId)}/sections?_embed=articles`);

export const getArticleInfoById = (id: number | string) =>
  get<Article>(`articles/${toInteger(id)}?_expand=course`);

export const getArticleContentById = (id: number | string) =>
  get<ArticleContent[]>(`articleContents?articleId=${toInteger(id)}`).then(
    ([{ content }]) => content
  );

// 嵌入的comments是回复
export const getCommentsByArticleId = (articleId: number | string) =>
  get<Comment[]>(`/articles/${toInteger(articleId)}/comments?_embed=comments`);

export const getBlueById = (id: number | string) =>
  get(`/blues/${toInteger(id)}`);

export const login = (loginReturnTo: string) => {
  if (loginReturnTo.trim() === '') {
    throw new Error('param loginReturnTo must not be blank string');
  }
  return get('/login', {
    params: { loginReturnTo },
  })
    .then(() => true)
    .catch((err) => {
      if (err.response && err.response.status === 401) {
        Notify({ type: 'warning', message: '即将重定向到登录界面' });
        window.location.href = err.response.data.redirect;
      }
      return false;
    });
};
