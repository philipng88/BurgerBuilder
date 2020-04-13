import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
  {
    label: (
      <span>
        Lettuce <i className="fas fa-leaf" style={{ color: '#228c1d' }}></i>
      </span>
    ),
    type: 'lettuce',
  },
  {
    label: (
      <span>
        Bacon <i className="fas fa-bacon" style={{ color: '#bf3813' }}></i>
      </span>
    ),
    type: 'bacon',
  },
  {
    label: (
      <span>
        Cheese <i className="fas fa-cheese" style={{ color: '#f4d004' }}></i>
      </span>
    ),
    type: 'cheese',
  },
  {
    label: (
      <span>
        Meat{' '}
        <i className="fas fa-cloud-meatball" style={{ color: '#7f3608' }}></i>
      </span>
    ),
    type: 'meat',
  },
];

const BuildControls = (props) => {
  const {
    price,
    addIngredient,
    removeIngredient,
    disabled,
    purchasable,
    ordered,
  } = props;

  const { BuildControls, OrderButton } = classes;

  return (
    <div className={BuildControls}>
      <p>
        Current Price: <strong>${price.toFixed(2)}</strong>
      </p>
      {controls.map((control) => {
        const { type, label } = control;
        return (
          <BuildControl
            key={type}
            label={label}
            add={() => addIngredient(type)}
            remove={() => removeIngredient(type)}
            disabled={disabled[type]}
          />
        );
      })}
      <button className={OrderButton} disabled={!purchasable} onClick={ordered}>
        order now
      </button>
    </div>
  );
};

export default BuildControls;
