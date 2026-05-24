import {
  IsEmail,
  IsString,
  MinLength,
  Matches,
  IsInt,
  Min,
  Max,
  IsIn,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  fullName: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^[A-Za-z]+$/, {
    message: 'Password must contain only alphabetic characters',
  })
  @ApiProperty()
  password: string;

  @IsInt()
  @Min(16)
  @Max(60)
  @ApiProperty()
  age: number;

  @Matches(/^01\d{9}$/, {
    message: 'Phone must start with 01 and be 11 digits long',
  })
  @ApiProperty()
  mobileNumber: string;

  @IsIn(["admin","user"])
  @ApiProperty()
  role:string;
}