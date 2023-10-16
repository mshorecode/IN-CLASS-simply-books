import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createOrder, updateOrder } from '../../api/orderData';

const initialState = {
  customer_name: '',
  orderType: '',
  email: '',
};

export default function OrderForm({ orderObj }) {
  const { user } = useAuth();
  const [formInput, setFormInput] = useState({ ...initialState, uid: user.uid });
  const router = useRouter();

  useEffect(() => {
    if (orderObj.firebaseKey) setFormInput(orderObj);
  }, [orderObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderObj.firebaseKey) {
      updateOrder(formInput).then(() => router.push(`/order/${orderObj.firebaseKey}`));
    } else {
      const payload = { ...formInput, dateCreated: new Date() };
      createOrder(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateOrder(patchPayload).then(() => router.push('/orders'));
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{orderObj.firebaseKey ? 'Update' : 'Create'} Order</h2>

        {/* CUSTOMER NAME */}
        <Form.Group className="mb-3">
          <Form.Label>Customer Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Customer Name"
            name="customer_name"
            value={formInput.customer_name}
            onChange={handleChange}
          />
        </Form.Group>

        {/* CUSTOMER EMAIL */}
        <Form.Group className="mb-3">
          <Form.Label>Customer Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Customer Email"
            name="email"
            value={formInput.email}
            onChange={handleChange}
          />
        </Form.Group>

        {/* ORDER TYPE */}
        <Form.Group className="mb-3">
          <Form.Label>Customer Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="In Person or Online?"
            name="orderType"
            value={formInput.orderType}
            onChange={handleChange}
          />
        </Form.Group>

        {/* SUBMIT BUTTON */}
        <Button type="submit">{orderObj.firebaseKey ? 'Update' : 'Create'} Order</Button>

      </Form>
    </>
  );
}

OrderForm.propTypes = {
  orderObj: PropTypes.shape({
    customer_name: PropTypes.string,
    orderType: PropTypes.string,
    email: PropTypes.string,
    dateCreated: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

OrderForm.defaultProps = {
  orderObj: initialState,
};
