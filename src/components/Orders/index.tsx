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

  return (
    <Container>
      <OrdersBoard
        icon="🕑"
        title="Fila de espera"
        orders={ordersByStatus.waiting}
      />
      <OrdersBoard
        icon="🧑‍🍳"
        title="Em preparação"
        orders={ordersByStatus.inProduction}
      />
      <OrdersBoard icon="✅" title="Pronto!" orders={ordersByStatus.done} />
    </Container>
  );
}
