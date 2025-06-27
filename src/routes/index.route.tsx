import { createFileRoute } from '@tanstack/react-router'
import { Switch } from '~/components/ui/switch'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="p-2">
      <h3>Index</h3>
      <Switch className="w-24">bla</Switch>
    </div>
  )
}
