import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreatePurshaseInput{
  @Field()
  productId: string;
}