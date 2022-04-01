import React, { useEffect, useState } from 'react'
import ItemLine from '~/pages/Day/ItemLine'
import withStore from '~/hocs/withStore'
import { Container } from 'react-bootstrap'
import ItemEditModal from '~/pages/ItemEditModal'
import tracks from '~/api/db/tracks'
import ElapsedTime from '~/components/ ElapsedTime'
import * as dateTime from '~/api/helpers/dateTime'

function Day(props) {
  const [trackEdit, setTrackEdit] = useState(tracks.getNew())
  const [showPopup, setShowPopup] = useState(false)
  const [utzDay, setUtzDay] = useState(null)
  const openPopupTrackEdit = (track) => {
    setTrackEdit(track)
    setShowPopup(true)
  }
  const tabJiraTicket =
    props.stores.chromeStore.isJiraTab &&
    props.stores.chromeStore.getFieldFromJira('ticket')

  useEffect(() => {
    if (props.stores.chromeStore.isUtzTab) {
      props.stores.chromeStore.getFieldFromUtz('date').then((result) => {
        if (result) {
          setUtzDay(result[0])
        }
      })
    }
  }, [props.stores.chromeStore.isUtzTab])

  let lineNumber = 1

  return (
    <Container>
      {props.stores.TracksStore.tracksOfDay(props.match.params)
        .sort((a, b) => b.date - a.date)
        .map((track) => (
          <ItemLine
            key={track.date}
            lineNumber={lineNumber++}
            track={track}
            stop={() => props.stores.TracksStore.stop(track.date)}
            start={() => props.stores.TracksStore.start(track)}
            edit={() => openPopupTrackEdit(track)}
            delete={() => props.stores.TracksStore.delete(track.date)}
            showSaveJira={tabJiraTicket == track.ticket && track.ticket}
            showSaveUTZ={utzDay == dateTime.getFormat('DD.MM.YYYY', track.date)}
            saveJira={() => {
              props.stores.chromeStore.saveJira(track)
              props.stores.TracksStore.update({
                ...track,
                savedJira: true,
              })
            }}
            saveUTZ={() => {
              props.stores.chromeStore.saveUTZ(track)
              props.stores.TracksStore.update({
                ...track,
                savedUTZ: true,
              })
            }}
          />
        ))}

      <div className="d-flex justify-content-start">
        <span className={'mr-1'}>Итого: </span>
        <ElapsedTime
          startTime={0}
          endTime={0}
          elapsedTime={props.stores.TracksStore.tracksOfDay(
            props.match.params
          ).reduce(
            (sum, track) =>
              (sum +=
                track.elapsedTime +
                (track.active ? new Date() - track.startTime : 0)),
            0
          )}
        />
      </div>

      <ItemEditModal
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        trackEdit={trackEdit}
        setTrackEdit={setTrackEdit}
      />
    </Container>
  )
}

export default withStore(Day)
