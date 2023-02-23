import { useRecoilValue, useSetRecoilState } from 'recoil';
import { erroState, participantList } from '../state/atom';

export const useAddParticipant = () => {
  const setList = useSetRecoilState(participantList);
  const list = useRecoilValue(participantList);
  const setError = useSetRecoilState(erroState);
  return (participantName: string) => {
    if (list.includes(participantName)) {
      setError('nomes duplicados nao sao permitidos!');
      setTimeout(() => {
        setError('');
      }, 2000);
      return;
    }
    return setList((listaAtual) => [...listaAtual, participantName]);
  };
};
