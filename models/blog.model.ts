import { Table, Column, Model, HasMany, Default, BelongsTo, ForeignKey } from 'sequelize-typescript'
import User from './user.model';

@Table({ timestamps: true })
class Blog extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;
  @ForeignKey(() => User)
  @Column
  userId: number;
  @BelongsTo(() => User)
  user: User;
  @Column({ allowNull: false })
  title: string;
  @Column({ allowNull: false })
  url: string;
  @Column({ defaultValue: 0 })
  likes: number;
}

export default Blog
