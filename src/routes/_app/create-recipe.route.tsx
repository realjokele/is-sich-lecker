import { useMutation } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { PlusIcon } from 'lucide-react'
import { toast as sonnerToast } from 'sonner'
import { EditableText } from '~/components/EditableText'
import { Link } from '~/components/ui/link'
import { cn } from '~/utils/tw'
import { $changeRecipeTitle } from '~/server/$change-recipe-title'
import { buttonStyles } from '~/components/ui/button'

export const Route = createFileRoute('/_app/create-recipe')({
  component: CreateRecipe,
})

function useToast() {
  function toast({ type, message }: { type: 'error' | 'success'; message: string }) {
    switch (type) {
      case 'error':
        sonnerToast.error(message)
        break
      case 'success':
        sonnerToast.success(message)
        break
      default:
        break
    }
  }
  return toast
}

function useChangeTitle() {
  const toast = useToast()

  return useMutation({
    mutationFn: ({ title }: { title: string }) => $changeRecipeTitle({ data: title }),
    onSuccess: (data) => {
      toast({
        type: 'success',
        message: 'hat geklappt',
      })
    },
    onError: (error) => {
      toast({
        type: 'error',
        message: error.message,
      })
    },
  })
}

export default function CreateRecipe() {
  const { mutate } = useChangeTitle()

  function handleChangeTitle(title: string) {
    mutate({ title })
  }

  return (
    <div className="bg-bg min-h-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-overlay sm:p-8">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <EditableText
                fieldName="newTitle"
                value={'recipe.title'}
                className="text-overlay-fg font-bold hover:cursor-pointer sm:text-3xl"
                mutationFn={handleChangeTitle}
              />
            </div>
            <Link to={'/dashboard'} className={cn(buttonStyles({ size: 'large' }), 'px-10')}>
              Fertig
            </Link>
          </div>

          <div className="mt-8 flex flex-col gap-8 lg:flex-row">
            <div className="w-[600px]">
              <h2 className="text-overlay-fg mb-3 text-xl font-semibold">Zutaten</h2>
              <div className="mb-6 text-xs">
                Welche Zutaten werden für dein Rezept benötigt? Trage Menge, Einheit und die verwendete Zutat pro Feld
                ein.
              </div>
              {/* <div className="space-y-8">
                <EditIngredientSections ingredientSections={recipe.ingredientSections} />
                <AddIngredient defaultSectionId={defaultSectionId} />
                <AddIngredientSection />
              </div> */}
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
    </div>
  )
}
