import { useEffect } from 'react';

import { closeIcon } from '../../assets';
import { Order } from '../../types';
import { formatCurrency } from '../../utils';

import { Actions, ModalBody, OrderDetails, Overlay } from './styles';

interface OrderModalProps {
  order: Order | null;
  isVisible: boolean;
  isLoading: boolean;
  onClose: () => void;
  onCancelOrder: () => Promise<void>;
  onChangeOrderStatus: () => Promise<void>;
}

export default function OrderModal({
  order,
  isVisible,
  isLoading,
  onClose,
  onCancelOrder,
  onChangeOrderStatus,
}: OrderModalProps) {
  useEffect(() => {
    function handleEscapePress(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEscapePress);

    return () => {
      document.removeEventListener('keydown', handleEscapePress);
    };
  }, [onClose]);

  if (!isVisible || !order) {
    return null;
  }

  const totalValue = order.products.reduce((acc, { product, quantity }) => {
    return acc + product.price * quantity;
  }, 0);

  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong>Mesa {order.table}</strong>
          <span role="button" onClick={onClose}>
            <img src={closeIcon} alt="Close button" />
          </span>
        </header>
        <div className="status-container">
          <small>Status do Pedido</small>
          <div>
            <span>
              {order.status === 'WAITING' && '🕑'}
              {order.status === 'IN_PRODUCTION' && '🧑‍🍳'}
              {order.status === 'DONE' && '✅'}
            </span>
            <strong>
              {order.status === 'WAITING' && 'Fila de espera'}
              {order.status === 'IN_PRODUCTION' && 'Em preparação'}
              {order.status === 'DONE' && 'Pronto!'}
            </strong>
          </div>
        </div>
        <OrderDetails>
          <strong>Itens</strong>
          <div className="order-items">
            {order.products.map(({ _id, product, quantity }) => (
              <div className="item" key={_id}>
                <img
                  src={product.imagePath}
                  alt={product.name}
                  width={56}
                  height={28.51}
                />
                <span className="quantity">{quantity}x</span>
                <div className="product-details">
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="total">
            <span>Total</span>
            <strong>{formatCurrency(totalValue)}</strong>
          </div>
        </OrderDetails>
        <Actions>
          {order.status !== 'DONE' && (
            <button
              type="button"
              disabled={isLoading}
              className="primary"
              onClick={onChangeOrderStatus}
            >
              <span>
                {order.status === 'WAITING' && '🧑‍🍳'}
                {order.status === 'IN_PRODUCTION' && '✅'}
              </span>
              <span>
                {order.status === 'WAITING' && 'Iniciar produção'}
                {order.status === 'IN_PRODUCTION' && 'Concluir pedido'}
              </span>
            </button>
          )}
          <button
            type="button"
            disabled={isLoading}
            className="secondary"
            onClick={onCancelOrder}
          >
            {order.status === 'DONE' ? 'Deletar Pedido' : 'Cancelar Pedido'}
          </button>
        </Actions>
      </ModalBody>
    </Overlay>
  );
}
