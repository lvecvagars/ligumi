import React from 'react';
import { FaTrashAlt } from "react-icons/fa";

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

interface ContractProps {
  key: number;
  contract: IContract;
  onDelete: (id: number) => void;
}

const Contract: React.FC<ContractProps> = (props: ContractProps) => {
  return (
    <tr>
      <td>{props.contract.title}</td>
      <td>{props.contract.number}</td>
      <td className='col-2'>{props.contract.company}</td>
      <td>{props.contract.sum}</td>
      <td>{props.contract.currency}</td>
      <td>{props.contract.startDate}</td>
      <td className='col-2'>{props.contract.endDate}</td>
      <td>
        <FaTrashAlt
          className='text-danger'
          style={{cursor: 'pointer'}}
          onClick={() => props.onDelete(props.contract.id)}
        />
      </td>
    </tr>
  )
}

export default Contract