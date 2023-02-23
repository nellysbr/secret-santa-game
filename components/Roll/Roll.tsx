import React from 'react';
import { useRouter } from 'next/router';
import { useListaDeParticipantes } from '../../hooks/useListadeParticipantes';

const Roll = () => {
  const participantes = useListaDeParticipantes();
  const router = useRouter();

  const jogar = () => {
    router.push('/resultado');
  };

  return (
    <div>
      <button disabled={participantes.length < 3} onClick={jogar} type="submit">
        iniciar brincadeira
      </button>
    </div>
  );
};

export default Roll;
