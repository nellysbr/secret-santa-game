// __tests__/index.test.jsx

import { fireEvent, render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RecoilRoot } from 'recoil';
import Form from '../components/Form/Form';

describe('Comportamento do formulario', () => {
  test('Quando o input esta vazio, novos participantes nao podem ser adicionados', () => {
    // inicializa componente
    render(
      <RecoilRoot>
        <Form />
      </RecoilRoot>
    );

    // encontrar no dom
    const input = screen.getByPlaceholderText('Insira o nome do participante');
    // encontrar botao

    const botao = screen.getByRole('button');
    // garantir que o input esteja no documento

    expect(input).toBeInTheDocument();
    // garantir que o botao esteja desabilitado
    expect(botao).toBeDisabled();
  });

  test('adicionar um participant caso exista um nome preenchido', () => {
    render(
      <RecoilRoot>
        <Form />
      </RecoilRoot>
    );

    // encontrar no dom
    const input = screen.getByPlaceholderText('Insira o nome do participante');
    // encontrar botao

    const botao = screen.getByRole('button');

    // inserir valor no input
    fireEvent.change(input, {
      target: {
        value: 'catarina',
      },
    });

    // clicar no botao submeter

    fireEvent.click(botao);

    // cursor volte pro foco no input

    expect(input).toHaveFocus();

    // reset value do input

    expect(input).toHaveValue('');
  });

  test('nomes duplicados nao podem ser adicionados', () => {
    render(
      <RecoilRoot>
        <Form />
      </RecoilRoot>
    );

    const input = screen.getByPlaceholderText('Insira o nome do participante');
    const botao = screen.getByRole('button');

    fireEvent.change(input, {
      target: {
        value: 'catarina',
      },
    });

    fireEvent.click(botao);

    fireEvent.change(input, {
      target: {
        value: 'catarina',
      },
    });

    fireEvent.click(botao);

    const errorMsg = screen.getByRole('alert');

    expect(errorMsg.textContent).toBe('nomes duplicados nao sao permitidos!');
  });

  test('msg de erro deve sumir apos os timers', () => {
    jest.useFakeTimers();
    render(
      <RecoilRoot>
        <Form />
      </RecoilRoot>
    );

    const input = screen.getByPlaceholderText('Insira o nome do participante');
    const botao = screen.getByRole('button');

    fireEvent.change(input, {
      target: {
        value: 'catarina',
      },
    });

    fireEvent.click(botao);

    fireEvent.change(input, {
      target: {
        value: 'catarina',
      },
    });

    fireEvent.click(botao);

    let errorMsg = screen.queryByRole('alert');
    expect(errorMsg).toBeInTheDocument();

    // esperar n segundos

    act(() => {
      // evita que o form se renderize dnv
      jest.runAllTimers();
    });

    errorMsg = screen.queryByRole('alert');
    expect(errorMsg).toBeNull();
  });
});
