import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterTableProducts1597143994017
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'products',
      'price',
      new TableColumn({
        name: 'price',
        type: 'decimal',
        precision: 13,
        scale: 2,
        isNullable: false,
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'products',
      'price',
      new TableColumn({
        name: 'price',
        type: 'float',
        isNullable: false,
      }),
    );
  }
}
