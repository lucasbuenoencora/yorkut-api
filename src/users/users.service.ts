import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AddFriendDto } from './dto/add-friend.dto';
import * as MD5 from 'crypto-js/md5';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.password = MD5('test').toString();

    return this.usersRepository.save(user);
  }

  async addFriend(addFriendDto: AddFriendDto): Promise<string> {
    const { userId, friendId } = addFriendDto;

    const user = await this.usersRepository.findOneBy({ id: userId });
    const friend = await this.usersRepository.findOneBy({ id: friendId });

    if (!user) return 'User not found';
    if (!friend) return 'Friend not found';

    if (user.friends) user.friends.push(friend);
    else user.friends = [friend];

    await this.usersRepository.save(user);
    return 'Friend added succesfully';
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
