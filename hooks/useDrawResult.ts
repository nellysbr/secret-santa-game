import { useRecoilValue } from 'recoil';
import { resultadoAmigoSecreto } from '../state/atom';

export const useDrawResult = () => {
  return useRecoilValue(resultadoAmigoSecreto);
};
