import {DataTypes} from 'sequelize'
export const createGradeModel=async(sequelize)=>{
    const Grades= sequelize.define('Grades',{
        student_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'Students',
                key: 'id'         
            },
            allowNull: false
        },
        dbms:{
            type:DataTypes.INTEGER 
        },
        computer_networks:{
           type:DataTypes.INTEGER 
        },
        cloud_computing:{
            type:DataTypes.INTEGER 
        }
    })

    return Grades;
}