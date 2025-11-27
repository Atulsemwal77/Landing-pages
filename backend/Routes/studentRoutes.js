const express = require("express");
const { getStudents, createStudent } = require('../Controllers/studentController');

const router = express.Router();

router.get("/", getStudents);
router.post("/", createStudent);

module.exports = router;
