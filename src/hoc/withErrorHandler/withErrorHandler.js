import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => (props) => {
  const [error, clearError] = useHttpErrorHandler(axios);
  return (
    <>
      <Modal show={error} modalClosed={clearError}>
        {error && (
          <span style={{ color: 'red', fontWeight: 'bold' }}>
            {error.message}
          </span>
        )}
      </Modal>
      <WrappedComponent {...props} />
    </>
  );
};

export default withErrorHandler;
