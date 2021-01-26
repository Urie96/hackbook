import gql from 'graphql-tag';

export const articleFragment = gql`
  fragment article on Article {
    id
    title
    publishDate
    done
  }
`;

export const sectionFragment = gql`
  fragment section on Section {
    id
    title
  }
`;

export const commentFragment = gql`
  fragment comment on ArticleComment {
    id
    content
    likeCount
    nickName
    replies {
      id
      content
      likeCount
      nickName
    }
  }
`;

export const courseFragment = gql`
  fragment course on Course {
    id
    title
    brief
    teacherName
    teacherTitle
    price
    image
    articleCount
    purchasedCount
    done
  }
`;

export const courseTendFragment = gql`
  fragment courseTend on CourseTend {
    courseId
    type
  }
`;
