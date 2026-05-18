const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Project = require('./models/Project')

dotenv.config()

const sampleProjects = [
  {
    title: 'EcommerceHub',
    description: 'A full-stack e-commerce platform with real-time inventory, payment integration via Stripe, and admin dashboard. Built with React, Node.js, and MongoDB.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
    category: 'Full-Stack',
    github: 'https://github.com',
    live: 'https://example.com',
    featured: true,
    stars: 248,
    order: 1,
  },
  {
    title: 'AI Content Studio',
    description: 'An AI-powered content generation platform leveraging OpenAI API with real-time streaming, history management, and multi-model support.',
    tags: ['Next.js', 'OpenAI', 'TypeScript', 'Prisma'],
    category: 'AI/ML',
    github: 'https://github.com',
    live: 'https://example.com',
    featured: true,
    stars: 312,
    order: 2,
  },
  {
    title: 'DevCollab',
    description: 'Real-time collaborative code editor with video chat, GitHub integration, and AI code suggestions built for developer teams.',
    tags: ['React', 'Socket.io', 'WebRTC', 'Express'],
    category: 'Full-Stack',
    github: 'https://github.com',
    live: 'https://example.com',
    featured: true,
    stars: 189,
    order: 3,
  },
  {
    title: 'CryptoTracker Pro',
    description: 'Real-time cryptocurrency portfolio tracker with price alerts, predictions, and interactive charts powered by CoinGecko API.',
    tags: ['React', 'Chart.js', 'WebSocket', 'Tailwind'],
    category: 'Frontend',
    github: 'https://github.com',
    live: 'https://example.com',
    featured: false,
    stars: 97,
    order: 4,
  },
  {
    title: 'MicroAuth',
    description: 'A microservices-based authentication system with JWT, OAuth2, MFA support, and role-based access control built with Node.js.',
    tags: ['Node.js', 'JWT', 'OAuth', 'Redis', 'Docker'],
    category: 'Backend',
    github: 'https://github.com',
    live: null,
    featured: false,
    stars: 156,
    order: 5,
  },
  {
    title: 'HealthMetrics',
    description: 'A health and fitness tracking app with ML-based workout recommendations, nutrition logging, and beautiful data visualizations.',
    tags: ['React Native', 'Python', 'FastAPI', 'PostgreSQL'],
    category: 'Mobile',
    github: 'https://github.com',
    live: 'https://example.com',
    featured: false,
    stars: 74,
    order: 6,
  },
]

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio')
    console.log('✅ Connected to MongoDB')

    await Project.deleteMany({})
    console.log('🗑️  Cleared existing projects')

    const projects = await Project.insertMany(sampleProjects)
    console.log(`✅ Seeded ${projects.length} projects`)

    await mongoose.disconnect()
    console.log('✅ Seeding complete!')
    process.exit(0)
  } catch (err) {
    console.error('❌ Seed error:', err)
    process.exit(1)
  }
}

seed()
