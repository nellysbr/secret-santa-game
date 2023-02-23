import React from 'react';
import { useRouter } from 'next/router';
import { RecoilRoot } from 'recoil';

import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Footer from '../components/Footer/Footer';
import { useListaDeParticipantes } from '../hooks/useListadeParticipantes';
import { useDraw } from '../hooks/useDraw';

jest.mock('../hooks/useListadeParticipantes', () => {
  return {
    useListaDeParticipantes: jest.fn(),
  };
});

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
const mockedRouter = {
  push: jest.fn(),
};

jest.mock('../hooks/useDraw', () => ({
  useDraw: jest.fn(),
}));

const Mocksorteio = jest.fn();

describe('quando nao existem participantes suficintes', () => {
  const participantes: string[] = ['ana', 'joana'];
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
  });
  test('testa se tem pelo menos 3 participantes para iniciar', () => {
    render(
      <RecoilRoot>
        <Footer />
      </RecoilRoot>
    );

    const botao = screen.getByRole('button');
    expect(botao).toBeDisabled();
  });
});

describe('quando existem participantes suficientes', () => {
  const participantes: string[] = ['ana', 'joana', 'matheus', 'rodrigo'];
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
    (useRouter as jest.Mock).mockReturnValue(mockedRouter);
    (useDraw as jest.Mock).mockReturnValue(Mocksorteio);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('tem que ter 3 participantes ou mais', () => {
    render(
      <RecoilRoot>
        <Footer />
      </RecoilRoot>
    );

    const botao = screen.getByRole('button');
    expect(botao).toBeEnabled();
  });

  test('Botao deve mandar para pagina de resultado', () => {
    render(
      <RecoilRoot>
        <Footer />
      </RecoilRoot>
    );

    const botao = screen.getByRole('button');

    fireEvent.click(botao);

    expect(mockedRouter.push).toHaveBeenCalledTimes(1);
    expect(mockedRouter.push).toBeCalledWith('/resultado');
    expect(Mocksorteio).toHaveBeenCalledTimes(1);
  });
});
