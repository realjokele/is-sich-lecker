import { AddIngredient } from '~/components/AddIngredient'
import { AddIngredientSection } from '~/components/AddIngredientSection'
import {
  useIngredientSections,
  useIngredientSectionActions,
  useIngredientActions,
} from '../hooks/use-recipe-selectors'

export function IngredientSection() {
  const ingredientSections = useIngredientSections()
  const { addIngredientSection, removeIngredientSection } = useIngredientSectionActions()
  const { addIngredient, removeIngredient } = useIngredientActions()

  const handleAddSection = (sectionName?: string) => {
    addIngredientSection({
      name: sectionName || 'Neuer Abschnitt',
      description: null,
      order: ingredientSections.length,
      type: 'CUSTOM',
    })
  }

  const handleAddIngredient = (sectionId: string) => {
    addIngredient(sectionId, {
      ingredientId: 'temp-id', // You'll need to handle ingredient creation
      order: 0,
    })
  }

  return (
    <div className="w-[600px]">
      <h2 className="text-overlay-fg mb-3 text-xl font-semibold">Zutaten</h2>
      <div className="mb-6 text-xs">
        Welche Zutaten werden für dein Rezept benötigt? Trage Menge, Einheit und die verwendete
        Zutat pro Feld ein.
      </div>

      <div className="space-y-8">
        {ingredientSections.length === 0 ? (
          <div className="text-muted-fg py-8 text-center">
            <p>Noch keine Zutaten hinzugefügt</p>
            <button
              onClick={() => handleAddSection()}
              className="text-primary mt-2 hover:underline"
            >
              Ersten Abschnitt hinzufügen
            </button>
          </div>
        ) : (
          ingredientSections.map((section) => (
            <IngredientSectionItem
              key={section.id}
              section={section}
              onAddIngredient={() => handleAddIngredient(section.id)}
              onRemoveSection={() => removeIngredientSection(section.id)}
            />
          ))
        )}

        <AddIngredientSection onAddSection={handleAddSection} />
      </div>
    </div>
  )
}

function IngredientSectionItem({
  section,
  onAddIngredient,
  onRemoveSection,
}: {
  section: any
  onAddIngredient: () => void
  onRemoveSection: () => void
}) {
  return (
    <div className="rounded-lg border p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-medium">{section.name}</h3>
        <button onClick={onRemoveSection} className="text-sm text-red-500 hover:text-red-700">
          Abschnitt löschen
        </button>
      </div>

      {section.ingredients.length === 0 ? (
        <div className="text-muted-fg py-4 text-center">
          <p>Keine Zutaten in diesem Abschnitt</p>
          <button onClick={onAddIngredient} className="text-primary mt-2 hover:underline">
            Zutat hinzufügen
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {section.ingredients.map((ingredient: any) => (
            <IngredientItem key={ingredient.id} ingredient={ingredient} />
          ))}
          <button onClick={onAddIngredient} className="text-primary text-sm hover:underline">
            + Zutat hinzufügen
          </button>
        </div>
      )}
    </div>
  )
}

function IngredientItem({ ingredient }: { ingredient: any }) {
  const { removeIngredient } = useIngredientActions()

  return (
    <div className="flex items-center gap-2 rounded bg-gray-50 p-2">
      <span className="flex-1">Zutat {ingredient.id}</span>
      <button
        onClick={() => removeIngredient(ingredient.id)}
        className="text-red-500 hover:text-red-700"
      >
        ×
      </button>
    </div>
  )
}
