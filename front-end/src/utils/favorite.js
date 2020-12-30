import { reactive } from 'vue'
import { Notify } from './';
import { addFavorite, deleteFavorite, getUserFavorite, getUserDislike, addDislike, deleteDislike } from '@/api';


const favset = reactive(new Set())
const disset = reactive(new Set())

const loadFavorite = async () => {
    const data = await getUserFavorite();
    data.forEach(v => {
        favset.add(v.courseId)
    })
};

const loadDislike = async () => {
    const data = await getUserDislike();
    data.forEach(v => {
        disset.add(v.courseId)
    })
}

loadFavorite()
loadDislike()

export const courseIsFavorite = (id) => favset.has(id.value || id)

export const courseIsDislike = (id) => disset.has(id.value || id)

export const likeCourse = async (id) => {
    favset.add(id.value || id);
    await addFavorite(id.value || id);
    Notify({ type: 'success', message: '收藏成功' });
};

export const dislikeCourse = async (id) => {
    disset.add(id.value || id);
    await addDislike(id.value || id);
    Notify({ type: 'success', message: '已添加到不喜欢' });
};


export const cancelLikeCourse = async (id) => {
    favset.delete(id.value || id);
    await deleteFavorite(id.value || id);
    Notify({ type: 'warning', message: '取消收藏成功' });
};

export const cancelDislikeCourse = async (id) => {
    disset.delete(id.value || id);
    await deleteDislike(id.value || id);
    Notify({ type: 'warning', message: '已移除不喜欢' });
};

