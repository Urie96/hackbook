import { ObjectType, Field, ID } from 'type-graphql';
import { PrimaryColumn, BaseEntity } from 'typeorm';

@ObjectType()
export abstract class Base extends BaseEntity {
  @PrimaryColumn()
  @Field(() => ID)
  id: string;
}
