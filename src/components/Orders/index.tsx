import { useEffect, useState } from 'react';

import { Order } from '../../types';
import OrdersBoard from '../OrdersBoard';

import { api } from '../../utils';
import { Container } from './styles';

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    api.get('/orders').then(({ data }) => setOrders(data));
  }, []);

  const ordersByStatus: Record<string, Order[]> = {
    waiting: orders.filter((order) => order.status === 'WAITING'),
    inProduction: orders.filter((order) => order.status === 'IN_PRODUCTION'),
    done: orders.filter((order) => order.status === 'DONE'),
  };

  function updateOrdersAfterCancellation(orderId: string) {
    setOrders((prevState) =>
      prevState.filter((order) => order._id !== orderId)
    );
  }

  return (
    <Container>
      <OrdersBoard
        icon="🕑"
        title="Fila de espera"
        orders={ordersByStatus.waiting}
        onCancelOrder={updateOrdersAfterCancellation}
      />
      <OrdersBoard
        icon="🧑‍🍳"
        title="Em preparação"
        orders={ordersByStatus.inProduction}
        onCancelOrder={updateOrdersAfterCancellation}
      />
      <OrdersBoard
        icon="✅"
        title="Pronto!"
        orders={ordersByStatus.done}
        onCancelOrder={updateOrdersAfterCancellation}
      />
    </Container>
  );
}
