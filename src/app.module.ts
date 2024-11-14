import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CvModule } from './cv/cv.module';
import { SkillModule } from './skill/skill.module';
import { AuthenticationMiddleware } from './middlewares/auth.middleware';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/entities/user.entity';
import { Skill } from './skill/entities/skill.entity';
import { Cv } from './cv/entities/cv.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';
/*
@Module({
  imports: [UserModule, CvModule, SkillModule],
  controllers: [AppController],
  providers: [AppService],
})

*/
@Module({
  imports: [UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Skill, Cv],
      synchronize: true,
    }),
    CvModule,
    SkillModule,
    TodoModule,
  ],
  controllers: [
    AppController],
  providers: [AppService],
})


export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes("todo", "cv");
  }
}