import {
  ChevronsRight,
  ChevronsUp,
  CircleUserRound,
  EllipsisVerticalIcon,
  LoaderCircle,
  Minus,
} from 'lucide-react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Card } from '~/components/ui/card'
import { Menu } from '~/components/ui/menu'
import { $deleteRecipe } from '~/server/recipe/$delete-recipe'
import { ConfirmationDialog } from '../../../../components/ConfirmationDialog'
import { Button } from '../../../../components/ui/button'
// import { AlertDeleteDialog } from '#/components/AlertDeleteDialog/alert-delete-dialog'
// import { RecipeMenu } from './recipe-menu'

type RecipeWithCounts = {
  id: string
  title: string
  description: string | null
  preparationTime: number | null
  cookingTime: number | null
  level: number | null
  servings: number | null
  updatedAt: Date
  _count: {
    ingredients: number
    steps: number
    ratings: number
  }
}

type DashboardRecipeProps = {
  recipe: RecipeWithCounts
}

function useDeleteRecipe() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ recipeId }: { recipeId: string }) => $deleteRecipe({ data: { recipeId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] })
    },
  })
}

export default function DashboardRecipe({ recipe }: DashboardRecipeProps) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const { mutate: deleteRecipe } = useDeleteRecipe()
  const totalTime = (recipe.preparationTime || 0) + (recipe.cookingTime || 0)

  const handleDelete = () => {
    deleteRecipe({ recipeId: recipe.id })
  }

  return (
    <div className="relative">
      <Link to="/edit-recipe/$recipeId" params={{ recipeId: recipe.id }} className="block">
        <Card className="h-full">
          <Card.Header>
            <Card.Title>{recipe.title}</Card.Title>
            {recipe.description && (
              <Card.Description className="line-clamp-2">{recipe.description}</Card.Description>
            )}
          </Card.Header>
          <Card.Content>
            <div className="flex flex-wrap gap-4">
              {totalTime > 0 && (
                <div className="flex items-center gap-2">
                  <LoaderCircle className="h-4 w-4" />
                  <span className="text-sm">{totalTime} Min.</span>
                </div>
              )}
              {recipe.servings && (
                <div className="flex items-center gap-2">
                  <CircleUserRound className="h-4 w-4" />
                  <span className="text-sm">{recipe.servings} Portionen</span>
                </div>
              )}
              {recipe.level && (
                <div className="flex items-center gap-2">
                  <ChevronsUp className="h-4 w-4" />
                  <span className="text-sm">Stufe {recipe.level}</span>
                </div>
              )}
            </div>
            <div className="text-muted-fg mt-4 flex gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Minus className="h-4 w-4" />
                {/* {recipe._count.ingredients ?? 0} Zutaten */}
              </div>
              <div className="flex items-center gap-1">
                <ChevronsRight className="h-4 w-4" />
                {/* {recipe._count.steps ?? 0} Schritte */}
              </div>
              {/* {recipe._count.ratings > 0 && (
              <div className="flex items-center gap-1">
                <CircleCheck className="h-4 w-4" />
                {recipe._count.ratings ?? 0} Bewertungen
              </div>
            )} */}
            </div>
          </Card.Content>

          <Card.Footer>
            <Menu.Root>
              <Menu.Trigger onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="icon">
                  <EllipsisVerticalIcon />
                </Button>
                <Menu.Content>
                  <Menu.Item onClick={() => setConfirmDelete(true)}>Rezept löschen</Menu.Item>
                </Menu.Content>
              </Menu.Trigger>
            </Menu.Root>
          </Card.Footer>
        </Card>
      </Link>

      <ConfirmationDialog
        onConfirm={handleDelete}
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title="Rezept löschen"
        confirmButtonText="Löschen"
        cancelButtonText="Abbrechen"
        description={`Möchtest du "${recipe.title}" wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.`}
      />
    </div>
  )
}
