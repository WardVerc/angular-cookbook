import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Observable } from 'rxjs-compat';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;
  subscriptionIngredients: Subscription;
  keyControl: FormControl<Ingredient[][]> = new FormControl();
  total: number;
  public readonly amountOfIngredients$: Observable<number> =
    this.keyControl.valueChanges.pipe(
      map((selected) => {
        let sum = 0;

        selected.forEach((list) => (sum += list.length));

        return sum;
      }),
      startWith(0)
    );

  constructor(
    private recipeService: RecipeService,
    private readonly router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
