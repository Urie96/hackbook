import request from './request';
import { Notify } from '@/utils/'

const MustNonNull = (...arg) => {
    arg.forEach(a => {
        if (a === null || a === undefined) throw new Error('paramter is null')
    })
}

const lazyLoad = (func) => {
    let res = null
    return () => res ? res : res = func()
}

export const getAllCourses = lazyLoad(() => request.get('/courses'))

export const getUserDislike = () => request.get(`/userservice/dislike`)

export const getUserFavorite = () => request.get(`/userservice/favorites`)

export const getUserFavoriteByCourseId = (courseId) => {
    MustNonNull(courseId)
    return request.get(`/userservice/favorites?courseId=${courseId}`)
}

export const getUserDislikeByCourseId = (courseId) => {
    MustNonNull(courseId)
    return request.get(`/userservice/dislike?courseId=${courseId}`)
}

export const addFavorite = (courseId) => {
    MustNonNull(courseId)
    return request.post(`/userservice/favorites`,
        {
            courseId: Number(courseId),
        }
    )
}

export const addDislike = (courseId) => {
    MustNonNull(courseId)
    return request.post(`/userservice/dislike`,
        {
            courseId: Number(courseId),
        }
    )
}

export const deleteFavorite = async (courseId) => {
    MustNonNull(courseId)
    const [{ id: favId }] = await getUserFavoriteByCourseId(courseId);
    MustNonNull(favId)
    return request.delete(`/userservice/favorites/${favId}`)
}

export const deleteDislike = async (courseId) => {
    MustNonNull(courseId)
    const [{ id: disId }] = await getUserDislikeByCourseId(courseId);
    MustNonNull(disId)
    return request.delete(`/userservice/dislike/${disId}`)
}

export const getCourseById = (courseId) => {
    MustNonNull(courseId)
    return getAllCourses().then(courses => courses.find(course => course.id === Number(courseId)))
}

export const getIntroduceByCourseId = (courseId) => {
    MustNonNull(courseId)
    return request.get(
        `courseIntroduces?courseId=${courseId}&_limit=1`
    )
}

export const getCourseCategoryById = (courseId) => {
    MustNonNull(courseId)
    return request.get(`courses/${courseId}/sections?_embed=articles`)
}

export const getArticleInfoById = (id) => {
    MustNonNull(id)
    return request.get(`articles/${id}?_expand=course`)
}

export const getArticleContentById = (id) => {
    MustNonNull(id)
    return request.get(`articleContents?articleId=${id}`).then(([{ content }]) => content)
}

// 嵌入的comments是回复
export const getCommentsByArticleId = (articleId) => {
    MustNonNull(articleId)
    return request.get(
        `/articles/${articleId}/comments?_embed=comments`
    );
}

export const getBlueById = (id) => {
    MustNonNull(id)
    return request.get(`/blues/${id}`)
}

export const login = (loginReturnTo) => {
    MustNonNull(loginReturnTo)
    return request
        .get('/login', {
            params: { loginReturnTo },
        })
        .then(() => {
            return true
        })
        .catch((err) => {
            if (err.response && err.response.status === 401) {
                Notify({ type: 'warning', message: '即将重定向到登录界面' });
                window.location.href = err.response.data.redirect;
            }
            return false
        })
}