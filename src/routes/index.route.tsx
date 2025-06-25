import { createFileRoute } from '@tanstack/react-router'
import { Select } from '~/components/ui/select'
export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="p-2">
      <h3>Index</h3>
      <Select>
        <Select.Trigger>
          <Select.Value placeholder="Select an option" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="1">Option 1</Select.Item>
          <Select.Item value="2">Option 2</Select.Item>
          <Select.Item value="3">Option 3</Select.Item>
        </Select.Content>
      </Select>
    </div>
  )
}
