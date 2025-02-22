import { Sequelize } from "sequelize";
import { createStudentModel } from "../model/studentSchema.js";
import { createGradeModel } from "../model/gradesSchema.js";
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const {DB_URL}=process.env


const sequelize = new Sequelize(DB_URL,{
    dialect: 'postgres' 
})
let StudentModel=null
let GradeModel=null
const connection=async()=>{
    try {
        await sequelize.authenticate();
        
        StudentModel=await createStudentModel(sequelize)
        GradeModel = await createGradeModel(sequelize);

        StudentModel.hasOne(GradeModel, {
            foreignKey: 'student_id'  // specify the foreign key name
        });
        GradeModel.belongsTo(StudentModel, {
            foreignKey: 'student_id'  // use the same foreign key name
        });
        await sequelize.sync();
        console.log("database syc done");
        
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export {
    connection,
    StudentModel,
    GradeModel
}