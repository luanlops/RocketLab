import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql';
import path from 'node:path';

import { DatabaseModule } from '../database/database.module';
import { CustomersService } from '../services/customers.service';
import { ProductsService } from '../services/products.service';
import { PurshasesService } from '../services/purshases.service';
import { CustomerResolver } from './graphql/resolvers/customers.resolver';
import { ProductsResolver } from './graphql/resolvers/products.resolver';
import { PurshasesResolver } from './graphql/resolvers/purshase.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),

    })
  ],
  providers:[
    //Resolvers
    ProductsResolver, 
    PurshasesResolver,
    CustomerResolver,

    //Services
    ProductsService, 
    PurshasesService,
    CustomersService,
  ]
})
export class HttpModule {}
