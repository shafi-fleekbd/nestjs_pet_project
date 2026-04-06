import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserType } from '../users.model';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  phone: string;

  @IsString()
  password: string;

  @IsEnum(UserType)
  user_type: UserType;

  @IsOptional()
  tenant_id?: number;
}