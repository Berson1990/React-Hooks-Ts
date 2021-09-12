import IngredientsModels from "../models/Ingredients.Models"

type newIngredientsType = {
    onAddIngredient: (ingredient: IngredientsModels) => void
    loading: boolean
}
export default newIngredientsType