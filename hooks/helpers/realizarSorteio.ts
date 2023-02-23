import shuffle from 'just-shuffle';

export function realizarSorteio(participantes: string[]) {
  const totalPartipantes = participantes.length;
  const participantesEmbaralhados = shuffle(participantes);
  const resultado = new Map<string, string>();

  for (let index = 0; index < totalPartipantes; index += 1) {
    const indiceParticipante = index === totalPartipantes - 1 ? 0 : index + 1;
    resultado.set(
      participantesEmbaralhados[index],
      participantesEmbaralhados[indiceParticipante]
    );
  }

  return resultado;
}
