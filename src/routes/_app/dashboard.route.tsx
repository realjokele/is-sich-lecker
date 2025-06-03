import type { Recipe } from '@prisma/client'

import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { $getUserRecipes } from '~/server/$get-user-recipes'
import { cn } from '~/utils/tw'

const userRecipesQueryOptions = queryOptions({
  queryKey: ['recipes'],
  queryFn: () => $getUserRecipes(),
})

export const Route = createFileRoute({
  component: Dashboard,
  loader: ({ context }) => {
    const queryClient = context.queryClient

    return queryClient.ensureQueryData(userRecipesQueryOptions)
  },
})

function Dashboard() {
  // const [isNewRecipeDialogOpen, setIsNewRecipeDialogOpen] = React.useState(false)
  const { data: recipes } = useSuspenseQuery(userRecipesQueryOptions)

  return (
    <div className="flex flex-col">
      <div className="text-primary text-6xl font-bold">Is sich lecker!!</div>

      {/* <Button onPress={() => setIsNewRecipeDialogOpen(true)}>Neues Rezept</Button> */}
      {/* <CreateRecipeDialog isOpen={isNewRecipeDialogOpen} onOpenChange={setIsNewRecipeDialogOpen} /> */}

      <DashboardRecipes recipes={recipes} className="my-4" />
    </div>
  )
}

type DashboardRecipesProps = {
  recipes: Recipe[] | null
  className?: string
}

export default function DashboardRecipes({ recipes, className }: DashboardRecipesProps) {
  if (!recipes || recipes.length === 0) {
    return (
      <div className={cn('flex flex-col items-center justify-center py-12', className)}>
        <p className="text-overlay-fg text-lg">Es sind noch keine Rezepte vorhanden</p>
        <p className="text-overlay-fg">Erstelle dein erstes Rezept.</p>
      </div>
    )
  }

  return (
    <div className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3', className)}>
      {/* {recipes.map((recipe) => (
        <DashboardRecipe key={recipe.id} recipe={recipe} />
      ))} */}
    </div>
  )
}
