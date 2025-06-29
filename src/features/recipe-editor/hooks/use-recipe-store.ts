import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Recipe, IngredientSection, RecipeIngredient, RecipeStep } from '@prisma/client'

type IngredientSection2 = Pick<IngredientSection, 'name' | 'id' | 'type'>

// Extended types to include relations
type RecipeWithRelations = Recipe & {
  ingredientSections: (IngredientSection2 & {
    ingredients: RecipeIngredient[]
  })[]
  steps: RecipeStep[]
}

type RecipeStore = {
  // The complete recipe being edited
  recipe: RecipeWithRelations | null

  // Original recipe for change detection
  originalRecipe: RecipeWithRelations | null

  // UI state
  hasChanges: boolean
  isSaving: boolean

  // Actions
  initializeRecipe: (recipe: RecipeWithRelations) => void
  reset: () => void

  // Recipe metadata
  setTitle: (title: string) => void
  // setDescription: (description: string | null) => void
  // setServings: (servings: number | null) => void
  // setLevel: (level: number | null) => void
  // setPreparationTime: (time: number | null) => void
  // setCookingTime: (time: number | null) => void

  // // Ingredient sections
  addIngredientSection: (section: IngredientSection2) => void
  // updateIngredientSection: (sectionId: string, updates: Partial<IngredientSection>) => void
  removeIngredientSection: (sectionId: string) => void
  // reorderIngredientSections: (sectionIds: string[]) => void

  // // Ingredients within sections
  // addIngredient: (
  //   sectionId: string,
  //   ingredient: Omit<
  //     RecipeIngredient,
  //     'id' | 'createdAt' | 'updatedAt' | 'recipeId' | 'ingredientSectionId'
  //   >,
  // ) => void
  // updateIngredient: (ingredientId: string, updates: Partial<RecipeIngredient>) => void
  // removeIngredient: (ingredientId: string) => void
  // moveIngredient: (ingredientId: string, fromSectionId: string, toSectionId: string) => void
  // reorderIngredients: (sectionId: string, ingredientIds: string[]) => void

  // // Recipe steps
  // addStep: (step: Omit<RecipeStep, 'id' | 'createdAt' | 'updatedAt' | 'recipeId'>) => void
  // updateStep: (stepId: string, updates: Partial<RecipeStep>) => void
  // removeStep: (stepId: string) => void
  // reorderSteps: (stepIds: string[]) => void

  // // Utility
  // getChangedFields: () => Partial<RecipeWithRelations>
}

export const useRecipeStore = create<RecipeStore>()(
  devtools((set, get) => ({
    recipe: null,
    originalRecipe: null,
    hasChanges: false,
    isSaving: false,
    initializeRecipe: (recipe) =>
      set(() => ({
        recipe,
        originalRecipe: recipe,
        hasChanges: false,
        isSaving: false,
      })),
    setTitle: (title) =>
      set((state) => ({
        recipe: state.recipe ? { ...state.recipe, title } : null,
        hasChanges: true,
      })),
    reset: () =>
      set({
        recipe: null,
        originalRecipe: null,
        hasChanges: false,
        isSaving: false,
      }),
    addIngredientSection: (section) => {
      return set((state) => {
        if (!state.recipe) return state

        const newSection = {
          ...section,
          ingredients: [],
        }

        return {
          recipe: {
            ...state.recipe,
            ingredientSections: [...state.recipe.ingredientSections, newSection],
          },
        }
      })
    },
    removeIngredientSection(sectionId) {
      return set((state) => {
        if (!state.recipe) return state

        return {
          recipe: {
            ...state.recipe,
            ingredientSections: state.recipe.ingredientSections.filter(
              (section) => section.id !== sectionId,
            ),
          },
        }
      })
    },
  })),
)
