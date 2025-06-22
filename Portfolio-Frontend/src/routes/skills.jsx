import { createFileRoute } from '@tanstack/react-router'
import { Skills } from '../pages/skills.jsx'

export const Route = createFileRoute('/skills')({
  component: Skills,
})

