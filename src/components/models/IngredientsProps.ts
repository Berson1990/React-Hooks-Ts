import IngredientsModels from "./Ingredients.Models";

export default interface IngredientsProps {
    ingredients: IngredientsModels[];
    onRemoveItem: (id: string) => void;
}
