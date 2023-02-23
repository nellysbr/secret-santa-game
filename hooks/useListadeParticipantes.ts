import { useRecoilValue } from 'recoil';
import { participantList } from '../state/atom';

export const useListaDeParticipantes = () => {
  return useRecoilValue(participantList);
};
