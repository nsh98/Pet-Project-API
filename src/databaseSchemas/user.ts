const initUserTable = (knex: any) => {
  return knex.schema.hasTable("user").then((exists: boolean) => {
    if (!exists) {
      return knex.schema.createTable("user", (property: any) => {
        property.increments("id").unsigned().primary();
        property.string("user_name", 255).notNullable();
        property.string("password", 255).notNullable();
        property
          .datetime("create_time")
          .notNullable()
          .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
        property
          .datetime("update_time")
          .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
        property.boolean("is_delete").defaultTo(0);
      });
    }
  });
};

export default initUserTable;
