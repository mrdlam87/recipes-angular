import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    ingredients.forEach((ing) => {
      const index = this.ingredients.findIndex(
        (ingredient) => ingredient.name == ing.name
      );

      // If already in list then append amount
      index >= 0
        ? (this.ingredients[index].amount += ing.amount)
        : this.ingredients.push(ing);
    });
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
