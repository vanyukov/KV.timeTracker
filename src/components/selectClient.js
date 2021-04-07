import React from 'react';
import { Col, Form } from 'react-bootstrap';
import withStore from '~/hocs/withStore';

function SelectClient(props) {
  return (
    <Form.Control
      as='select'
      value={props.client}
      onChange={event => {
        props.change(event.target.value);
      }}
    >
      <option key={0} value={0}></option>
      {props.stores.Clients.items.map(item => (
        <option key={item.key} value={item.key}>
          {item.title}
        </option>
      ))}
    </Form.Control>
  );
}

export default withStore(SelectClient);
