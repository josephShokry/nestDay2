import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
    constructor(
        private readonly configService: ConfigService
    ) { }

    use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization']

        // ['Bearer', token]
        const [_bearer, token] = (authHeader || '').split(' ')

        if (!token) {
            throw new UnauthorizedException()
        }

        try {
            const payload = jwt.verify(token, this.configService.getOrThrow<string>('JWT_SECRET'))
            req['user'] = payload
        } catch (error) {
            throw new UnauthorizedException()
        }

        next()
    }
}