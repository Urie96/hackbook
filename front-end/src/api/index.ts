import graphqlRequest from 'graphql-request';
import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';
import {
  courseFragment,
  sectionFragment,
  articleFragment,
  commentFragment,
  courseTendFragment,
} from './fragment';
import { Message } from '@/utils';

const request = async <T = any, V = any>(
  query: DocumentNode,
  variables?: V
) => {
  try {
    return await graphqlRequest<T, V>('/graphql', query, variables);
  } catch (error) {
    Message.fail(error.response?.errors?.[0]?.message);
    throw error;
  }
};

export const getAllCourses = async () => {
  const { courses } = await request(gql`
    {
      courses {
        ...course
        userTend
      }
    }

    ${courseFragment}
  `);
  return courses as Course[];
};

export const addUserTend = async (courseTend: CourseTend) => {
  if (!window.isAuthenticated) await login();
  const { addCourseTend } = await request(
    gql`
      mutation($courseId: String!, $type: String!) {
        addCourseTend(courseId: $courseId, type: $type) {
          ...courseTend
        }
      }

      ${courseTendFragment}
    `,
    courseTend
  );
  return addCourseTend as CourseTend;
};

export const deleteUserTend = async (courseId: string) => {
  if (!window.isAuthenticated) await login();
  const { deleteCourseTend } = await request(
    gql`
      mutation($courseId: String!) {
        deleteCourseTend(courseId: $courseId)
      }
    `,
    { courseId }
  );
  return deleteCourseTend as boolean;
};

export const getCourseById = async (courseId: string) => {
  const { course } = await request(gql`
  {
    course(id: "${courseId}") {
      ...course
      description
      sections{
        ...section
        articles{
          ...article
        }
      }
    }
  }

  ${courseFragment}
  ${sectionFragment}
  ${articleFragment}
`);
  return course as Course;
};

export const getArticleById = async (id: string) => {
  const { article } = await request(gql`
  {
    article(id: "${id}"){
      ...article
      content
      section{
        ...section
        course{
          ...course
        }
      }
      comments{
        ...comment
      }
    }
  }

  ${commentFragment}
  ${articleFragment}
  ${courseFragment}
  ${sectionFragment}
  `);
  return article as Article;
};

const sleepForever = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 1000 * 3600 * 24 * 100);
  });

export const login = async (loginReturnTo = location.pathname) => {
  if (loginReturnTo.trim() === '') {
    throw new Error('param loginReturnTo must not be blank string');
  }
  const {
    login: { message, redirect },
  } = await request(
    gql`
      {
        login(loginReturnTo: "${loginReturnTo}"){
          message
          redirect
        }
      }
      `
  );
  if (message === 'success') {
    window.isAuthenticated = true;
    return true;
  }
  if (redirect) {
    Message.warning('正在尝试自动登录');
    window.location.href = redirect;
    await sleepForever();
  }
};
