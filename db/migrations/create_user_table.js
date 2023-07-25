exports.up = function (knex) {
    return knex.schema.withSchema('users').createTable('users', function (table) {
      table.increments('user_id').primary();
      table.string('username').unique().notNullable();
      table.string('password').notNullable();
      table.string('salt').notNullable();
      table.string('email').unique().notNullable();
      table.string('first_name');
      table.string('last_name');
      table.date('date_of_birth');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.string('phone_number');
      table.string('address');
      table.string('profile_picture');
      table.text('bio');
      table.boolean('is_verified').defaultTo(false);
      table.string('verification_token');
      table.string('password_reset_token');
      table.timestamp('last_login');
      table.integer('login_attempts').defaultTo(0);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.withSchema('users').dropTableIfExists('users');
  };
  