import React from 'react';

import { useRouter } from 'next/router';
import { useListaDeParticipantes } from '../../hooks/useListadeParticipantes';
import { useDraw } from '../../hooks/useDraw';

const Footer = () => {
  const participantes = useListaDeParticipantes();
  const router = useRouter();
  const realizarSorteio = useDraw();

  const jogar = () => {
    realizarSorteio();
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

export default Footer;
