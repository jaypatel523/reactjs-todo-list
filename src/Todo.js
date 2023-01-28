import React from 'react'
import { useReducer } from 'react';
import { useState } from 'react'
import { Model } from './Model';

const data = []


const reducer = (state, action) => {

    if (action.type === 'ADD_ITEM') {
        const newItem = [...state.items, action.payload];
        return { ...state, items: newItem, isModelOpen: true, modelContent: 'item added' }
    }
    if (action.type === 'CLOSE_MODEL') {
        return { ...state, isModelOpen: false }
    }
    if (action.type === 'REMOVE_ITEM') {
        const newItem = state.items.filter((item) => item.id !== action.payload);
        return { ...state, items: newItem }
    }

    // throw new Error("No matching action type ");
    // return state;
}

const initialState = {
    items: [],
    isModelOpen: false,
    modelContent: 'hello word'

}
const Todo = () => {

    const [name, setName] = useState('');
    // const [items, setItems] = useState(data);
    // const [isModelOpen, setIsModelOpen] = useState(false);

    const [state, dispatch] = useReducer(reducer, initialState);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim().length > 0) {
            // with reducer 
            const newItem = { id: new Date().getTime().toString(), name };
            dispatch({ type: 'ADD_ITEM', payload: newItem })
            setName('');




            // without reducer
            // setItems([...items, { id: new Date().getTime().toString(), name }])
            // setName('');
            // setIsModelOpen(true);
        }
    }

    const removeItem = (id) => {

        dispatch({ type: 'REMOVE_ITEM', payload: id });

        // const newItems = items.filter((item) => item.id !== id)
        // setItems(newItems);
        // setIsModelOpen(true);
    }



    const closeModel = () => {
        dispatch({ type: 'CLOSE_MODEL' })
    }




    return (
        <>
            {state.isModelOpen && <Model closeModel={closeModel} />}
            <form onSubmit={handleSubmit} className="form">
                <div>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <button type='submit'> Add </button>
            </form>
            {state.items.map((item, index) => {
                return (
                    <div key={index} className="item">
                        <div>
                            {item.name}
                        </div>
                        <button onClick={() => removeItem(item.id)}> remove </button>
                    </div>
                )
            })}

        </>
    )
}

export default Todo;