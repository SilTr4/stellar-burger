import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { getIngredients } from '../../slices/ingredients-slice/ingredients-slice';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const selector = useSelector;
  const params = useParams();

  const ingredientData = selector(getIngredients).ingredients.find(
    (ingredient) => ingredient._id === params.id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
