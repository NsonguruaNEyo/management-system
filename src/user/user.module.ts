import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/Entity/user.entity';
import { JwtModule } from '@nestjs/jwt'; 
import { JwtStrategy } from 'src/jwt-strate/jwt-strategies';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';

dotenv.config()


@Module({
  imports: [TypeOrmModule.forFeature([User]),
JwtModule.register({
  global: true,
  secret: process.env.JWTSCRET,
  signOptions: {expiresIn:'1h'},
}),

PassportModule.register({
  defaultStrategy: 'jwt',
  session: true  //e.g session expired in a platform
})
],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports:[PassportModule,JwtStrategy, UserService]
})
export class UserModule {}
