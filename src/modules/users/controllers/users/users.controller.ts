import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseBoolPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDTL } from '../../dtl/create-user.dtl';
import { GetUserQueriesDTL } from '../../dtl/get-user-queries.dtl';
import { UpdateUserDTL } from '../../dtl/update-user.dtl';
import { UserDTL } from '../../dtl/user.dtl';
import { UserMapper } from '../../mappers/user.mapper';
import { UsersService } from '../../services/users/users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get users list with search and pagination' })
  @ApiOkResponse({ type: UserDTL, isArray: true })
  async getUsers(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query: GetUserQueriesDTL,
  ) {
    const users = await this.usersService.getUsers(query);
    return users.map(UserMapper.toDTO);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({ type: UserDTL })
  @ApiNotFoundResponse()
  async getUser(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.usersService.getUserById(id);
    if (!user) {
      throw new NotFoundException();
    }

    return UserMapper.toDTO(user);
  }

  @Post()
  @ApiOperation({ summary: 'Add user by id' })
  @ApiOkResponse({ type: UserDTL })
  @ApiConflictResponse()
  async addUser(@Body() user: CreateUserDTL) {
    const userInDb = await this.usersService.getUserByEmail(user.email);
    if (userInDb) {
      throw new ConflictException();
    }

    const newUser = await this.usersService.createUser(
      UserMapper.fromCreateDTO(user),
    );
    return UserMapper.toDTO(newUser);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit user by id' })
  @ApiOkResponse({ type: UserDTL })
  @ApiNotFoundResponse()
  async editUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() userFields: UpdateUserDTL,
  ) {
    const user = await this.usersService.getUserById(id);
    if (!user) {
      throw new NotFoundException();
    }

    const updatedUser = await this.usersService.updateUser(
      UserMapper.fromUpdateDTO(userFields, user),
    );
    return UserMapper.toDTO(updatedUser);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async removeUser(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.usersService.getUserById(id);
    if (!user) {
      throw new NotFoundException();
    }
    if (user.deletedAt) {
      throw new NotFoundException();
    }

    return await this.usersService.removeUser(user);
  }
}
