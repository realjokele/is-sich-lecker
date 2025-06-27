import { queryOptions, useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { PlusIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import { DashboardRecipes } from '~/components/DashboardRecipes'
import { Button } from '~/components/ui/button'
import { $createRecipe } from '~/server/recipe/$create-recipe'
import { $getUserRecipes } from '~/server/recipe/$get-user-recipes'

export const Route = createFileRoute('/_app/dashboard')({
  component: Dashboard,
  loader: ({ context }) => {
    const { userSession } = context
    const queryClient = context.queryClient
    return queryClient.ensureQueryData(userRecipesQueryOptions(userSession.session.userId))
  },
})

const userRecipesQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: ['recipes', { userId }],
    queryFn: () => $getUserRecipes(),
  })

function useCreateRecipe() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: ({ title }: { title: string }) => $createRecipe({ data: { title } }),
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      navigate({ to: '/edit-recipe/$recipeId', params: { recipeId: data.id } })
    },
  })
}

function Dashboard() {
  const { userSession } = Route.useRouteContext()
  const { data: recipes } = useSuspenseQuery(userRecipesQueryOptions(userSession.session.userId))
  const { mutate } = useCreateRecipe()
  const [createRecipe, setCreateRecipe] = React.useState(false)

  function handleCreateRecipe() {
    // Using 'isPending' here would make the page flicker when the mutation is finished,
    // before the navigation is initiated.
    setCreateRecipe(true)
    mutate({ title: 'Neues Rezept' })
  }

  return (
    <div className="flex flex-col">
      <div className="text-primary text-6xl font-bold">Is sich lecker!!</div>

      <Button
        onClick={handleCreateRecipe}
        isPending={createRecipe}
        preIcon={<PlusIcon className="h-4 w-4" />}
      >
        {createRecipe ? 'Erstelle neues Rezept...' : 'Neues Rezept'}
      </Button>

      <DashboardRecipes recipes={recipes} className="my-4" />
    </div>
  )
}
