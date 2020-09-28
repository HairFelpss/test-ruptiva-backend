import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne
} from 'typeorm'

import FightEvent from './FightEvent'
import Fighter from './Fighter'

@Entity('fights')
class Fight {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  main: boolean

  @OneToMany((type) => Fighter, (fighters) => Fighter)
  fighters: Fighter[]

  @ManyToOne((type) => FightEvent, (event) => Fight, { nullable: false })
  event: FightEvent
}

export default Fight
