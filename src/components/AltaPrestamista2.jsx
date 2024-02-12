import React, { useState } from 'react';
import { Button, TextInput, Title } from './ui';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { blockmakerTokenABI } from '../contracts/ABIs'

function AltaPrestamista2({ }) {
  const [nuevoPrestamista, setNuevoPrestamista] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { config } = useWriteContract({
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi: blockmakerTokenABI,
    functionName: 'altaPrestamista',
    args: [nuevoPrestamista],
    signer: import.meta.env.socioPrincipal
  });

  const { data: writeData, write } = useWriteContract(config);

  const { isSuccess, isError } = useWaitForTransactionReceipt({
    hash: writeData?.hash
  });

  useState(() => {
    if (isSuccess) {
      setSuccessMessage('¡Alta de prestamista exitosa!');
      setIsLoading(false);
    } else if (isError) {
      setErrorMessage('Error al dar de alta al prestamista');
      setIsLoading(false);
    }
  }, [isSuccess, isError]);

  const handleAltaPrestamista = () => {
    setIsLoading(true);
    write();
  };

  return (
    <section className="bg-white p-4 border shadow rounded-md">
      <Title>Alta de Prestamista</Title>
      <form>
        <TextInput type="text" placeholder="Dirección del nuevo prestamista" value={nuevoPrestamista} disabled onChange={(e) => setNuevoPrestamista(e.target.value)}/>
        <Button disabled={isLoading} onClick={handleAltaPrestamista}>
          {isLoading ? 'Cargando...' : 'Dar de alta prestamista'}
        </Button>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </section>
  );
}

export default AltaPrestamista2;