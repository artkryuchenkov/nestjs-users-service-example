import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users/users.controller';
import { UserDAO } from './dao/user.dao';
import { UsersService } from './services/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserDAO])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
