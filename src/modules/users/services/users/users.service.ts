import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SortOrder } from 'src/enums/order.enum';
import { FindOptionsOrder, Repository } from 'typeorm';
import { UserDAO } from '../../dao/user.dao';
import { GetUserQueriesDTL } from '../../dtl/get-user-queries.dtl';
import { SortedUserField } from '../../enums/sort-user-field.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserDAO)
    private usersRepository: Repository<UserDAO>,
  ) {}

  async getUsers(params: GetUserQueriesDTL) {
    return await this.usersRepository.find({
      take: params.limit,
      skip: params.offset,
      withDeleted: params.show_deleted,
      order: this.getOrder(params.sort, params.order),
    });
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async getUserById(id: string) {
    return await this.usersRepository.findOneBy({ id });
  }

  async createUser(user: UserDAO) {
    return await this.usersRepository.save(user);
  }

  async updateUser(user: UserDAO) {
    return await this.usersRepository.save(user);
  }

  async removeUser(user: UserDAO) {
    return await this.usersRepository.softRemove(user);
  }

  private getOrder(
    field: SortedUserField,
    order: SortOrder,
  ): FindOptionsOrder<UserDAO> {
    switch (field) {
      case SortedUserField.ID:
        return { id: order };
      case SortedUserField.EMAIL:
        return { email: order };
      case SortedUserField.FIRST_NAME:
        return { firstName: order };
      case SortedUserField.LAST_NAME:
        return { lastName: order };
      case SortedUserField.CREATED_AT:
        return { createdAt: order };
      case SortedUserField.DELETED_AT:
        return { deletedAt: order };
    }
  }
}
