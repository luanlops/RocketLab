import { Injectable } from "@nestjs/common";

import { PrismaService } from "../database/prisma/prisma.service";

interface CreatePurshaseParams{
  customerId: string;
  productId: string;
}

@Injectable()
export class PurshasesService {
  constructor(private prisma: PrismaService) { }

  listAllPurshases() {
    return  this.prisma.purshase.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  listAllFromCustomer(customerId: string) {
    return  this.prisma.purshase.findMany({
      where: {
        customerId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createPurchase({customerId, productId} : CreatePurshaseParams){
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      }
    });
    if (!product){
      throw new Error('Product not found.');
    }

    return await this.prisma.purshase.create({
      data: {
        customerId,
        productId
      },
    });
  }
}