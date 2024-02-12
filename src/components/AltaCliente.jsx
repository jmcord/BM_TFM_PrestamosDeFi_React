import React, { useState, useEffect } from 'react';
import { Button, TextInput, Title } from './ui';
import { useContractWrite, useWaitForTransactionReceipt } from 'wagmi';
import { blockmakerTokenABI } from '../contracts/ABIs';

function AltaCliente({ empleadoPrestamista }) {
  const [nuevoCliente, setNuevoCliente] = useState('');
  const [error, setError] = useState('');

  const isValidAddress = (address) => {
    return /^(0x)?[0-9a-f]{40}$/i.test(address);
  };

  const { config } = useContractWrite({
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi: blockmakerTokenABI,
    functionName: 'altaCliente',
    args: [nuevoCliente],
    signer: empleadoPrestamista // El empleado prestamista firma la transacción
  });

  const { data: writeData, write } = useContractWrite(config);

  const {
    isLoading: isTransactionLoading,
    isSuccess: isTransactionSuccess,
    isError: isTransactionError
  } = useWaitForTransactionReceipt({
    hash: writeData?.hash
  });

  const handleAltaCliente = () => {
    if (!isValidAddress(nuevoCliente)) {
      setError('Dirección Ethereum no válida');
      return;
    }
    setError('');
    write();
  };
  useEffect(() => {
    console.log('Valor de write:', write);
    if (isTransactionSuccess) {
      setNuevoCliente('');
      console.log('Transacción Completada!');
    }
    if (isTransactionError) {
      console.log('Transacción Fallida!');
    }
  }, [write, isTransactionSuccess, isTransactionError]);

  console.log('Dirección del nuevo cliente:', nuevoCliente);

  return (
    <section className="bg-white p-4 border shadow rounded-md">
      <Title>Alta de Cliente</Title>

      <form className="grid gap-4">
        <TextInput type="text" placeholder="Dirección del nuevo cliente" onChange={(e) => setNuevoCliente(e.target.value)} value={nuevoCliente} />
        {error && <p className="text-red-500">{error}</p>}
        <Button disabled={!write || isTransactionLoading || isTransactionSuccess === undefined || isTransactionError === undefined} onClick={handleAltaCliente} isLoading={isTransactionLoading}>
          {isTransactionLoading ? 'Dando de alta cliente...' : 'Dar de alta cliente'}
        </Button>
      </form>
    </section>
  );
}

export default AltaCliente;