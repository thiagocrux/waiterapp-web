import { useState } from 'react';
import { toast } from 'react-toastify';

import type { Order } from '../../types';
import { api } from '../../utils';
import OrderModal from '../OrderModal';

import { Board, OrdersContainer } from './styles';

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
  onStatusUpdate: (orderId: string, status: Order['status']) => void;
}

export default function OrdersBoard({
  icon,
  title,
  orders,
  onCancelOrder,
  onStatusUpdate,
}: OrdersBoardProps) {
  const [isModalVisible, setModalVisibility] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setLoading] = useState(false);

  function openModal(order: Order) {
    setModalVisibility(true);
    setSelectedOrder(order);
  }

  function closeModal() {
    setModalVisibility(false);
    setSelectedOrder(null);
  }

  async function updateOrderStatus() {
    if (!selectedOrder) {
      return;
    }

    const status =
      selectedOrder.status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE';

    setLoading(true);
    await api.patch(`/orders/${selectedOrder._id}`, { status });

    toast.success(
      `O pedido da mesa ${selectedOrder.table} teve seu status atualizado!`
    );

    onStatusUpdate(selectedOrder._id, status);
    setLoading(false);
    setModalVisibility(false);
  }

  async function cancelOrder() {
    if (!selectedOrder) {
      return;
    }

    setLoading(true);
    await api.delete(`/orders/${selectedOrder._id}`);
    toast.success(`O pedido da mesa ${selectedOrder.table} foi cancelado!`);
    onCancelOrder(selectedOrder._id);
    setLoading(false);
    setModalVisibility(false);
  }

  return (
    <Board>
      <OrderModal
        order={selectedOrder}
        isVisible={isModalVisible}
        isLoading={isLoading}
        onClose={closeModal}
        onCancelOrder={cancelOrder}
        onChangeOrderStatus={updateOrderStatus}
      />
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>
      {orders.length > 0 && (
        <OrdersContainer>
          {orders.map((order, index) => (
            <button type="button" key={index} onClick={() => openModal(order)}>
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
