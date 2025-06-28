import { PlusIcon } from 'lucide-react'

export function RecipeEditorStepsSection() {
  return (
    <div className="flex-1">
      <h2 className="text-overlay-fg mb-4 text-xl font-semibold">Zubereitung</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <PlusIcon className="text-primary h-6 w-6" />
          <p className="text-overlay-fg">Abschnitt hinzufügen</p>
        </div>
        <div className="flex items-center gap-2">
          <PlusIcon className="text-primary h-6 w-6" />
          <p className="text-overlay-fg">Schritt hinzufügen</p>
        </div>
      </div>
    </div>
  )
}
