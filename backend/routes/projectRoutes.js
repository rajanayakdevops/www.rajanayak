const express = require('express');
const { getProjects, createProject, getProject } = require('../controllers/projectController');
const { seedProjects } = require('../controllers/seedController');

const router = express.Router();

router.get('/', getProjects);
router.post('/', createProject);
router.get('/:id', getProject);
router.post('/seed', seedProjects);

module.exports = router;