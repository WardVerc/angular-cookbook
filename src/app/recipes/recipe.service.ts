import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    // new Recipe(
    //   'A Test Recipe',
    //   'This is a test',
    //   'https://www.grutto.com/storage/recipes/nl/bolognese-minced-meat-1.jpg',
    //   [new Ingredient('a little testy', 2), new Ingredient('a big Test', 1)]
    // ),
    // new Recipe(
    //   'A Test Recipe number 2',
    //   'This is a test description 2',
    //   'https://static.ah.nl/static/recepten/img_RAM_PRD139074_1024x748_JPG.jpg',
    //   [
    //     new Ingredient('a little more testy', 2),
    //     new Ingredient('a big little Test', 1),
    //   ]
    // ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
