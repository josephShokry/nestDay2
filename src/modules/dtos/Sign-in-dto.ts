import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength, Matches } from "class-validator";

export class SignInDto {
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @MinLength(8)
    @Matches(/^[A-Za-z]+$/)
    @ApiProperty()
    password: string;
}