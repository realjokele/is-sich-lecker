import * as React from 'react'

import { Plus } from 'lucide-react'

import { Button } from '~/components/ui/button'
import { TextField } from '~/components/ui/textfield'

export function AddIngredient({ defaultSectionId }: { defaultSectionId: string }) {
  const [newIngredient, setNewIngredient] = React.useState('')
  const [disabled, setDisabled] = React.useState(true)
  //   const fetcher = useFetcher({ key: 'add-ingredient' })

  function handleChange(ingredient: string) {
    setNewIngredient(ingredient)
    setDisabled(ingredient.length === 0)
  }

  //   React.useEffect(() => {
  //     if (fetcher.state === 'submitting') {
  //       setNewIngredient('')
  //       setIsDisabled(true)
  //     }
  //   }, [fetcher.state])

  return (
    <form method="post">
      <div className="flex items-center gap-2">
        <input type="hidden" name="intent" value="add-ingredient" />
        <input type="hidden" name="sectionId" value={defaultSectionId} />
        <TextField
          className="w-full"
          aria-label="Zutat"
          name="new-ingredient"
          value={newIngredient}
          onChange={(e) => handleChange(e.target.value)}
        />
        <Button type="submit" disabled={disabled}>
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </form>
  )
}
