import React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { IContract } from '../interfaces';
import ReactDOMServer from 'react-dom/server';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface IAddContract {
  lastContract: IContract;
  onAdd: (contract: IContract) => void;
}

const AddContract: React.FC<IAddContract> = (props: IAddContract) => {
  const [title, setTitle] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [sum, setSum] = useState<number>(0);
  const [currency, setCurrency] = useState<string>('');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  let currentId = props.lastContract.id;

  const getNextId = (): number => {
    currentId++;
    return currentId;
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let submitForm = true;

    const titleAlert = document.getElementById('titleAlert');

    if(titleAlert) {
      if(title) {
        titleAlert.innerHTML = '';
      } else {
        submitForm = false;
        titleAlert.innerHTML = ReactDOMServer.renderToString(<Alert key='danger' variant='danger' className='mt-2'>Lūdzu ierakstiet līguma nosaukumu!</Alert>);
      }
    }

    const numberAlert = document.getElementById('numberAlert');

    if(numberAlert) {
      if(number) {
        numberAlert.innerHTML = '';
      } else {
        submitForm = false;
        numberAlert.innerHTML = ReactDOMServer.renderToString(<Alert key='danger' variant='danger' className='mt-2'>Lūdzu ierakstiet līguma numuru!</Alert>);
      }
    }

    const companyAlert = document.getElementById('companyAlert');

    if(companyAlert) {
      if(company) {
        companyAlert.innerHTML = '';
      } else {
        submitForm = false;
        companyAlert.innerHTML = ReactDOMServer.renderToString(<Alert key='danger' variant='danger' className='mt-2'>Lūdzu ierakstiet līguma otru pusi!</Alert>);
      }
    }

    const sumAlert = document.getElementById('sumAlert');

    if(sumAlert) {
      if(sum >= 0) {
        sumAlert.innerHTML = '';
      } else {
        submitForm = false;
        sumAlert.innerHTML = ReactDOMServer.renderToString(<Alert key='danger' variant='danger' className='mt-2'>Lūdzu ierakstiet nenegatīvu līguma summu!</Alert>);
      }
    }

    const currencyAlert = document.getElementById('currencyAlert');

    if(currencyAlert) {
      if(currency) {
        currencyAlert.innerHTML = '';
      } else {
        submitForm = false;
        currencyAlert.innerHTML = ReactDOMServer.renderToString(<Alert key='danger' variant='danger' className='mt-2'>Lūdzu izvēlieties līguma valūtu!</Alert>);
      }
    }

    const endDateAlert = document.getElementById('endDateAlert');

    if(endDateAlert) {
      if(endDate.getTime() > startDate.getTime()) {
        endDateAlert.innerHTML = '';
      } else {
        submitForm = false;
        endDateAlert.innerHTML = ReactDOMServer.renderToString(<Alert key='danger' variant='danger' className='mt-2'>Lūdzu izvēlieties līguma beigu datumu vēlāk par noslēgšanas datumu!</Alert>);
      }
    }

    if(submitForm) {
      const id = getNextId();

      props.onAdd({ id, title, number, company, sum, currency, startDate, endDate });

      setTitle('');
      setNumber('');
      setCompany('');
      setSum(0);
      setCurrency('');
      setStartDate(new Date());
      setEndDate(new Date());
    } else {
      return;
    }
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
          <div id='titleAlert'></div>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formNumber'>
          <Form.Label>Līguma numurs</Form.Label>
          <Form.Control
            type='text'
            placeholder='Pievienot numuru'
            value={number}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNumber(e.target.value)}
          />
          <div id='numberAlert'></div>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formCompany'>
          <Form.Label>Līguma otra puse</Form.Label>
          <Form.Control
            type='text'
            placeholder='Pievienot otru pusi'
            value={company}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompany(e.target.value)}
          />
          <div id='companyAlert'></div>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formSum'>
          <Form.Label>Līguma summa</Form.Label>
          <Form.Control
            type='number'
            value={sum}
            step='5'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSum(e.target.valueAsNumber)}
          />
          <div id='sumAlert'></div>
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
          <div id='currencyAlert'></div>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formStartDate'>
          <Form.Label>Līguma noslēgšanas datums</Form.Label>
          <DatePicker
            dateFormat='dd.MM.yyyy'
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formEndDate'>
          <Form.Label>Līguma beigu datums</Form.Label>
          <DatePicker
            dateFormat='dd.MM.yyyy'
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
          />
          <div id='endDateAlert'></div>
        </Form.Group>

        <Button className='w-100' variant='primary' type='submit'>Saglabāt līgumu</Button>

      </Form>
    </div>
  )
}

export default AddContract