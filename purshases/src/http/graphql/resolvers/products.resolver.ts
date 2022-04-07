import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";

import { PrismaService } from "../../../database/prisma/prisma.service";
import { ProductsService } from "../../../services/products.service";
import { AuthorizationGuard } from "../../auth/authorization.guard";
import { CreateProductInput } from "../inputs/create-product-input";

import { Product } from "../models/product";

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productService: ProductsService) { }

  @Query(() => [Product])
  //@UseGuards(AuthorizationGuard)
  products() {
    return this.productService.listAllProducts();
  }
  
  
  @UseGuards(AuthorizationGuard)
  @Mutation(() => Product)
  createProduct(@Args('data') data:CreateProductInput) {
    return this.productService.createProduct(data);
  }

}

