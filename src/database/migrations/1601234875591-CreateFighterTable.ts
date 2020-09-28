import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateFighterTable1601234875591 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

    await queryRunner.createTable(
      new Table({
        name: 'fighters',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'age',
            type: 'int'
          },
          {
            name: 'division',
            type: 'varchar'
          },
          {
            name: 'height',
            type: 'varchar'
          },
          {
            name: 'wingspan',
            type: 'varchar'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('fighters')
    await queryRunner.query('DROP EXTENSION "uuid-ossp"')
  }
}
