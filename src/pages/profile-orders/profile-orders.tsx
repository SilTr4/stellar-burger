import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector } from '../../services/store';
import { getOrders } from '../../slices/orders-slice/orders-slice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */

  const orders: TOrder[] = useSelector(getOrders).orders;

  return <ProfileOrdersUI orders={orders} />;
};
