import Sequelize from "sequelize";
import { DBConnection } from "../database/database";

const Task = DBConnection.define('tasks', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.TEXT
    },
    done: {
        type: Sequelize.BOOLEAN
    },
    projectid: {
        type: Sequelize.INTEGER
    }
}, {
   timestamps: false 
});

export default Task;