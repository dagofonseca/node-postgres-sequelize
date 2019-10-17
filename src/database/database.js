import Sequelize from "sequelize";

export const DBConnection = new Sequelize(
    'node_postgres_db',
    'postgres',
    'cleancoder',
    {
        host: 'localhost',
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000
        },
        logging: false
    }
)