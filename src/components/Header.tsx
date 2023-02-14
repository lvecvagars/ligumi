import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

interface IHeader {
  title: string;
  onClick: () => void;
  showAddContract: boolean;
}

const Header: React.FC<IHeader> = (props: IHeader) => {
  return (
    <Row>
      <Col md={4} className='pe-0'></Col>
      <Col xs={10} md={4} className='p-md-0 text-md-center'>
        <h2 className='mb-0'>{props.title}</h2>
      </Col>
      <Col xs={2} md={4} className='ps-0'>
        <Button className='float-end' variant='secondary' onClick={props.onClick}>
          {props.showAddContract ? 'Apskatīt' : 'Pievienot'}
        </Button>
      </Col>
    </Row>
  )
}

export default Header