const express = require('express')
const { body, validationResult } = require('express-validator')
const Contact = require('../models/Contact')

const router = express.Router()

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  next()
}

const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('email').trim().isEmail().withMessage('Valid email required').normalizeEmail(),
  body('subject').optional().trim().isLength({ max: 200 }),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 2000 }),
]

// ─── POST /api/contact ─────────────────────────────────────────────────────────
router.post('/', contactValidation, validate, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

    const contact = await Contact.create({ name, email, subject, message, ip })

    // Optionally send email notification here
    // await sendNotificationEmail(contact)

    res.status(201).json({
      success: true,
      message: 'Message received! I\'ll get back to you within 24 hours.',
      id: contact._id,
    })
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to send message. Please try again.' })
  }
})

// ─── GET /api/contact (admin) ──────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query
    const filter = {}
    if (status) filter.status = status

    const total = await Contact.countDocuments(filter)
    const messages = await Contact
      .find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))

    res.json({ success: true, data: messages, total })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

// ─── PATCH /api/contact/:id/status ────────────────────────────────────────────
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body
    const validStatuses = ['unread', 'read', 'replied', 'archived']
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' })
    }
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
    if (!contact) return res.status(404).json({ error: 'Message not found' })
    res.json({ success: true, data: contact })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

module.exports = router
