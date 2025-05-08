import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { AddFriendDto } from './dto/add-friend.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }

  @Post('add-friend')
  addFriend(@Body() addFriendDto: AddFriendDto): Promise<string> {
    return this.usersService.addFriend(addFriendDto);
  }

  @Get('friends/:id')
  getAllFriendsById(@Param('id') id: number): Promise<User[] | null> {
    return this.usersService.getAllFriendsById(id);
  }
}
