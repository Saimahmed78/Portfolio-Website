import { createFileRoute } from '@tanstack/react-router'
import { About } from '../pages/aboutme'

export const Route = createFileRoute('/about')({
  component: About,
})

