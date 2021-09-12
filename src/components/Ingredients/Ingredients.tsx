import React, { useReducer, useCallback, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import IngredientsModels from '../models/Ingredients.Models';
import ErrorModal from '../UI/ErrorModal';
import useHttp from '../../hooks/http';
import { useEffect } from 'react';
import { send } from 'process';
const ingredientReducer = (currentIngredient: IngredientsModels[], action: any) => {
  switch (action.type) {

    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredient, action.ingredient];
    case 'DELETE':
      return currentIngredient.filter(ing => ing.id !== action.id);
    default:
      throw new Error('Shoud not get there !');
  }
}


const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, [])
  const { isLoading, error, data, sendRequest, reqExtra, reqIdentifier, clear } = useHttp();

  useEffect(() => {
    if (!isLoading && !error && reqIdentifier === 'REMOVE_INGREDIENT') {
      dispatch({ type: 'DELETE', id: reqExtra })
    } else if (!isLoading && !error && reqIdentifier === 'ADD_INGREDIENT') {
      dispatch({
        type: 'ADD',
        ingredient: {
          id: data.name, ...reqExtra
        }

      })
    }

  }, [data, reqExtra, reqIdentifier, error, isLoading])


  const filterdIngredientsHandler = useCallback((filteredIngredients: IngredientsModels[]) => {
    dispatch({ type: 'SET', ingredients: filteredIngredients })
  }, [])

  const addIngredientsHandler = useCallback((ingredient: IngredientsModels) => {

    sendRequest('https://react-hooks-ts-6d5d3-default-rtdb.firebaseio.com/ingredients.json',
      'POST',
      JSON.stringify(ingredient),
      ingredient,
      'ADD_INGREDIENT'
    )
  }, [sendRequest]);

  const removeItemHandler = useCallback((ingredientId: string) => {

    sendRequest(`https://react-hooks-ts-6d5d3-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
      'DELETE',
      null,
      ingredientId,
      'REMOVE_INGREDIENT'
    );

  }, []);

  
  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={removeItemHandler}

      />
    )
  }, [userIngredients, removeItemHandler]);

  return (
    <div className="App">
      {error !== null && <ErrorModal
        onClose={clear}
      >{error}</ErrorModal>};

      <IngredientForm
        onAddIngredient={addIngredientsHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadLingredients={filterdIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;

