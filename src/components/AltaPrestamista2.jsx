import React, { useState, useEffect } from 'react';
import { Button, TextInput, Title } from './ui';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { blockmakerTokenABI } from '../contracts/ABIs';


function AltaPrestamista2({ socioPrincipal }) {
  const [nuevoPrestamista, setNuevoPrestamista] = useState('');
  const [error, setError] = useState('');

  const isValidAddress = (address) => {
    return /^(0x)?[0-9a-f]{40}$/i.test(address);
  };

  const { config } = useWriteContract({
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi: blockmakerTokenABI,
    functionName: 'altaPrestamista',
    args: [nuevoPrestamista],
    signer: socioPrincipal // El socio principal firma la transacción
  });

  const { data: writeData, write } = useWriteContract(config);

  const {
    isLoading: isTransactionLoading,
    isSuccess: isTransactionSuccess,
    isError: isTransactionError
  } = useWaitForTransactionReceipt({
    hash: writeData?.hash
  });

  const handleAltaPrestamista = () => {
    if (!isValidAddress(nuevoPrestamista)) {
      setError('Dirección Ethereum no válida');
      return;
    }
    setError('');
    write();
  };

  useEffect(() => {
    if (isTransactionSuccess) {
      setNuevoPrestamista('');
      console.log('Transacción Completada!');
    }
    if (isTransactionError) {
      console.log('Transacción Fallida!');
    }
  }, [isTransactionSuccess, isTransactionError]);

  return (
    <section className="bg-white p-4 border shadow rounded-md">
      <Title>TransferForm</Title>

      <form className="grid gap-4">
        <TextInput type="text" placeholder="Dirección del nuevo prestamista" onChange={(e) => setNuevoPrestamista(e.target.value)} value={nuevoPrestamista} />
        {error && <p className="text-red-500">{error}</p>}
        <Button disabled={!write || isTransactionLoading || isTransactionSuccess === undefined || isTransactionError === undefined} onClick={handleAltaPrestamista} isLoading={isTransactionLoading}>
          {isTransactionLoading ? 'Dando de alta prestamista...' : 'Dar de alta prestamista'}
        </Button>
      </form>
    </section>
  );
}

export default AltaPrestamista2;