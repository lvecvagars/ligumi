import React from 'react';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Contracts from './components/Contracts';
import AddContract from './components/AddContract';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

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

const App: React.FC = () => {
  const [showAddContract, setShowAddContract] = useState<boolean>(false);

  useEffect(() => {
    const data = window.localStorage.getItem('showAddContract');
    if (data) {
      setShowAddContract(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('showAddContract', JSON.stringify(showAddContract));
  }, [showAddContract]);

  const [contracts, setContracts] = useState<IContract[]>([
    {
      id: 1,
      number: 'B2001234',
      startDate: '2020-01-01',
      sum: 120.59,
      currency: 'Euro',
      title: 'Līgums 1',
      company: 'SIA Meži',
      endDate: '2023-01-01'
    },
    {
      id: 2,
      number: 'A1437431',
      startDate: '2021-04-10',
      sum: 99.99,
      currency: 'Euro',
      title: 'Līgums 2',
      company: 'SIA Lauki',
      endDate: '2022-01-09'
    },
    {
      id: 3,
      number: 'C1309532',
      startDate: '2020-09-12',
      sum: 250.00,
      currency: 'Euro',
      title: 'Līgums 3',
      company: 'SIA Kalni',
      endDate: '2022-08-01'
    }
  ]);

  useEffect(() => {
    const data = window.localStorage.getItem('contracts');
    if (data) {
      setContracts(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('contracts', JSON.stringify(contracts));
  }, [contracts]);

  const addContract = (contract: IContract) => {
    setContracts(contracts => [...contracts, contract]);
    setShowAddContract(!showAddContract);
  }

  const deleteContract = (id: number) => {
    setContracts(contracts.filter((contract: IContract) => (contract.id !== id)));
  }

  return (
    <Container className='border border-5 border-info rounded shadow col-11 my-4 my-md-5 p-3'>
      <Header
          title='Līgumu saraksts'
          onClick={() => setShowAddContract(!showAddContract)}
          showAddContract={showAddContract}
      />

      {showAddContract &&
        <AddContract onAdd={addContract} />
      }

      {(!showAddContract && contracts.length > 0) &&
        <Contracts contracts={contracts} onDelete={deleteContract} />
      }

      {(!showAddContract && contracts.length === 0) &&
        <Alert key='warning' variant='warning' className='mt-4'>Nav pievienotu līgumu</Alert>
      }
    </Container>
  );
}

export default App;
