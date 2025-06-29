import * as React from 'react'

import { Plus } from 'lucide-react'

import { Button } from '~/components/ui/button'
import { TextField } from '~/components/ui/textfield'
import { useIngredientSectionActions } from '~/features/recipe-editor/hooks/use-recipe-selectors'

export function AddIngredientSection() {
  const { addIngredientSection } = useIngredientSectionActions()
  const [newSectionName, setNewSectionName] = React.useState('')
  const [isAddingSection, setIsAddingSection] = React.useState(false)

  const handleAddSection = React.useCallback(
    (sectionName: string) => {
      addIngredientSection({
        id: `temp-id-${crypto.randomUUID()}`,
        name: sectionName,
        type: 'CUSTOM',
      })
      setIsAddingSection(false)
      setNewSectionName('')
    },
    [addIngredientSection],
  )

  useEnterKeyHandler(isAddingSection, newSectionName, handleAddSection)

  if (isAddingSection) {
    return (
      <div className="space-y-2">
        <input type="hidden" name="intent" value="add-section" />
        <TextField
          className="w-full"
          aria-label="Abschnittsname"
          name="sectionName"
          value={newSectionName}
          onChange={(e) => setNewSectionName(e.target.value)}
          autoFocus
        />
        <div className="flex gap-2">
          <Button
            type="submit"
            onClick={() => handleAddSection(newSectionName)}
            disabled={newSectionName.length === 0}
          >
            Hinzufügen
          </Button>
          <Button type="button" variant="outline" onClick={() => setIsAddingSection(false)}>
            Abbrechen
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Button variant="outline" className="gap-2" onClick={() => setIsAddingSection(true)}>
      <Plus className="h-4 w-4" />
      Abschnitt hinzufügen
    </Button>
  )
}

function useEnterKeyHandler(
  isActive: boolean,
  currentValue: string,
  onEnter: (value: string) => void,
) {
  React.useEffect(() => {
    if (!isActive) return

    const eventHandler = (e: KeyboardEvent) => {
      if (e.code !== 'Enter') return
      onEnter(currentValue)
    }

    window.addEventListener('keyup', eventHandler)
    return () => window.removeEventListener('keyup', eventHandler)
  }, [isActive, currentValue, onEnter])
}
