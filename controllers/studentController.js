import { StudentModel } from "../db/index.js"

const getAllStudents=async(req,res)=>{
    try {
    const allStudentsData=await StudentModel.findAll({
        where:{
            status:"active"
        }
    })
    return res.status(200).json({
        success: true,
        data: allStudentsData,
        message: "Students fetched successfully"
    });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching students",
            error: error.message
        });  
    }
    
}

const addStudent =async(req,res)=>{
    try {
        // Validate the request body
        if (!req.body.name ||!req.body.email) {
            return res.status(400).json({
                success: false,
                message: "Invalid request body. Name, Email are required."
            });
        }
    const newStudentData=await StudentModel.create(req.body)
    return res.status(201).json({
        success: true,
        data: newStudentData,
        message: "Student added successfully"
    });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error adding student",
            error: error.message
        });  
    }
}

const updateStudent = async (req, res) => {
    try {
        const { id, name, email } = req.body;

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
        const [updatedRows] = await StudentModel.update({
            ...(name && { name }),
            ...(email && { email }),
        }, {
            where: { id },
            returning: true
        });

        if (updatedRows === 0) {
            return res.status(400).json({
                success: false,
                message: "No changes were made"
            });
        }
        const updatedStudent = await StudentModel.findByPk(id);
        
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
};

const removeStudent = async (req, res) => {
    try {
        console.log("req is ===>",req.query.id)
        const { id } = req.query;

        // Validate ID
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Student ID is required"
            });
        }

        // Check if student exists
        const student = await StudentModel.findByPk(id);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        // Check if student is already inactive
        if (student.status === 'inactive') {
            return res.status(400).json({
                success: false,
                message: "Student is already inactive"
            });
        }

        // Update student status
        const [updatedRows] = await StudentModel.update(
            { status: 'inactive' },
            { 
                where: { id },
                returning: true
            }
        );

        if (updatedRows === 0) {
            return res.status(400).json({
                success: false,
                message: "Failed to update student status"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Student status updated to inactive successfully"
        });

    } catch (error) {
        console.error("Error removing student:", error);
        return res.status(500).json({
            success: false,
            message: "Error removing student",
            error: error.message
        });
    }
};
export {
getAllStudents,
addStudent,
updateStudent,
removeStudent
}