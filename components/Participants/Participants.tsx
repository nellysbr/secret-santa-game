/* eslint-disable prettier/prettier */
import React from 'react';
import { useListaDeParticipantes } from '../../hooks/useListadeParticipantes';

const Participants = () => {
  const participantes: string[] = useListaDeParticipantes();

  return (
    <ul>
      {participantes?.map((participante) => (
        <li key={participante}>{participante}</li>
      ))}
    </ul>
  );
};

export default Participants;
