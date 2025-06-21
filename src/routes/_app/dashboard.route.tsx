import { queryOptions, useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { DashboardRecipes } from '~/components/DashboardRecipes'
import { Button } from '~/components/ui/button'
import { $createRecipe } from '~/server/$create-recipe'
import { $getUserRecipes } from '~/server/$get-user-recipes'

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
      navigate({ to: '/create-recipe', params: { id: data.id } })
    },
  })
}

function Dashboard() {
  const { data: recipes } = useSuspenseQuery(userRecipesQueryOptions)
  const { mutate } = useCreateRecipe()

  function handleCreateRecipe() {
    mutate({ title: 'Neues Rezept' })
  }

  return (
    <div className="flex flex-col">
      <div className="text-primary text-6xl font-bold">Is sich lecker!!</div>

      <Button onClick={handleCreateRecipe}>Neues Rezept</Button>
      {/* <CreateRecipeDialog isOpen={isNewRecipeDialogOpen} onOpenChange={setIsNewRecipeDialogOpen} /> */}

      <DashboardRecipes recipes={recipes} className="my-4" />
    </div>
  )
}
