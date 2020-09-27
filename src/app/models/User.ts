import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm'
import brycpt from 'bcryptjs'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await brycpt.hash(this.password, 10)
  }

  checkPassword(password: string) {
    return brycpt.compare(password, this.password)
  }
}

export default User
