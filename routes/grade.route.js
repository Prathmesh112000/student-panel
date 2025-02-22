import express from 'express';
import { addGrades,updateGrades,getGradesStudents } from '../controllers/gradeController.js';

const router = express.Router();

router.get("/getGrades", getGradesStudents);
router.post("/addGrades", addGrades);
 router.put("/updateGrades", updateGrades);

export default router

