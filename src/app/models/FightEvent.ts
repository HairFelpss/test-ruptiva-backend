import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

import Fight from './Fight'

@Entity('events')
class FightEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  local: string

  @OneToMany((type) => Fight, (fights) => FightEvent)
  fights: Fight[]
}

export default FightEvent
