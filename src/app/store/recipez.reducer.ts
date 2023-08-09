import { createReducer, on } from '@ngrx/store';
import { addRecipe, clear, removeRecipe } from './recipez.actions';
import { Recipe } from '../recipes/recipe.model';

export const initialState = [];

export const recipezReducer = createReducer(
  initialState,
  on(addRecipe, (state: Recipe[]) => [
    ...state,
    {
      name: 'Recipe reducer',
      description: 'Made by reducer',
      imagePath:
        'https://hostessatheart.com/wp-content/uploads/2022/09/Oven-Brisket-Recipe-15-SQ.jpg',
      ingredients: [
        { name: 'Red', amount: 1 },
        { name: 'Ucer', amount: 2 },
      ],
    },
  ]),
  on(removeRecipe, (state: Recipe[]) => {
    let newState = [...state];
    newState.pop();
    return newState;
  }),
  on(clear, () => [])
);
