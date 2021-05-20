import React from 'react'
import { useHistory } from 'react-router-dom'
import withStore from '~/hocs/withStore'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'

function Clients(props) {
  const history = useHistory()
  const goBack = () => {
    history.goBack()
  }

  const loadDefault = () => props.stores.Clients.loadDefault()

  return (
    <Container>
      <h1 className={'mt-2'}>
        Клиенты
        <Button
          variant="outline-secondary"
          size="sm"
          className={'ml-3'}
          onClick={goBack}
        >
          go back
        </Button>
      </h1>
      <Form className={'mb-2'}>
        <Row>
          <Col className={'mb-2'}>
            <Form.Control value={'Название'} type="text" disabled={true} />
          </Col>
          <Col sm={2}>
            <Form.Control value={'id'} type="text" disabled={true} />
          </Col>
          <Col sm={2}>
            <Form.Control value={'taskCode'} type="text" disabled={true} />
          </Col>
          <Col sm={2}>
            <Form.Control value={'taskIdCr'} type="text" disabled={true} />
          </Col>
          <Col sm={3}> </Col>
        </Row>
        {props.stores.Clients.items.map((item) => {
          return (
            <Form.Group as={Row} controlId="formHorizontalEmail" key={item.key}>
              <Col>
                <Form.Control
                  value={item.title}
                  as={'textarea'}
                  onChange={() => {}}
                  type="text"
                />
              </Col>
              <Col sm={2}>
                <Form.Control value={item.id} onChange={() => {}} type="text" />
              </Col>
              <Col sm={2}>
                <Form.Control
                  value={item.taskCode}
                  onChange={() => {}}
                  type="text"
                />
              </Col>
              <Col sm={2}>
                <Form.Control
                  value={item.taskIdCr}
                  onChange={() => {}}
                  type="text"
                />
              </Col>
              <Col sm={3}>
                <Button
                  variant="primary"
                  size="sm"
                  className={'mr-2'}
                  onClick={() => props.stores.Clients.saveClient(item)}
                >
                  Save
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => props.stores.Clients.deleteClient(item)}
                >
                  del
                </Button>
              </Col>
            </Form.Group>
          )
        })}
        <Row className={'mb-2'}>
          <Col>
            <Button
              variant="success"
              size="sm"
              onClick={() => props.stores.Clients.newClient()}
            >
              New +
            </Button>
          </Col>
        </Row>
        <Row>
          <Button variant="outline-secondary" size="sm" onClick={loadDefault}>
            load default
          </Button>
        </Row>
      </Form>
    </Container>
  )
}
export default withStore(Clients)
