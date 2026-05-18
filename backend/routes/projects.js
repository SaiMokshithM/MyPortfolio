const express = require('express')
const { body, query, param, validationResult } = require('express-validator')
const Project = require('../models/Project')

const router = express.Router()

// ─── Validation middleware ─────────────────────────────────────────────────────
const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

const projectValidation = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 100 }),
  body('description').trim().notEmpty().withMessage('Description is required').isLength({ max: 1000 }),
  body('category').optional().isIn(['Full-Stack', 'Frontend', 'Backend', 'AI/ML', 'Mobile', 'Other']),
  body('tags').optional().isArray(),
  body('featured').optional().isBoolean(),
]

// ─── GET /api/projects ─────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const { category, featured, page = 1, limit = 20 } = req.query
    const filter = { status: 'active' }
    if (category && category !== 'All') filter.category = category
    if (featured !== undefined) filter.featured = featured === 'true'

    const total = await Project.countDocuments(filter)
    const projects = await Project
      .find(filter)
      .sort({ featured: -1, order: 1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .select('-__v')

    res.json({
      success: true,
      data: projects,
      pagination: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / limit) },
    })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

// ─── GET /api/projects/:id ─────────────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).select('-__v')
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' })
    res.json({ success: true, data: project })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

// ─── POST /api/projects ────────────────────────────────────────────────────────
router.post('/', projectValidation, validate, async (req, res) => {
  try {
    const project = await Project.create(req.body)
    res.status(201).json({ success: true, data: project })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ success: false, error: 'Duplicate project title' })
    }
    res.status(500).json({ success: false, error: err.message })
  }
})

// ─── PUT /api/projects/:id ─────────────────────────────────────────────────────
router.put('/:id', projectValidation, validate, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' })
    res.json({ success: true, data: project })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

// ─── DELETE /api/projects/:id ──────────────────────────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' })
    res.json({ success: true, message: 'Project deleted' })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

module.exports = router
