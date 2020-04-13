import React from 'react';
import classes from './Order.module.css';

const Order = (props) => {
  const ingredients = [];
  for (const ingredient in props.ingredients) {
    ingredients.push({
      name: ingredient,
      amount: props.ingredients[ingredient],
    });
  }

  const { Order, Ingredients } = classes;
  return (
    <div className={Order}>
      <p>
        <strong>Ingredients:</strong>{' '}
        {ingredients.map((ingredient) => (
          <span key={ingredient.name} className={Ingredients}>
            {ingredient.name} ({ingredient.amount})
          </span>
        ))}
      </p>
      <p>
        <strong>Price: </strong>
        <span style={{ color: 'green', fontWeight: 'bolder' }}>
          ${props.price.toFixed(2)}
        </span>
      </p>
    </div>
  );
};
export default Order;
