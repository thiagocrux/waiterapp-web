import { useState } from 'react';
import { toast } from 'react-toastify';

import type { Order } from '../../types';
import OrderModal from '../OrderModal';

import { api } from '../../utils';
import { Board, OrdersContainer } from './styles';

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
}

export default function OrdersBoard({
  icon,
  title,
  orders,
  onCancelOrder,
}: OrdersBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setLoading] = useState(false);

  function handleModalOpening(order: Order) {
    setIsModalVisible(true);
    setSelectedOrder(order);
  }

  function handleModalClosing() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }

  async function handleOrderCancellation() {
    if (!selectedOrder) {
      return;
    }

    setLoading(true);
    await api.delete(`/orders/${selectedOrder._id}`);
    toast.success(`O pedido da mesa ${selectedOrder.table} foi cancelado!`);
    onCancelOrder(selectedOrder._id);
    setLoading(false);
    setIsModalVisible(false);
  }

  return (
    <Board>
      <OrderModal
        order={selectedOrder}
        isVisible={isModalVisible}
        isLoading={isLoading}
        onClose={handleModalClosing}
        onCancelOrder={handleOrderCancellation}
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
