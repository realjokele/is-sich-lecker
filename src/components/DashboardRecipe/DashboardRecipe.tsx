import { ChevronsRight, ChevronsUp, CircleCheck, CircleUserRound, LoaderCircle, Minus } from 'lucide-react'

import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Card } from '~/components/ui/card'
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

export default function DashboardRecipe({ recipe }: DashboardRecipeProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const totalTime = (recipe.preparationTime || 0) + (recipe.cookingTime || 0)

  const handleDelete = () => {
    const formData = new FormData()
    formData.append('id', recipe.id)
    // fetcher.submit(formData, { method: 'post' })
  }

  return (
    <div className="relative">
      {/* <Link to={href('/edit-recipe/:id', { id: recipe.id })} className="block"> */}
      <Card className="h-full transition-transform hover:scale-[1.02]">
        <Card.Header>
          <Card.Title>{recipe.title}</Card.Title>
          {recipe.description && <Card.Description className="line-clamp-2">{recipe.description}</Card.Description>}
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
          <Card.Footer>
            {/* <button onClick={(e) => e.preventDefault()}>
              <RecipeMenu onDelete={() => setIsDeleteDialogOpen(true)} />
            </button> */}
          </Card.Footer>
        </Card.Content>
      </Card>
      {/* </Link> */}

      {/* <AlertDeleteDialog
        title="Rezept löschen"
        message={`Möchtest du "${recipe.title}" wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.`}
        onDelete={handleDelete}
        okay="Löschen"
        cancel="Abbrechen"
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      /> */}
    </div>
  )
}
