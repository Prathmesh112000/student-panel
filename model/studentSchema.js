import {DataTypes} from 'sequelize'
export const createStudentModel=async(sequelize)=>{
    const Student= sequelize.define('Student',{
        name:{
            type:DataTypes.STRING
        },
        email:{
            type:DataTypes.STRING,
            unique:true
        },
        age:{
           type:DataTypes.INTEGER 
        },
        status:{
            type:DataTypes.ENUM('active', 'inactive'),
            defaultValue:'active'
        }
    })

    return Student;
}