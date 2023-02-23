import React, { useState } from 'react';
import { useDrawResult } from '../../hooks/useDrawResult';
import { useListaDeParticipantes } from '../../hooks/useListadeParticipantes';

const SantaDraw = () => {
  const participantes = useListaDeParticipantes();

  const [participanteDaVez, setParticipanteDaVez] = useState<string>('');
  const [amigoSecreto, setAmigoSecreto] = useState<string>('');

  const resultado = useDrawResult();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (resultado.has(participanteDaVez)) {
      setAmigoSecreto(resultado.get(participanteDaVez)!);
    }
  };
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <select
          required
          name="participantesdavez"
          id="participantesdavez"
          placeholder="selecione o seu nome"
          value={participanteDaVez}
          onChange={(e) => setParticipanteDaVez(e.target.value)}
        >
          <option>Selecione seu nome</option>
          {participantes.map((participante) => (
            <option key={participante}>{participante}</option>
          ))}
        </select>
        <button type="submit">Sortear</button>
      </form>
      {amigoSecreto && <p role="alert">{amigoSecreto}</p>}
    </section>
  );
};

export default SantaDraw;
