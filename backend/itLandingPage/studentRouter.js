const express = require("express");
const { getStudents, createStudent } = require('../itLandingPage/studentControllers');

const router = express.Router();

router.get("/", getStudents);
router.post("/", createStudent);

module.exports = router;
