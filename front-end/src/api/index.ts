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
import { Notify } from '../utils';

const request = async <T = any, V = any>(
  query: DocumentNode,
  variables?: V
) => {
  try {
    return await graphqlRequest<T, V>('/graphql', query, variables);
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
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

export const login = async (loginReturnTo: string) => {
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
    return true;
  }
  if (redirect) {
    Notify({ type: 'warning', message: '即将重定向到登录界面' });
    window.location.href = redirect;
  }
};
