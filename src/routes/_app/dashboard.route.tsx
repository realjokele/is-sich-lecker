import { queryOptions, useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { LoaderIcon, PlusIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import { DashboardRecipes } from '~/components/DashboardRecipes'
import { Button } from '~/components/ui/button'
import { $createRecipe } from '~/server/recipe/$create-recipe'
import { $getUserRecipes } from '~/server/recipe/$get-user-recipes'

export const Route = createFileRoute('/_app/dashboard')({
  component: Dashboard,
  loader: ({ context }) => {
    const queryClient = context.queryClient
    return queryClient.ensureQueryData(userRecipesQueryOptions)
  },
})

const userRecipesQueryOptions = queryOptions({
  queryKey: ['recipes'],
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
      navigate({ to: '/create-recipe/$recipeId', params: { recipeId: data.id } })
    },
  })
}

function Dashboard() {
  const { data: recipes } = useSuspenseQuery(userRecipesQueryOptions)
  const { mutate, isPending } = useCreateRecipe()
  const [createRecipe, setCreateRecipe] = React.useState(false)

  function handleCreateRecipe() {
    setCreateRecipe(true)
    mutate({ title: 'Neues Rezept' })
  }

  return (
    <div className="flex flex-col">
      <div className="text-primary text-6xl font-bold">Is sich lecker!!</div>

      <Button onClick={handleCreateRecipe} pending={createRecipe} preIcon={<PlusIcon className="h-4 w-4" />}>
        {createRecipe ? 'Erstelle neues Rezept...' : 'Neues Rezept'}
      </Button>

      <DashboardRecipes recipes={recipes} className="my-4" />
    </div>
  )
}
