import { createFileRoute } from '@tanstack/react-router'
import { Project } from '../pages/projectPage'

export const Route = createFileRoute('/project')({
  component: Project,
})


