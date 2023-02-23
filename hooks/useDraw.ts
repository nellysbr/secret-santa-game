import { useSetRecoilState } from 'recoil';
import { useListaDeParticipantes } from './useListadeParticipantes';
import { resultadoAmigoSecreto } from '../state/atom';
import { realizarSorteio } from './helpers/realizarSorteio';

export const useDraw = () => {
  const participantes = useListaDeParticipantes();
  const setResultado = useSetRecoilState(resultadoAmigoSecreto);
  return () => {
    const resultado = realizarSorteio(participantes);

    setResultado(resultado);
  };
};
