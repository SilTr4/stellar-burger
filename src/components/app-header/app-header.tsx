import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUserData } from '../../slices/user-slice/user-slice';

export const AppHeader: FC = () => {
  const userData = useSelector(getUserData);
  return <AppHeaderUI userName={userData.name} />;
};
