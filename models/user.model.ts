import { Table, Column, Model, HasMany } from 'sequelize-typescript'
import Blog from './blog.model';

@Table({ tableName: 'users', timestamps: true })
class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;
  @Column({ allowNull: false })
  googleId: string;
  @Column({ allowNull: false })
  name: string;
  @Column({ allowNull: true })
  email: string;
  @Column({ allowNull: true })
  picture: string;
  @HasMany(() => Blog)
  blogs: Blog[];
  @Column({ defaultValue: false })
  admin: boolean;
  @Column({ defaultValue: false })
  disabled: boolean;
}

export default User