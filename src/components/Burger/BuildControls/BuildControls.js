import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
  {
    id: uuidv4(),
    label: (
      <span>
        Lettuce <i className="fas fa-leaf" style={{ color: '#228c1d' }}></i>
      </span>
    ),
    type: 'lettuce',
  },
  {
    id: uuidv4(),
    label: (
      <span>
        Bacon <i className="fas fa-bacon" style={{ color: '#bf3813' }}></i>
      </span>
    ),
    type: 'bacon',
  },
  {
    id: uuidv4(),
    label: (
      <span>
        Cheese <i className="fas fa-cheese" style={{ color: '#f4d004' }}></i>
      </span>
    ),
    type: 'cheese',
  },
  {
    id: uuidv4(),
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

  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>${price.toFixed(2)}</strong>
      </p>
      {controls.map((control) => (
        <BuildControl
          key={control.id}
          label={control.label}
          add={() => addIngredient(control.type)}
          remove={() => removeIngredient(control.type)}
          disabled={disabled[control.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!purchasable}
        onClick={ordered}
      >
        order now
      </button>
    </div>
  );
};

export default BuildControls;
