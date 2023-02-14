import React from 'react';
import Contract from './Contract';
import Table from 'react-bootstrap/Table';

interface IContract {
  id: number;
  number: string;
  startDate: string;
  sum: number;
  currency: string;
  title: string;
  company: string;
  endDate: string;
}

interface ContractsProps {
  contracts: IContract[];
  onDelete: (id: number) => void;
}

const Contracts: React.FC<ContractsProps> = (props: ContractsProps) => {
  return (
    <Table responsive striped bordered hover size='sm' className='mt-3 mt-md-4 text-center'>
      <thead>
        <tr>
          <th>Nosaukums</th>
          <th>Numurs</th>
          <th className='col-2'>Otra puse</th>
          <th>Summa</th>
          <th>Valūta</th>
          <th>Noslēgšanas datums</th>
          <th className='col-2'>Beigu datums</th>
          <th>Izdzēst</th>
        </tr>
      </thead>
      <tbody>
        {props.contracts.map((contract: IContract) => (
          <Contract key={contract.id} contract={contract} onDelete={props.onDelete} />
        ))}
      </tbody>
    </Table>
  )
}

export default Contracts