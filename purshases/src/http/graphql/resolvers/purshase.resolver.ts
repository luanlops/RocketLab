import { UseGuards } from "@nestjs/common";
import { Resolver, Query, ResolveField, Parent, Mutation, Args } from "@nestjs/graphql";
import { CustomersService } from "../../../services/customers.service";
import { ProductsService } from "../../../services/products.service";
import { PurshasesService } from "../../../services/purshases.service";
import { AuthorizationGuard } from "../../auth/authorization.guard";
import { AuthUser, CurrentUser } from "../../auth/current-user";
import { CreatePurshaseInput } from "../inputs/create-purshase-input";

import { Product } from "../models/product";
import { Purshase } from "../models/purshase";

@Resolver(() => Purshase)
export class PurshasesResolver {
  constructor(
    private purshasesService: PurshasesService,
    private productsService: ProductsService,
    private customersService: CustomersService
  ) { }

  @Query(() => [Purshase])
  @UseGuards(AuthorizationGuard)
  purshases() {
    return this.purshasesService.listAllPurshases();
  }

  @ResolveField(() => Product)
  product(
    @Parent() purshases: Purshase) {
    return this.productsService.getProductById(purshases.productId)
  }

  @Mutation(() => Purshase)
  @UseGuards(AuthorizationGuard)
  async createPurshase(
    @Args('data') data: CreatePurshaseInput,
    @CurrentUser() user: AuthUser,) {
    let customer = await this.customersService.getCustomerByAuthUserId(
      user.sub,
    );

      if (!customer) {
        customer = await this.customersService.createCustomer({
          authUserId: user.sub,
        })
      }
       
    return this.purshasesService.createPurchase({
      customerId: customer.id,
     productId: data.productId,
     })
  }
}

