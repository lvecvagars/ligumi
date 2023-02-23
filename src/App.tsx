import React from 'react';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Contracts from './components/Contracts';
import AddContract from './components/AddContract';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { IContract } from './interfaces';

const App: React.FC = () => {
  const [showAddContract, setShowAddContract] = useState<boolean>(false);

  const [contracts, setContracts] = useState<IContract[]>([
    {
      id: 1,
      number: 'B2001234',
      startDate: new Date(2020, 0, 1),
      sum: 120.59,
      currency: 'Eiro (€)',
      title: 'Līgums 1',
      company: 'SIA Meži',
      endDate: new Date(2023, 0, 1)
    },
    {
      id: 2,
      number: 'A1437431',
      startDate: new Date(2021, 3, 10),
      sum: 99.99,
      currency: 'Eiro (€)',
      title: 'Līgums 2',
      company: 'SIA Lauki',
      endDate: new Date(2022, 0, 9)
    },
    {
      id: 3,
      number: 'C1309532',
      startDate: new Date(2020, 8, 12),
      sum: 250.00,
      currency: 'Eiro (€)',
      title: 'Līgums 3',
      company: 'SIA Kalni',
      endDate: new Date(2022, 7, 1)
    }
  ]);

  const STORAGE_KEY = 'contracts';

  useEffect(() => {
    const data = window.localStorage.getItem(STORAGE_KEY);
    if (data) {
      setContracts(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(contracts));
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
        <AddContract lastContract={contracts[contracts.length - 1]} onAdd={addContract} />
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
