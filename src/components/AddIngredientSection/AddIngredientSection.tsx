import * as React from 'react'

import { Plus } from 'lucide-react'

// import { useFetcher } from 'react-router'
import { Button } from '~/components/ui/button'
import { TextField } from '~/components/ui/textfield'

export function AddIngredientSection() {
  // const fetcher = useFetcher()
  const [newSectionName, setNewSectionName] = React.useState('')
  const [isAddingSection, setIsAddingSection] = React.useState(false)

  // React.useEffect(() => {
  //   if (fetcher.state === 'submitting') {
  //     setIsAddingSection(false)
  //     setNewSectionName('')
  //   }
  // }, [fetcher.state])

  return (
    <>
      {isAddingSection ? (
        <form method="post" className="space-y-2">
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
            <Button type="submit" disabled={newSectionName.length === 0}>
              Hinzufügen
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsAddingSection(false)}>
              Abbrechen
            </Button>
          </div>
        </form>
      ) : (
        <Button variant="outline" className="gap-2" onClick={() => setIsAddingSection(true)}>
          <Plus className="h-4 w-4" />
          Abschnitt hinzufügen
        </Button>
      )}
    </>
  )
}
