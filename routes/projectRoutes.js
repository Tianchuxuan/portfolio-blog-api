const express = require('express');
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();


router.get('/', getProjects);


router.route('/my-projects')
  .get(protect, getProjects) 
  .post(protect, createProject); 

router.route('/my-projects/:id')
  .get(protect, getProject) 
  .put(protect, updateProject) 
  .delete(protect, deleteProject); 

module.exports = router;