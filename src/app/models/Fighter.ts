import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'

import Fight from './Fight'

@Entity('fighters')
class Fighter {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  age: number

  @Column()
  division: string

  @Column()
  height: string

  @Column()
  wingspan: string

  @ManyToOne((type) => Fight, (fight) => Fighter)
  fight: Fight
}

export default Fighter
