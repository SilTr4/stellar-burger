import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeedData, getFeeds } from '../../slices/feed-slice/feed-slice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const feedData = useSelector(getFeedData);
  const dispatch = useDispatch();
  const orders: TOrder[] = feedData.orders;

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeeds());
      }}
    />
  );
};
