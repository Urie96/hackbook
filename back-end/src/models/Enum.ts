import { registerEnumType } from 'type-graphql';

export enum UserRole {
  ADMIN = 'ADMIN',
  ORDINARY = 'ORDINARY',
  VISITOR = 'VISITOR',
}

export enum CourseTendType {
  LIKE = 'LIKE',
  DISLIKE = 'DISLIKE',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});

registerEnumType(CourseTendType, {
  name: 'CourseTendType',
});
