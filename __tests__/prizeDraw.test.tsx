import React from 'react';
import '@testing-library/jest-dom'; // lembrar de importar quando for usar toBeInTheDocument()
import { fireEvent, render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import SantaDraw from '../pages/santa-draw/santa-draw';

import { useListaDeParticipantes } from '../hooks/useListadeParticipantes';
import { realizarSorteio } from '../hooks/helpers/realizarSorteio';
import { useDrawResult } from '../hooks/useDrawResult';

jest.mock('../hooks/useListadeParticipantes', () => {
  return {
    useListaDeParticipantes: jest.fn(),
  };
});

jest.mock('../hooks/useDrawResult', () => {
  return {
    useDrawResult: jest.fn(),
  };
});

describe('pagina de sorteio', () => {
  const participantes = ['ana', 'joana', 'banana'];
  const resultado = new Map([
    ['ana', 'matheus'],
    ['matheus', 'nelson'],
    ['nelson', 'ana'],
  ]);

  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
    (useDrawResult as jest.Mock).mockReturnValue(resultado);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('todos podem tirar seu amigo secreto e garante que tem pelo menos 3', () => {
    render(
      <RecoilRoot>
        <SantaDraw />
      </RecoilRoot>
    );

    const options = screen.queryAllByRole('option');
    expect(options).toHaveLength(participantes.length + 1);
  });

  test('amigo secreto exibido quando solicitado', () => {
    render(
      <RecoilRoot>
        <SantaDraw />
      </RecoilRoot>
    );

    const select = screen.getByPlaceholderText('selecione o seu nome');
    const botao = screen.getByRole('button');

    fireEvent.change(select, {
      target: {
        value: participantes[0],
      },
    });
    fireEvent.click(botao);
    const amigoSecreto = screen.getByRole('alert');
    expect(amigoSecreto).toBeInTheDocument();
  });
});

describe('durante o sorteio (teste hook de sorteio)', () => {
  test('cada participante nao sorteie o proprio nome', () => {
    const participantes = ['ana', 'joana', 'banana'];

    const sorteio = realizarSorteio(participantes);

    participantes.forEach((partipante) => {
      const amigoSecreto = sorteio.get(partipante);

      expect(amigoSecreto).not.toEqual(partipante);
    });
  });
});
