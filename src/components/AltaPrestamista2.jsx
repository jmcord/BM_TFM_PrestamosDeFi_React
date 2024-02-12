import React, { useState, useEffect } from 'react';
import { Button, TextInput, Title } from './ui';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { blockmakerTokenABI } from '../contracts/ABIs'

function AltaPrestamista2({ }) {
  const [nuevoPrestamista, setNuevoPrestamista] = useState('');


  const { config } = useWriteContract({
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi: blockmakerTokenABI,
    functionName: 'altaPrestamista',
    args: [nuevoPrestamista]

  });

  const { data: writeData, write } = useWriteContract(config);

  const {
    isLoading: isTransactionLoading,
    isSuccess: isTransactionSuccess,
    isError: isTransactionError
  } = useWaitForTransactionReceipt({
    hash: writeData?.hash
  });

  const handleAltaPrestamista = (event) => {
    setNuevoPrestamista(event.target.value);
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
        <TextInput type="text" placeholder="Address" onChange={handleAltaPrestamista} />
        <Button disabled={!write || isTransactionLoading} onClick={() => write?.()} isLoading={isTransactionLoading}>
          {isTransactionLoading ? 'Dando de alta prestamista...' : 'Dar de alta prestamista'}
        </Button>
      </form>
    </section>
  );
}

export default AltaPrestamista2;