import express from 'express';
import { getAllStudents,addStudent,updateStudent,removeStudent } from '../controllers/studentController.js';

const router = express.Router();

router.get("/getAll", getAllStudents);
router.post("/addStudent", addStudent);
router.put("/updateStudent", updateStudent);
router.put("/removeStudent", removeStudent);
export default router

