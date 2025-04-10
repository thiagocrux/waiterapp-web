import { useState } from 'react';

import type { Order } from '../../types';
import OrderModal from '../OrderModal';

import { Board, OrdersContainer } from './styles';

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: Order[];
}

export default function OrdersBoard({ icon, title, orders }: OrdersBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  function handleModalOpening(order: Order) {
    setIsModalVisible(true);
    setSelectedOrder(order);
  }

  function handleModalClosing() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }

  return (
    <Board>
      <OrderModal
        isVisible={isModalVisible}
        order={selectedOrder}
        onClose={handleModalClosing}
      />
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>
      {orders.length > 0 && (
        <OrdersContainer>
          {orders.map((order, index) => (
            <button
              type="button"
              key={index}
              onClick={() => handleModalOpening(order)}
            >
              <strong>Mesa {order.table}</strong>
              <span>
                {`${order.products.length} ${
                  order.products.length === 1 ? 'item' : 'itens'
                }`}
              </span>
            </button>
          ))}
        </OrdersContainer>
      )}
    </Board>
  );
}
