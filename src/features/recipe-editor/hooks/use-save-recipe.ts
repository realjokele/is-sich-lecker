import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { $saveRecipe } from '~/server/recipe/$save-recipe'
import { toast } from '~/components/ui/toast'

type SaveRecipeData = {
  recipeId: string
  title: string
}

export function useSaveRecipe() {
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
