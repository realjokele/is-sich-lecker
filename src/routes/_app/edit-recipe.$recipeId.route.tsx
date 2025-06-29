import * as React from 'react'
import { Recipe } from '@prisma/client'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ConfirmationDialog } from '~/components/ConfirmationDialog'
import { EditableText } from '~/components/EditableText'
import { Button } from '~/components/ui/button'
import { $getRecipe } from '~/server/recipe/$get-recipe'
import { useRecipeStore } from '~/features/recipe-editor/hooks/use-recipe-store'
import { useSaveRecipe } from '~/features/recipe-editor/hooks/use-save-recipe'
import { IngredientSection } from '~/features/recipe-editor/components/ingredient-section'
import { RecipeEditorStepsSection } from '~/features/recipe-editor/components/steps-section'

export const Route = createFileRoute('/_app/edit-recipe/$recipeId')({
  component: EditRecipe,
  loader: async ({ params }) => {
    const recipe = await $getRecipe({ data: { recipeId: params.recipeId } })
    return { recipe }
  },
})

export default function EditRecipe() {
  const { recipe } = Route.useLoaderData() as { recipe: Recipe }
  const { recipeId } = Route.useParams()
  const navigate = useNavigate()
  const { mutate: saveRecipe } = useSaveRecipe()
  const [confirmationOpen, setConfirmationOpen] = React.useState(false)

  // Get store state and actions
  const storeRecipe = useRecipeStore((state) => state.recipe)
  const hasChanges = useRecipeStore((state) => state.hasChanges)
  const setTitle = useRecipeStore((state) => state.setTitle)
  const initializeRecipe = useRecipeStore((state) => state.initializeRecipe)
  const resetStore = useRecipeStore((state) => state.reset)

  // Use store recipe if available, otherwise fall back to loader recipe
  const currentRecipe = storeRecipe || recipe
  const title = currentRecipe?.title ?? ''

  // Initialize store when recipe changes
  React.useEffect(() => {
    if (recipe) {
      // Transform the recipe to include relations (you'll need to update $getRecipe to include these)
      const recipeWithRelations = {
        ...recipe,
        ingredientSections: [],
        steps: [],
      }
      initializeRecipe(recipeWithRelations)
    }

    return () => {
      resetStore()
    }
  }, [recipeId, recipe, initializeRecipe, resetStore])

  const handleSave = () => {
    if (currentRecipe) {
      saveRecipe({
        recipeId,
        title: currentRecipe.title,
        // Add other fields as needed when you expand the save functionality
      })
    }
  }

  const handleAbort = () => {
    if (hasChanges) {
      setConfirmationOpen(true)
    } else {
      navigate({ to: '/dashboard' })
    }
  }

  return (
    <div className="bg-bg min-h-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-overlay sm:p-8">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <EditableText
                fieldName="recipeTitle"
                value={title}
                className="text-overlay-fg font-bold hover:cursor-pointer sm:text-3xl"
                onChangeValue={setTitle}
                placeholder="Rezeptname"
              />
            </div>
            <div className="flex gap-4">
              <Button variant="secondary" onClick={handleAbort}>
                Abbrechen
              </Button>
              <Button onClick={handleSave}>Rezept speichern</Button>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-8 lg:flex-row">
            <IngredientSection />
            <RecipeEditorStepsSection />
          </div>
        </div>
      </div>

      <AbortConfirmationDialog
        confirmationOpen={confirmationOpen}
        setConfirmationOpen={setConfirmationOpen}
        onConfirm={() => navigate({ to: '/dashboard' })}
      />
    </div>
  )
}

function AbortConfirmationDialog({
  confirmationOpen,
  setConfirmationOpen,
  onConfirm,
}: {
  confirmationOpen: boolean
  setConfirmationOpen: (open: boolean) => void
  onConfirm: () => void
}) {
  return (
    <ConfirmationDialog
      title="Möchtest du das Rezept wirklich verwerfen?"
      description="Alle nicht gespeicherten Änderungen gehen verloren."
      confirmButtonText="Verwerfen"
      cancelButtonText="Abbrechen"
      open={confirmationOpen}
      onOpenChange={setConfirmationOpen}
      onConfirm={onConfirm}
    />
  )
}
