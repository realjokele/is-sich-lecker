import { AddIngredient } from '~/components/AddIngredient'
import { AddIngredientSection } from '~/components/AddIngredientSection'

export function IngredientSection() {
  return (
    <div className="w-[600px]">
      <h2 className="text-overlay-fg mb-3 text-xl font-semibold">Zutaten</h2>
      <div className="mb-6 text-xs">
        Welche Zutaten werden für dein Rezept benötigt? Trage Menge, Einheit und die verwendete
        Zutat pro Feld ein.
      </div>
      <div className="space-y-8">
        {/* <EditIngredientSections ingredientSections={recipe.ingredientSections} /> */}
        <AddIngredient defaultSectionId={'defaultSectionId'} />
        <AddIngredientSection />
      </div>
    </div>
  )
}
