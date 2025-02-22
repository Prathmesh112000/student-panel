import { GradeModel, StudentModel } from "../db/index.js"

const getGradesStudents=async(req,res)=>{
    try {
    const allGradesData=await GradeModel.findAll({
        where: {
            student_id: req.query.student_id
        }
    })
    return res.status(200).json({
        success: true,
        data: allGradesData,
        message: "Grades fetched successfully"
    });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching students grades",
            error: error.message
        });  
    }
    
}
const addGrades =async(req,res)=>{
    try {
        // Validate the request body
        if (!req.body.cloud_computing ||!req.body.computer_networks || !req.body.dbms) {
            return res.status(400).json({
                success: false,
                message: "Invalid request body. cloud_computing, computer_networks, and dbms are required."
            });
        }
        if (!req.body.student_id) {
            return res.status(400).json({
                success: false,
                message: "Invalid request body. student id is required."
            });
        }
        let id=req.body.student_id
        const allGradesData=await GradeModel.findAll({
            where: {
                student_id: id
            }
        })
        if(allGradesData.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Grades Already Found"
            });
        }
        const checkIfStudentExists = await StudentModel.findByPk(id)
        if(!checkIfStudentExists){
            return res.status(400).json({
                success: false,
                message: `Student with id:${id} not exist `
            });
        }
        const payload={
            student_id: req.body.student_id,
            cloud_computing: req.body.cloud_computing,
            computer_networks: req.body.computer_networks,
            dbms: req.body.dbms
        }
    const newStudentGradeData=await GradeModel.create(payload)
    return res.status(201).json({
        success: true,
        data: newStudentGradeData,
        message: "Grades added successfully"
    });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error adding student",
            error: error.message
        });  
    }
}

const updateGrades = async (req, res) => {
    try {
        const { student_id,dbms, computer_networks, cloud_computing } = req.body;
        let id=student_id
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Student ID is required"
            });
        }

        const existingStudent = await StudentModel.findByPk(id);
        if (!existingStudent) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }
        const [updatedRows] = await GradeModel.update({
            ...(dbms && { dbms}),
            ...(computer_networks && { computer_networks }),
            ...(cloud_computing && { cloud_computing })
        }, {
            where: { student_id:id },
            returning: true
        });

        if (updatedRows === 0) {
            return res.status(400).json({
                success: false,
                message: "No changes were made"
            });
        }
        const updatedStudent = await GradeModel.findAll({
            where: {
                student_id: id
            }
        });
        
        return res.status(200).json({
            success: true,
            message: "Student updated successfully",
            data: updatedStudent
        });

    } catch (error) {
        console.error("Error updating student:", error);
        return res.status(500).json({
            success: false,
            message: "Error updating student",
            error: error.message
        });
    }
}
export {
    getGradesStudents,
    addGrades,
    updateGrades
}
