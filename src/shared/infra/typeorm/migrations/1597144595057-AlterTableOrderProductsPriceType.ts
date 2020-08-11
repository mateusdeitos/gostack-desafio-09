import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterTableOrderProductsPriceType1597144595057
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'orders_products',
      'price',
      new TableColumn({
        name: 'price',
        type: 'decimal',
        precision: 13,
        scale: 2,
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'orders_products',
      'price',
      new TableColumn({
        name: 'price',
        type: 'float',
        isNullable: false,
      }),
    );
  }
}
