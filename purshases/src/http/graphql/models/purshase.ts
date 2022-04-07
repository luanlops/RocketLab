import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Product } from "./product";

enum PurshaseStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  FAILED = 'FAILED'
}

registerEnumType(PurshaseStatus, {
  name: 'PurshaseStatus',
  description: 'Available purshase statuses'
})

@ObjectType()
export class Purshase {
  @Field(() => ID)
  id: string;

  @Field(() => PurshaseStatus)
  status: PurshaseStatus;

  @Field(() => Date)
  createdAt:Date;

  @Field(() => Product )
  product: Product
  
  productId: string
} 