import React from 'react';
import { useRouter } from 'next/router';
import { RecoilRoot } from 'recoil';

import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Roll from '../components/Roll/Roll';
import { useListaDeParticipantes } from '../hooks/useListadeParticipantes';

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

describe('quando nao existem participantes suficintes', () => {
  const participantes: string[] = ['ana', 'joana'];
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
  });
  test('testa se tem pelo menos 3 participantes para iniciar', () => {
    render(
      <RecoilRoot>
        <Roll />
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
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  test('tem que ter 3 participantes ou mais', () => {
    render(
      <RecoilRoot>
        <Roll />
      </RecoilRoot>
    );

    const botao = screen.getByRole('button');
    expect(botao).toBeEnabled();
  });

  test('Botao deve mandar para pagina de resultado', () => {
    render(
      <RecoilRoot>
        <Roll />
      </RecoilRoot>
    );

    const botao = screen.getByRole('button');

    fireEvent.click(botao);

    expect(mockedRouter.push).toBeCalled();
  });
});
