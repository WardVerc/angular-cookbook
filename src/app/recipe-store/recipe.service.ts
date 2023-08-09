import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreService, dispatchDataToStore } from '@studiohyperdrive/ngx-store';
import { Observable } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { actions, selectors } from './recipe.store';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable()
export class RecipeStoreService extends StoreService {
  public readonly recipes$: Observable<Recipe[]> = this.selectFromStore(
    selectors.recipes
  );
  public readonly loading$: Observable<boolean> = this.selectLoadingFromStore(
    selectors.recipes
  );

  constructor(
    public readonly store: Store,
    private readonly dataStorageService: DataStorageService
  ) {
    super(store);
  }

  fetchRecipes(): Observable<Recipe[]> {
    return dispatchDataToStore(
      actions.recipes,
      this.dataStorageService.fetchRecipes(),
      this.store
    );
  }
}
