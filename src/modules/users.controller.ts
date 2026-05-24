import { Controller, Req, Body, Post, Get } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { SignInDto } from "./dtos/Sign-in-dto";
import * as express from "express";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller('/users')
@ApiBearerAuth()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post("/sign-up")
    signUp(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Post("/sign-in")
    signIn(@Body() signInDto: SignInDto) {
        return this.usersService.signIn(signInDto);
    }

    @Get("/my-profile")
    myProfile(@Req() req: express.Request) {
        return this.usersService.myProfile(req['user']);
    }

    @Get("/all")
    findAll(@Req() req: express.Request) {
        const currentUser = req['user'];
        const currentUserId = currentUser ? currentUser.userId : undefined;
        return this.usersService.findAll(currentUserId);
    }
}