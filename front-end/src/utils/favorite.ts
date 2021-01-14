import { reactive } from 'vue';
import { Notify } from '.';
import {
  addFavorite,
  deleteFavorite,
  getUserFavorite,
  getUserDislike,
  addDislike,
  deleteDislike,
} from '../api';

const favset = reactive(new Set<number>());
const disset = reactive(new Set<number>());

const loadFavorite = async () => {
  const data = await getUserFavorite();
  data.forEach((v) => {
    favset.add(v.courseId);
  });
};

const loadDislike = async () => {
  const data = await getUserDislike();
  data.forEach((v) => {
    disset.add(v.courseId);
  });
};

const initOnce = (() => {
  let first = true;
  return async () => {
    if (first) {
      first = false;
      await Promise.all([loadFavorite(), loadDislike()]);
    }
  };
})();

export const courseIsFavorite = (id: any) =>
  initOnce() && favset.has(id.value || id);

export const courseIsDislike = (id: any) =>
  initOnce() && disset.has(id.value || id);

export const likeCourse = async (id: any) => {
  favset.add(id.value || id);
  await addFavorite(id.value || id);
  Notify({ type: 'success', message: '收藏成功' });
};

export const dislikeCourse = async (id: any) => {
  disset.add(id.value || id);
  await addDislike(id.value || id);
  Notify({ type: 'success', message: '已添加到不喜欢' });
};

export const cancelLikeCourse = async (id: any) => {
  favset.delete(id.value || id);
  await deleteFavorite(id.value || id);
  Notify({ type: 'warning', message: '取消收藏成功' });
};

export const cancelDislikeCourse = async (id: any) => {
  disset.delete(id.value || id);
  await deleteDislike(id.value || id);
  Notify({ type: 'warning', message: '已移除不喜欢' });
};
