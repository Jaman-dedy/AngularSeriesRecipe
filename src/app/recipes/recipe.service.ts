import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shoppint-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  // recipeSelected = new EventEmitter<Recipe>();
  recipesChanges = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      'Big fat Burger',
      'A super tasy burger',
      'https://upload.wikimedia.org/wikipedia/commons/2/2c/GNOME_Recipes_logo.png',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Frech snacks', 10),
        new Ingredient('Beans', 1),
        new Ingredient('Frech snacks', 10)
      ]
    ),
    new Recipe(
      'Bread',
      'What else you need to say? just taste it',
      'https://live.staticflickr.com/39/78941282_7b758abb54_z.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Frech Meat', 10),
        new Ingredient('Buns', 3),
        new Ingredient('Congolese Meat', 5)
      ]
    )
  ];
  constructor(private slService: ShoppingListService) {}
  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(index: number) {
    return this.recipes[index];
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanges.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanges.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanges.next(this.recipes.slice());
  }
}
