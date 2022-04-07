import { UseGuards } from "@nestjs/common";
import { Resolver, Query, ResolveField, Parent } from "@nestjs/graphql";

import { CustomersService } from "../../../services/customers.service";
import { PurshasesService } from "../../../services/purshases.service";
import { AuthorizationGuard } from "../../auth/authorization.guard";
import { AuthUser, CurrentUser } from "../../auth/current-user";

import { Customer } from "../models/customer";

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(
    private customerService: CustomersService,
    private purshasesService: PurshasesService
    ) { }
  
  @UseGuards(AuthorizationGuard)
  @Query(() => Customer)
  me(@CurrentUser() user: AuthUser) {
    return this.customerService.getCustomerByAuthUserId(user.sub);
  }

  @ResolveField()
  purshases(@Parent() customer: Customer) {
    return this.purshasesService.listAllFromCustomer(customer.id);
  }
}

