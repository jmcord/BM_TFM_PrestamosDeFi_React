import React, { useState } from 'react';
import { useContractWrite, useWaitForTransactionReceipt } from 'wagmi';

function AltaPrestamista({ socioPrincipal, prestamistaAddress }) {
  // Estado para manejar el mensaje de éxito o error
  const [message, setMessage] = useState('');

  // Preparar la escritura de la transacción
  const { data: writeData, write } = useContractWrite({
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    functionName: 'altaPrestamista',
    args: [prestamistaAddress],
    signer: socioPrincipal // El signatario es el socio principal
  });

  // Esperar a que se complete la transacción
  const { isLoading, isSuccess, isError } = useWaitForTransactionReceipt({
    hash: writeData?.hash
  });

  // Manejar el éxito o el error de la transacción
  if (isSuccess) {
    setMessage('¡Alta de prestamista exitosa!');
  } else if (isError) {
    setMessage('Error al dar de alta al prestamista');
  }

  return (
    <div>
      <button onClick={write} disabled={isLoading}>
        Dar de alta prestamista
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AltaPrestamista;
