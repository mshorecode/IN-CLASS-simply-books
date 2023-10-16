import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleOrder } from '../../../api/orderData';
import OrderForm from '../../../components/forms/OrderForm';

export default function EditOrder() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleOrder(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<OrderForm orderObj={editItem} />);
}
