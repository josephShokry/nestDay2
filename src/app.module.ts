import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users.module';
import { AuthenticationMiddleware } from './modules/milddelwares/auth.middleware';
import { AdminMiddleware } from './modules/milddelwares/admin.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot('mongodb://admin:admin@localhost:27017/iti?authSource=admin'),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthenticationMiddleware).forRoutes(
      {path: 'users/my-profile', method: RequestMethod.GET},
    )
    .apply(AdminMiddleware).forRoutes(
      {path: 'users/all', method: RequestMethod.GET},
    )
  }
}
