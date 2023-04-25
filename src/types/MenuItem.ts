interface Meal {
  ingredients: string []
  macros: Record<macro, number>
  meal_id: string
  name: string
  vegetarian: boolean
  cost: number
  calories: number
}
type macro = 'carb' | 'fat' | 'protein';
export default Meal;
