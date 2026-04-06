import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Tenant } from '../tenants/tenants.model';

export enum UserType {
  ADMIN = 'ADMIN',
  TENANT = 'TENANT',
  EMPLOYEE = 'EMPLOYEE',
}

export enum UserStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Deleted = 'Deleted',
}

@Table({
  tableName: 'sys_users',
  timestamps: false,
})
export class User extends Model<User> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(36),
    allowNull: false,
    unique: true,
  })
  uuid: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name: string;

  @Column(DataType.STRING)
  email: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    unique: true,
  })
  phone: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  password_hash: string;

  @Column(DataType.STRING)
  image_url: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserType)),
    allowNull: false,
  })
  user_type: UserType;

  @ForeignKey(() => Tenant)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  tenant_id: number;

  @BelongsTo(() => Tenant, 'tenant_id')
  tenant: Tenant;

  @Column({
    type: DataType.ENUM(...Object.values(UserStatus)),
    defaultValue: UserStatus.Active,
  })
  status: UserStatus;

  @Column(DataType.BOOLEAN)
  is_email_verified: boolean;

  @Column(DataType.DATE)
  last_login_at: Date;

  @Column(DataType.BIGINT)
  created_by: number;

  @Column(DataType.BIGINT)
  updated_by: number;

  @Column(DataType.BIGINT)
  deleted_by: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  created_at: Date;

  @Column(DataType.DATE)
  updated_at: Date;

  @Column(DataType.DATE)
  deleted_at: Date;
}