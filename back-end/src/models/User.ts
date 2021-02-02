import { ObjectType, Field } from 'type-graphql';
import { Entity, Column } from 'typeorm';
import { UserRole } from './Enum';
import { Base } from './Base';

@ObjectType()
@Entity()
export class User extends Base {
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.ORDINARY,
  })
  @Field(() => UserRole)
  role: UserRole;
}
