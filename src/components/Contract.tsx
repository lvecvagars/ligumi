import React from 'react';
import { IContract } from '../interfaces';
import {FaTrashAlt} from "react-icons/fa";

interface ContractProps {
  key: number;
  contract: IContract;
  onDelete: (id: number) => void;
}

const Contract: React.FC<ContractProps> = (props: ContractProps) => {
  const convertDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  const handleDelete = () => {
    const question = window.confirm('Vai tiešām vēlaties izdzēst līgumu?');
    if(question) {
      props.onDelete(props.contract.id);
    }
  }

  return (
    <tr>
      <td>{props.contract.title}</td>
      <td>{props.contract.number}</td>
      <td>{props.contract.company}</td>
      <td>{props.contract.sum}</td>
      <td>{props.contract.currency}</td>
      <td>{convertDate(props.contract.startDate.toString())}</td>
      <td>{convertDate(props.contract.endDate.toString())}</td>
      <td>
        <FaTrashAlt
          className='text-danger'
          style={{cursor: 'pointer'}}
          onClick={handleDelete}
        />
      </td>
    </tr>
  )
}

export default Contract