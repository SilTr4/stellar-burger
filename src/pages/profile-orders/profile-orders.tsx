import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getOrders,
  getOrdersData
} from '../../slices/orders-slice/orders-slice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersData());
  }, [dispatch]);

  const orders: TOrder[] = useSelector(getOrders).orders;

  return <ProfileOrdersUI orders={orders} />;
};
