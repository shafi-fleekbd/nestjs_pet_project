import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from '../users/users.model';

@Table({
  tableName: 'subs_tenants',
  timestamps: false,
})
export class Tenant extends Model<Tenant> {
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

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  owner_user_id: number;

  @BelongsTo(() => User, 'owner_user_id')
  owner: User;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  business_name: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  slug: string;

  @Column(DataType.STRING)
  logo_url: string;

  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  phone: string;

  @Column({
    type: DataType.ENUM('Active', 'Inactive', 'Deleted'),
    defaultValue: 'Active',
  })
  status: string;

  @Column(DataType.STRING)
  timezone: string;

  @Column(DataType.STRING)
  currency: string;

  @Column(DataType.STRING)
  locale: string;

  @Column(DataType.DATE)
  trial_ends_at: Date;

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

  // 🔥 Relation: Tenant → Users
  @HasMany(() => User)
  users: User[];
}