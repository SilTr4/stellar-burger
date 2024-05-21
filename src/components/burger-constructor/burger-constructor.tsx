import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { getBurgersIngredients } from '../../slices/burger-constructor-slice/burger-constructor-slice';
import {
  getOrders,
  orderBurger,
  resetCurrentOrder
} from '../../slices/orders-slice/orders-slice';
import { getUserData } from '../../slices/user-slice/user-slice';
import { Navigate, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const burger = useSelector(getBurgersIngredients);
  const order = useSelector(getOrders);
  const userData = useSelector(getUserData);
  const navigate = useNavigate();

  const constructorItems = {
    bun: burger.bun,
    ingredients: burger.ingredients
  };

  const orderRequest = order.pending;

  const orderModalData = order.currentOrder;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!userData.isAuthenticated) {
      return navigate('/login');
    }
    const order: string[] = [];
    order.push(constructorItems.bun._id);
    constructorItems.ingredients.forEach((ingredient) => {
      order.push(ingredient._id);
    });
    order.push(constructorItems.bun._id);
    dispatch(orderBurger(order));
  };
  const closeOrderModal = () => {
    dispatch(resetCurrentOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
