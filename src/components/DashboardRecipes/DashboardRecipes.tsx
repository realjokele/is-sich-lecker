import type { Recipe } from '@prisma/client'
import DashboardRecipe from '~/components/DashboardRecipe/DashboardRecipe'
import { cn } from '~/utils/cn'

type DashboardRecipesProps = {
  recipes: Recipe[] | null
  className?: string
}
export function DashboardRecipes({ recipes, className }: DashboardRecipesProps) {
  if (!recipes || recipes.length === 0) {
    return (
      <div className={cn('flex flex-col items-center justify-center py-12', className)}>
        <p className="text-overlay-fg text-lg">Es sind noch keine Rezepte vorhanden</p>
        {/* <Button onClick={handleCreateRecipe}>Erstelle dein erstes Rezept.</Button> */}
      </div>
    )
  }

  return (
    <div className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3', className)}>
      {recipes.map((recipe) => (
        <DashboardRecipe key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}
