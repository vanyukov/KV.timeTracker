import React from 'react'
import { useHistory } from 'react-router-dom'
import withStore from '~/hocs/withStore'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'

function ClientSites(props) {
  const history = useHistory()
  const goBack = () => {
    history.goBack()
  }

  const loadDefault = () => props.stores.ClientSites.loadDefault()

  return (
    <Container>
      <h1 className={'mt-2'}>
        Сайты клиентов
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
        <Row className={'mb-2'}>
          <Col sm={2}>
            <Form.Control value={'Клиент'} type="text" disabled={true} />
          </Col>
          <Col sm={2}>
            <Form.Control value={'url'} type="text" disabled={true} />
          </Col>
          <Col sm={2}>
            <Form.Control value={'title'} type="text" disabled={true} />
          </Col>
          <Col sm={3}> </Col>
        </Row>
        {props.stores.ClientSites.items.map((item) => {
          return (
            <Form.Group as={Row} controlId="formHorizontal" key={item.key}>
              <Col sm={2}>
                <Form.Control
                  value={item.clientId}
                  onChange={() => {}}
                  type="text"
                />
              </Col>
              <Col sm={2}>
                <Form.Control
                  value={item.url}
                  onChange={() => {}}
                  type="text"
                />
              </Col>
              <Col sm={2}>
                <Form.Control
                  value={item.title}
                  onChange={() => {}}
                  type="text"
                />
              </Col>
              <Col sm={3}>
                <Button
                  variant="primary"
                  size="sm"
                  className={'mr-2'}
                  onClick={() => props.stores.ClientSites.saveClient(item)}
                >
                  Save
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => props.stores.ClientSites.deleteClient(item)}
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
              onClick={() => props.stores.ClientSites.newClient()}
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
export default withStore(ClientSites)
