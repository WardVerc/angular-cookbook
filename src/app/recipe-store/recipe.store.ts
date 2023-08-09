import { Recipe } from '../recipes/recipe.model';
import {
  createEntityAdapterStoreAssets,
  createStoreAssets,
  EntityStoreAssets,
} from '@studiohyperdrive/ngx-store';

type RecipeStore = {
  recipes: EntityStoreAssets<Recipe>;
};

export const { actions, reducers, selectors } = createStoreAssets<RecipeStore>(
  'recipes',
  [
    {
      subSlice: 'recipes',
      generator: createEntityAdapterStoreAssets<Recipe>,
      selectId: (recipe) => recipe.name,
    },
  ]
);
