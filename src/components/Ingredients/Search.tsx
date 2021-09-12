import React, { useState, useEffect, useRef } from 'react';
import useHttp from '../../hooks/http'
import IngredientsModels from '../models/Ingredients.Models';
import SearchType from '../types/serachType';
import ErrorModal from '../UI/ErrorModal';
import Card from '../UI/Card';
import './Search.css';

const Search: React.FC<SearchType> = React.memo(props => {
    const { onLoadLingredients } = props;
    const [enteredFilter, setEnteredFilter] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const { isLoading, data, error, sendRequest, clear } = useHttp();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (enteredFilter === inputRef.current?.value) {
                const query = enteredFilter.length === 0 ?
                    '' :
                    `?orderBy="title"&equalTo="${enteredFilter}"`;
                sendRequest('https://react-hooks-ts-6d5d3-default-rtdb.firebaseio.com/ingredients.json' + query, 'GET', null, null, null)
            }

        }, 1000)
        return () => {
            clearTimeout(timer);
        }

    }, [enteredFilter, inputRef, sendRequest])

    useEffect(() => {

        if (!isLoading && !error && data) {

            const loadedIngredients: IngredientsModels[] = [];
            for (const key in data) {
                loadedIngredients.push({
                    id: key,
                    title: data[key].title,
                    amount: data[key].amount
                });
            }
            //...
            onLoadLingredients(loadedIngredients)
        }
    }, [data, isLoading, error, onLoadLingredients]);



    return (
        <section className="search">
            {error && <ErrorModal onClose={clear}>{error} </ErrorModal>}
            <Card>

                <div className="search-input">
                    <label>Filter by Title</label>
                    {isLoading && <span>Loading...</span>}
                    <input
                        ref={inputRef}
                        type="text"
                        value={enteredFilter}
                        onChange={event => setEnteredFilter(event.target.value)} />
                </div>
            </Card>
        </section>
    );
});

export default Search;
