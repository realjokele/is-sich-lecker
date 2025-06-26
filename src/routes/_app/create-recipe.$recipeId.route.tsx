import { useMutation } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { PlusIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import { AddIngredient } from '~/components/AddIngredient'
import { AddIngredientSection } from '~/components/AddIngredientSection'
import { ConfirmationDialog } from '~/components/ConfirmationDialog'
import { EditableText } from '~/components/EditableText'
import { Button } from '~/components/ui/button'
import { $changeRecipeTitle } from '~/server/recipe/$change-recipe-title'
import { $deleteRecipe } from '~/server/recipe/$delete-recipe'
import { $saveRecipe } from '~/server/recipe/$save-recipe'

export const Route = createFileRoute('/_app/create-recipe/$recipeId')({
  component: CreateRecipe,
})

function useChangeTitle() {
  return useMutation({
    mutationFn: ({ title }: { title: string }) => $changeRecipeTitle({ data: title }),
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

function useDeleteRecipe() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (id: string) => $deleteRecipe({ data: { id } }),
    onSuccess: () => {
      navigate({ to: '/dashboard' })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

type SaveRecipeData = {
  recipeId: string
  title: string
}

function useSaveRecipe() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: ({ recipeId, title }: SaveRecipeData) => $saveRecipe({ data: { recipeId, title } }),
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      navigate({ to: '/dashboard' })
    },
  })
}

export default function CreateRecipe() {
  const { recipeId } = Route.useParams()
  const { mutate: deleteRecipe } = useDeleteRecipe()
  const { mutate: saveRecipe } = useSaveRecipe()
  const [recipeTitle, setRecipeTitle] = React.useState('')
  const [confirmationOpen, setConfirmationOpen] = React.useState(false)

  function handleAbort() {
    deleteRecipe(recipeId)
  }

  function handleSaveRecipe() {
    saveRecipe({ recipeId, title: recipeTitle })
  }

  return (
    <div className="bg-bg min-h-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-overlay sm:p-8">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <EditableText
                fieldName="recipeTitle"
                value={recipeTitle}
                className="text-overlay-fg font-bold hover:cursor-pointer sm:text-3xl"
                onChangeValue={setRecipeTitle}
                placeholder="Rezeptname"
              />
            </div>
            <div className="flex gap-4">
              <Button variant="secondary" onClick={() => setConfirmationOpen(true)}>
                Abbrechen
              </Button>
              <Button onClick={handleSaveRecipe}>Rezept speichern</Button>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-8 lg:flex-row">
            <div className="w-[600px]">
              <h2 className="text-overlay-fg mb-3 text-xl font-semibold">Zutaten</h2>
              <div className="mb-6 text-xs">
                Welche Zutaten werden für dein Rezept benötigt? Trage Menge, Einheit und die
                verwendete Zutat pro Feld ein.
              </div>
              <div className="space-y-8">
                {/* <EditIngredientSections ingredientSections={recipe.ingredientSections} /> */}
                <AddIngredient defaultSectionId={'defaultSectionId'} />
                <AddIngredientSection />
              </div>
            </div>

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
          </div>
        </div>
      </div>

      <ConfirmationDialog
        title="Möchtest du das Rezept wirklich verwerfen?"
        description="Alle nicht gespeicherten Änderungen gehen verloren."
        confirmButtonText="Verwerfen"
        cancelButtonText="Abbrechen"
        open={confirmationOpen}
        onOpenChange={setConfirmationOpen}
        onConfirm={handleAbort}
      />
    </div>
  )
}
