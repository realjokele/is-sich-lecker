import { useRecipeStore } from './use-recipe-store'

// Recipe metadata selectors
export const useRecipeTitle = () => useRecipeStore((state) => state.recipe?.title ?? '')
export const useRecipeDescription = () => useRecipeStore((state) => state.recipe?.description ?? '')
export const useRecipeServings = () => useRecipeStore((state) => state.recipe?.servings ?? null)
export const useRecipeLevel = () => useRecipeStore((state) => state.recipe?.level ?? null)
export const useRecipePreparationTime = () =>
  useRecipeStore((state) => state.recipe?.preparationTime ?? null)
export const useRecipeCookingTime = () =>
  useRecipeStore((state) => state.recipe?.cookingTime ?? null)

// Ingredient sections selectors
export const useIngredientSections = () =>
  useRecipeStore((state) => state.recipe?.ingredientSections ?? [])
export const useIngredientSection = (sectionId: string) =>
  useRecipeStore((state) =>
    state.recipe?.ingredientSections.find((section) => section.id === sectionId),
  )

// Ingredients selectors
export const useIngredientsInSection = (sectionId: string) =>
  useRecipeStore(
    (state) =>
      state.recipe?.ingredientSections.find((section) => section.id === sectionId)?.ingredients ??
      [],
  )

export const useIngredient = (ingredientId: string) => {
  return useRecipeStore((state) => {
    if (!state.recipe) return null
    for (const section of state.recipe.ingredientSections) {
      const ingredient = section.ingredients.find((ing) => ing.id === ingredientId)
      if (ingredient) return ingredient
    }
    return null
  })
}

// Steps selectors
export const useRecipeSteps = () => useRecipeStore((state) => state.recipe?.steps ?? [])
export const useRecipeStep = (stepId: string) =>
  useRecipeStore((state) => state.recipe?.steps.find((step) => step.id === stepId))

// UI state selectors
export const useHasChanges = () => useRecipeStore((state) => state.hasChanges)
export const useIsSaving = () => useRecipeStore((state) => state.isSaving)

// Computed selectors
export const useTotalIngredients = () => {
  return useRecipeStore((state) => {
    if (!state.recipe) return 0
    return state.recipe.ingredientSections.reduce(
      (total, section) => total + section.ingredients.length,
      0,
    )
  })
}

export const useTotalSteps = () => {
  return useRecipeStore((state) => state.recipe?.steps.length ?? 0)
}

export const useTotalTime = () => {
  return useRecipeStore((state) => {
    if (!state.recipe) return 0
    return (state.recipe.preparationTime ?? 0) + (state.recipe.cookingTime ?? 0)
  })
}

// Action selectors (for performance, only select the actions you need)
export const useRecipeActions = () => {
  const setTitle = useRecipeStore((state) => state.setTitle)
  const setDescription = useRecipeStore((state) => state.setDescription)
  const setServings = useRecipeStore((state) => state.setServings)
  const setLevel = useRecipeStore((state) => state.setLevel)
  const setPreparationTime = useRecipeStore((state) => state.setPreparationTime)
  const setCookingTime = useRecipeStore((state) => state.setCookingTime)

  return {
    setTitle,
    setDescription,
    setServings,
    setLevel,
    setPreparationTime,
    setCookingTime,
  }
}

export const useIngredientSectionActions = () => {
  const addIngredientSection = useRecipeStore((state) => state.addIngredientSection)
  const updateIngredientSection = useRecipeStore((state) => state.updateIngredientSection)
  const removeIngredientSection = useRecipeStore((state) => state.removeIngredientSection)
  const reorderIngredientSections = useRecipeStore((state) => state.reorderIngredientSections)

  return {
    addIngredientSection,
    updateIngredientSection,
    removeIngredientSection,
    reorderIngredientSections,
  }
}

export const useIngredientActions = () => {
  const addIngredient = useRecipeStore((state) => state.addIngredient)
  const updateIngredient = useRecipeStore((state) => state.updateIngredient)
  const removeIngredient = useRecipeStore((state) => state.removeIngredient)
  const moveIngredient = useRecipeStore((state) => state.moveIngredient)
  const reorderIngredients = useRecipeStore((state) => state.reorderIngredients)

  return {
    addIngredient,
    updateIngredient,
    removeIngredient,
    moveIngredient,
    reorderIngredients,
  }
}

export const useStepActions = () => {
  const addStep = useRecipeStore((state) => state.addStep)
  const updateStep = useRecipeStore((state) => state.updateStep)
  const removeStep = useRecipeStore((state) => state.removeStep)
  const reorderSteps = useRecipeStore((state) => state.reorderSteps)

  return {
    addStep,
    updateStep,
    removeStep,
    reorderSteps,
  }
}
