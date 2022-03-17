import React, { useState } from 'react'
import { Button, Container, NavDropdown, Row, Col } from 'react-bootstrap'
import withStore from '~/hocs/withStore'
import { getDatePresentation } from '~/api/helpers/dateTime'
import ItemEditModal from '~/containers/ItemEditModal'
import tracks from '~/api/db/tracks'
import { Link, withRouter } from 'react-router-dom'
import Style from './Header.module.css'
import WeekNav from '~/containers/Header/WeekNav'
import * as navigation from '~/api/helpers/navigation'

function Header(props) {
  const [trackEdit, setTrackEdit] = useState(tracks.getNew())
  const [showPopup, setShowPopup] = useState(false)
  const createNewTrack = () => {
    props.stores.TracksStore.fillNewTrack(tracks.getNew()).then(
      (trackFilled) => {
        props.stores.TracksStore.start(trackFilled)
        setTrackEdit(trackFilled)
        setShowPopup(true)
      }
    )
  }

  return (
    <Container>
      <Row>
        <Col>
          <header className={'d-flex align-items-center'}>
            <Link to="/" className={'mr-2'}>
              <img src="/img/logo.png" className={Style.logo_img} />
            </Link>
            <Button variant="success" className="mr-2" onClick={createNewTrack}>
              New +
            </Button>

            {getDatePresentation(
              navigation.isYearInUrl() ? window.location.pathname : undefined
            )}

            <NavDropdown title="menu" id="header-nav-dropdown">
              <NavDropdown.Item as={'div'}>
                <Link to="/settings">Settings</Link>
              </NavDropdown.Item>
              <NavDropdown.Item as={'div'}>
                <Link to="/reports">Reports</Link>
              </NavDropdown.Item>
              <NavDropdown.Item as={'div'}>
                <Link to="/clients">Клиенты</Link>
              </NavDropdown.Item>
              <NavDropdown.Item as={'div'}>
                <Link to="/clientSites">Сайты клиентов</Link>
              </NavDropdown.Item>
              <NavDropdown.Item as={'div'}>
                <Link to="/comments">Сохраненные комментарии</Link>
              </NavDropdown.Item>
              <NavDropdown.Item as={'div'}>
                <Link to="/utzJobTypes">Типы работ УТЗ</Link>
              </NavDropdown.Item>
              <NavDropdown.Item as={'div'}>
                <Link to="/db">Операции с DB</Link>
              </NavDropdown.Item>
            </NavDropdown>
          </header>
        </Col>
      </Row>

      <WeekNav />

      <ItemEditModal
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        trackEdit={trackEdit}
        setTrackEdit={setTrackEdit}
      />
    </Container>
  )
}

export default withRouter(withStore(Header))
