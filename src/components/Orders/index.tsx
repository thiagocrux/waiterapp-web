import { useEffect, useState } from 'react';
import socketIo from 'socket.io-client';

import { Order } from '../../types';
import { api } from '../../utils';
import OrdersBoard from '../OrdersBoard';

import { Container } from './styles';

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const socket = socketIo('http://localhost:3001', {
      transports: ['websocket'],
    });

    socket.on('orders@new', (order) =>
      setOrders((prevState) => prevState.concat(order))
    );
  }, []);

  useEffect(() => {
    api.get('/orders').then(({ data }) => setOrders(data));
  }, []);

  const ordersByStatus: Record<string, Order[]> = {
    waiting: orders.filter((order) => order.status === 'WAITING'),
    inProduction: orders.filter((order) => order.status === 'IN_PRODUCTION'),
    done: orders.filter((order) => order.status === 'DONE'),
  };

  function updateOrdersAfterOrderCancellation(orderId: string) {
    setOrders((prevState) =>
      prevState.filter((order) => order._id !== orderId)
    );
  }

  function updateOrdersAfterStatusChange(
    orderId: string,
    status: Order['status']
  ) {
    setOrders((prevState) =>
      prevState.map((order) =>
        order._id === orderId ? { ...order, status } : order
      )
    );
  }

  return (
    <Container>
      <OrdersBoard
        icon="🕑"
        title="Fila de espera"
        orders={ordersByStatus.waiting}
        onCancelOrder={updateOrdersAfterOrderCancellation}
        onStatusUpdate={updateOrdersAfterStatusChange}
      />
      <OrdersBoard
        icon="🧑‍🍳"
        title="Em preparação"
        orders={ordersByStatus.inProduction}
        onCancelOrder={updateOrdersAfterOrderCancellation}
        onStatusUpdate={updateOrdersAfterStatusChange}
      />
      <OrdersBoard
        icon="✅"
        title="Pronto!"
        orders={ordersByStatus.done}
        onCancelOrder={updateOrdersAfterOrderCancellation}
        onStatusUpdate={updateOrdersAfterStatusChange}
      />
    </Container>
  );
}
