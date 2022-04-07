import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigFactory, ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import jwt from 'express-jwt';
import { expressJwtSecret }  from 'jwks-rsa';
import { promisify } from 'node:util';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private AUTH0_AUDIENCE: string;
  private AUTH0_DOMAIN: string;
  
  constructor(private confiService: ConfigService) {
    this.AUTH0_AUDIENCE = this.confiService.get('AUTH0_AUDIENCE') ?? '';
    this.AUTH0_DOMAIN = this.confiService.get('AUTH0_DOMAIN') ?? '';
  }
  
  async canActivate (context: ExecutionContext): Promise<boolean> {

    const { req, res } = GqlExecutionContext.create(context).getContext();

    const chekJwt = promisify(
      jwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${this.AUTH0_DOMAIN}.well-known/jwks.json`
    }),
        audience: this.AUTH0_AUDIENCE,
        issuer: this.AUTH0_DOMAIN,
        algorithms: ["RS256"],
      })
    )

      try {
        await chekJwt(req, res);
        return true;
      }catch (err){
        throw new UnauthorizedException(err);
      }
  }
}
