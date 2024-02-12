import React from 'react';
//import { useContractCall } from 'wagmi'; // Supongamos que utilizamos useContractCall para llamar a la función obtenerDetalleDePrestamo
import { blockmakerTokenABI } from '../contracts/ABIs';

function PrestamoDetail({ prestatario, id }) {
  const prestamoData = useContractCall({
    abi: blockmakerTokenABI,
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    method: 'obtenerDetalleDePrestamo',
    args: [prestatario, id],
  });

  if (!prestamoData) {
    return <div>Cargando...</div>;
  }

  const prestamo = {
    id: prestamoData[0],
    prestatario: prestamoData[1],
    monto: prestamoData[2],
    plazo: prestamoData[3],
    tiempoSolicitud: prestamoData[4],
    tiempoLimite: prestamoData[5],
    aprobado: prestamoData[6],
    reembolsado: prestamoData[7],
    liquidado: prestamoData[8],
  };

  return (
    <div>
      <h2>Detalles del Préstamo</h2>
      <ul>
        <li>Identificador: {prestamo.id}</li>
        <li>Prestatario: {prestamo.prestatario}</li>
        <li>Monto: {prestamo.monto}</li>
        <li>Plazo: {prestamo.plazo}</li>
        <li>Tiempo de Solicitud: {prestamo.tiempoSolicitud}</li>
        <li>Tiempo Límite: {prestamo.tiempoLimite}</li>
        <li>Aprobado: {prestamo.aprobado ? 'Sí' : 'No'}</li>
        <li>Reembolsado: {prestamo.reembolsado ? 'Sí' : 'No'}</li>
        <li>Liquidado: {prestamo.liquidado ? 'Sí' : 'No'}</li>
      </ul>
    </div>
  );
}

export default PrestamoDetail;