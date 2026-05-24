import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "./dtos/create-user.dto";
import { SignInDto } from "./dtos/Sign-in-dto";
import { ConfigService } from "@nestjs/config";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly configService: ConfigService,
    ) {}
    
    async create(createUserDto: CreateUserDto) {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }
    
    async findAll(excludeUserId?: string) {
        if (excludeUserId) {
            return this.userModel.find({ _id: { $ne: excludeUserId } }).exec();
        }
        return this.userModel.find().exec();
    }
    
    myProfile(user: any) {
        return this.userModel.findById(user.userId).select('-password').exec();
    }
    
    async signIn(signInDto: SignInDto) {
        const user = await this.userModel.findOne({ email: signInDto.email }).exec();
        if (!user) {
            throw new UnauthorizedException("Invalid email or password");
        }
        if (user.password !== signInDto.password) {
            throw new UnauthorizedException("Invalid email or password");
        }
        
        const payload = {
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
        };

        const secret = this.configService.getOrThrow<string>('JWT_SECRET');
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });

        return {
            access_token: token,
            user: {
                id: user._id,
                email: user.email,
                fullName: user.fullName,
                role: user.role,
            }
        };
    }
}