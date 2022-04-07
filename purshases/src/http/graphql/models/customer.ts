import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Purshase } from "./purshase";

@ObjectType()
export class Customer {
  @Field(() => ID)
  id: string;

  @Field(() => [Purshase])
  purshases: Purshase[];

} 
