import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { Store } from '@ngrx/store';
import { addRecipe, clear, removeRecipe } from '../store/recipez.actions';

@Component({
  selector: 'app-my-recipez',
  templateUrl: './my-recipez.component.html',
})
export class MyRecipezComponent {
  recipez$: Observable<Recipe[]>;

  constructor(private store: Store<{ recipez: Recipe[] }>) {
    // connect this.recipez$ to store
    this.recipez$ = store.select('recipez');
  }

  addRecipe() {
    this.store.dispatch(addRecipe());
  }

  removeRecipe() {
    this.store.dispatch(removeRecipe());
  }

  clearRecipes() {
    this.store.dispatch(clear());
  }
}
