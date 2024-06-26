import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { LogIn } from './dto/login.dto';
import { readUserDTO } from './dto/readUserDTO.dto';
import { PlaylistEntity } from 'src/playlist/entities/playlist.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() req: UserEntity): Promise<void> {
    await this.userService.createUser(req);
  }

  // /:id -> /:uid 로 바꿈
  @Get('/:uid')
  async getUser(@Param('uid') uid: string): Promise<readUserDTO> {
    // async getUser(@Param('id') id: number): Promise<PlaylistEntity[]> {
    return this.userService.findUser(uid);
    // return this.userService.findPlaylistByUser(id);
  }

  @Get('/playlist/:id')
  async getUserPlaylist(@Param('id') id: number): Promise<PlaylistEntity[]> {
    return this.userService.findPlaylistByUser(id);
  }

  @Delete('/:id')
  async deleteMusic(@Param('id') id: number): Promise<void> {
    await this.userService.deleteUser(id);
  }
  @Put('/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() updatedUserData: UserEntity,
  ): Promise<void> {
    await this.userService.updateUser(id, updatedUserData);
  }
  @Post('login')
  async login(
    @Body() loginDto: LogIn,
  ): Promise<{ a: boolean; data: readUserDTO }> {
    const isSuccess = await this.userService.login(loginDto);
    if (isSuccess) {
      const userData = await this.getUser(loginDto.uid);
      const { nickName } = userData;
      return { a: true, data: { ...userData, nickName } };
    } else {
      return { a: false, data: null };
    }
  }
}
