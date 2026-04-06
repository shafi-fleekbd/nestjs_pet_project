import { Optional } from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
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
export interface UserAttributes {
  id: number;
  uuid: string;
  name: string;
  email?: string;
  phone: string;
  password_hash: string;
  image_url?: string;
  user_type: UserType;
  tenant_id: number | null;
  status?: UserStatus;
  is_email_verified?: boolean;
  last_login_at?: Date;
  created_by?: number;
  updated_by?: number;
  deleted_by?: number;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface UserCreationAttributes extends Optional<
  UserAttributes,
  | 'id'
  | 'tenant_id'
  | 'email'
  | 'image_url'
  | 'status'
  | 'is_email_verified'
  | 'last_login_at'
  | 'created_by'
  | 'updated_by'
  | 'deleted_by'
  | 'updated_at'
  | 'deleted_at'
> {}

@Table({
  tableName: 'sys_users',
  timestamps: false,
})
export class User extends Model<UserAttributes,
  UserCreationAttributes> {
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
  declare uuid: string;

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
  declare tenant_id: number | null;

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
