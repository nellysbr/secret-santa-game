import React from 'react';

import Image from 'next/image';

const Header = () => {
  return (
    <header className="flex-col justify-around pt-28">
      <div role="img" aria-label="Logo do Sorteador" />
      <Image
        src="/imagens/participante.png"
        alt="Participante com um presente na mão"
        width={351}
        height={117}
      />
    </header>
  );
};

export default Header;
