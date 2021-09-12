import React, { useState } from 'react';
import IngredientsModels from '../models/Ingredients.Models';
import newIngredientsType from '../types/newIngredientsType';
import Card from '../UI/Card';
import LoadingIndicator from '../UI/LoadingIndicator';
import './IngredientForm.css';

const IngredientForm: React.FC<newIngredientsType> = React.memo(props => {
    const [enteredTitle, setenteredTitle] = useState('');
    const [enteredAmout, setEnteredAmount] = useState('');
    console.log('RENDRING INFREDIENTS');
    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const ingredientForm: IngredientsModels = {
            title: enteredTitle,
            amount: enteredAmout
        };
        props.onAddIngredient(ingredientForm)
        setenteredTitle('');
        setEnteredAmount('');
        // ...
    };

    return (
        <section className="ingredient-form">
            <Card>
                <form onSubmit={submitHandler}>
                    <div className="form-control">
                        <label htmlFor="title">Name</label>
                        <input type="text"
                            id="title"
                            value={enteredTitle}
                            onChange={event => setenteredTitle(event.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="amount">Amount</label>
                        <input type="number"
                            id="amount"
                            value={enteredAmout}
                            onChange={event => setEnteredAmount(event.target.value)}
                        />
                    </div>
                    <div className="ingredient-form__actions">
                        <button type="submit">Add Ingredient</button>
                        {props.loading && <LoadingIndicator />}
                    </div>
                </form>
            </Card>

        </section>
    );
});

export default IngredientForm;