import { UserDAO } from '../dao/user.dao';
import { CreateUserDTL } from '../dtl/create-user.dtl';
import { UpdateUserDTL } from '../dtl/update-user.dtl';
import { UserDTL } from '../dtl/user.dtl';

export class UserMapper {
  static toDTO(user: UserDAO) {
    const userDTO = new UserDTL();

    userDTO.id = user.id;
    userDTO.email = user.email;
    userDTO.firstName = user.firstName;
    userDTO.lastName = user.lastName;

    userDTO.createdAt = user.createdAt;
    userDTO.updatedAt = user.updatedAt;
    userDTO.deletedAt = user.deletedAt;

    return userDTO;
  }

  static fromCreateDTO(userDTO: CreateUserDTL) {
    const newUserDAO = new UserDAO();

    newUserDAO.email = userDTO.email;
    newUserDAO.firstName = userDTO.firstName;
    newUserDAO.lastName = userDTO.lastName;

    return newUserDAO;
  }

  static fromUpdateDTO(userDTO: UpdateUserDTL, user: UserDAO) {
    const updatedUser = new UserDAO();

    updatedUser.id = user.id;
    updatedUser.email = user.email;
    updatedUser.firstName = userDTO.firstName ?? user.firstName;
    updatedUser.lastName = userDTO.lastName ?? user.lastName;

    updatedUser.createdAt = user.createdAt;
    updatedUser.updatedAt = user.updatedAt;
    updatedUser.deletedAt = user.deletedAt;

    return updatedUser;
  }
}
