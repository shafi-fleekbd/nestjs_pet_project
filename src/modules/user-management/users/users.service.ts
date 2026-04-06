import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async createUser(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.userModel.create({
      uuid: uuidv4(),
      name: dto.name,
      phone: dto.phone,
      password_hash: hashedPassword,
      user_type: dto.user_type,
      tenant_id: dto.tenant_id || null,
      created_at: new Date(),
    });

    return user;
  }

  async findByPhone(phone: string) {
  return this.userModel.findOne({
    where: { phone },
  });
}
}