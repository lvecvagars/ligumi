import React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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

interface IAddContract {
  onAdd: (contract: IContract) => void;
}

const AddContract: React.FC<IAddContract> = (props: IAddContract) => {
  const [title, setTitle] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [sum, setSum] = useState<number>(0);
  const [currency, setCurrency] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if(!title) {
      alert('Lūdzu ierakstiet līguma nosaukumu');
      return;
    }

    if(!number) {
      alert('Lūdzu ierakstiet līguma numuru');
      return;
    }

    if(!company) {
      alert('Lūdzu ierakstiet līguma otru pusi');
      return;
    }

    if(!sum) {
      alert('Lūdzu ierakstiet līguma summu');
      return;
    }

    if(!currency) {
      alert('Lūdzu izvēlieties līguma valūtu');
      return;
    }

    if(!startDate) {
      alert('Lūdzu izvēlieties līguma noslēgšanas datumu');
      return;
    }

    if(!endDate) {
      alert('Lūdzu izvēlieties līguma beigu datumu');
      return;
    }

    const id = Math.floor(Math.random() * 10000) + 1;

    props.onAdd({ id, title, number, company, sum, currency, startDate, endDate });

    setTitle('');
    setNumber('');
    setCompany('');
    setSum(0);
    setCurrency('');
    setStartDate('');
    setEndDate('');
  }

  return (
    <div className='d-flex justify-content-center'>
      <Form onSubmit={onSubmit} className='my-3 my-md-4 col-8 col-md-6 col-lg-4'>

        <Form.Group className='mb-3' controlId='formTitle'>
          <Form.Label>Līguma nosaukums</Form.Label>
          <Form.Control
            type='text'
            placeholder='Pievienot nosaukumu'
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formNumber'>
          <Form.Label>Līguma numurs</Form.Label>
          <Form.Control
            type='text'
            placeholder='Pievienot numuru'
            value={number}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNumber(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formCompany'>
          <Form.Label>Līguma otra puse</Form.Label>
          <Form.Control
            type='text'
            placeholder='Pievienot otru pusi'
            value={company}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompany(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formSum'>
          <Form.Label>Līguma summa</Form.Label>
          <Form.Control
            type='number'
            value={sum}
            step='5'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSum(e.target.valueAsNumber)}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formCurrency'>
          <Form.Label>Līguma valūta</Form.Label>
          <Form.Select
            defaultValue=''
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCurrency(e.target.value)}
          >
            <option value='' disabled>Pievienot valūtu</option>
            <option value='Eiro (€)'>Eiro (€)</option>
            <option value='Dolāri ($)'>Dolāri ($)</option>
            <option value='Mārciņas (£)'>Mārciņas (£)</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formStartDate'>
          <Form.Label>Līguma noslēgšanas datums</Form.Label>
          <Form.Control
            type='date'
            value={startDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formEndDate'>
          <Form.Label>Līguma beigu datums</Form.Label>
          <Form.Control
            type='date'
            value={endDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
          />
        </Form.Group>

        <Button className='w-100' variant='primary' type='submit'>Saglabāt līgumu</Button>

      </Form>
    </div>
  )
}

export default AddContract