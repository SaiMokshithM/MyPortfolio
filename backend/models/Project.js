const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    longDescription: { type: String },
    image: { type: String },
    tags: [{ type: String, trim: true }],
    category: {
      type: String,
      enum: ['Full-Stack', 'Frontend', 'Backend', 'AI/ML', 'Mobile', 'Other'],
      default: 'Full-Stack',
    },
    github: { type: String },
    live: { type: String },
    featured: { type: Boolean, default: false },
    stars: { type: Number, default: 0 },
    order: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['active', 'archived', 'draft'],
      default: 'active',
    },
  },
  { timestamps: true }
)

// Indexes
projectSchema.index({ featured: -1, createdAt: -1 })
projectSchema.index({ category: 1 })
projectSchema.index({ status: 1 })

module.exports = mongoose.model('Project', projectSchema)
