import React, { FormEvent, useRef, useState } from 'react';
import { useAddParticipant } from '../../hooks/useAddParticipants';
import { useErrorMessage } from '../../hooks/useErrorMessage';

function Form() {
  const [nome, setNome] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const adicionar = useAddParticipant();
  const msgErro = useErrorMessage();

  const addParticipant = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    adicionar(nome);
    setNome('');
    inputRef.current?.focus();
  };
  return (
    <div className="flex items-center justify-center align-middle">
      <div className="card mt-12 w-3/6 rounded-lg">
        <form
          onSubmit={addParticipant}
          className="flex items-center justify-center align-middle"
        >
          <input
            type="text"
            ref={inputRef}
            className="mt-6 h-9 w-2/6 justify-center border-2 border-solid border-sky-500 text-center align-middle"
            placeholder="Insira o nome do participante"
            onChange={(e) => setNome(e.target.value)}
            value={nome}
          />
          <button
            className="mt-6 ml-2 h-9 cursor-pointer bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            type="submit"
            disabled={!nome}
          >
            Adicionar
          </button>
          {msgErro && <p role="alert">{msgErro}</p>}
        </form>
      </div>
    </div>
  );
}

export default Form;
