import { useState } from "react"
import classNames from "classnames"
import {
  Button, DatePicker, FormControlLabel, Switch, TextField,
} from "ui"
import { type TdateLib, dateLib } from "common/dateTime"
import { type TTrack } from "./types"
import style from "./TrackEditForm.module.scss"

type TrackEditFormProps = {
  track: TTrack
  handleSave: (track: TTrack) => void
  className?: string
}

export function TrackEditForm({
  track,
  handleSave,
  className,
}: TrackEditFormProps) {
  const [editTrack, setEditTrack] = useState({ ...track })

  return (
    <div className={classNames(className, style.wrap)}>
      <div className={style.row}>
        <div className={style.row}>
          <FormControlLabel
            label="active"
            labelPlacement="top"
            control={(
              <Switch
                checked={editTrack.active}
                onChange={() => {
                  setEditTrack({ ...editTrack, active: !editTrack.active })
                }}
              />
            )}
          />
          <FormControlLabel
            label="savedJira"
            labelPlacement="top"
            control={(
              <Switch
                checked={editTrack.savedJira}
                onChange={() => {
                  setEditTrack({
                    ...editTrack,
                    savedJira: !editTrack.savedJira,
                  })
                }}
              />
            )}
          />
        </div>
        <TextField value={track.id} disabled label="id" />
      </div>
      <div className={style.row}>
        <TextField
          value={editTrack.elapsedTime}
          onChange={event => {
            setEditTrack({ ...editTrack, elapsedTime: +event.target.value })
          }}
          type="number"
          label="elapsedTime"
        />
        <DatePicker
          value={dateLib(editTrack.date)}
          onChange={(newValue: TdateLib | null) => {
            setEditTrack({ ...editTrack, date: newValue?.toISOString() ?? "" })
          }}
          label="date"
        />
      </div>
      <div className={style.row}>
        <TextField
          value={editTrack.ticket}
          label="ticket"
          onChange={event => {
            setEditTrack({ ...editTrack, ticket: event.target.value })
          }}
        />
        <TextField
          value={editTrack.epic}
          onChange={event => {
            setEditTrack({ ...editTrack, epic: event.target.value })
          }}
          label="epic"
        />
      </div>
      <TextField
        value={editTrack.ticketTitle}
        onChange={event => {
          setEditTrack({ ...editTrack, ticketTitle: event.target.value })
        }}
        label="ticketTitle"
      />
      <TextField
        value={editTrack.comment}
        onChange={event => {
          setEditTrack({ ...editTrack, comment: event.target.value })
        }}
        multiline
        label="comment"
      />
      <Button
        variant="contained"
        onClick={() => {
          handleSave(editTrack)
        }}
      >
        Save
      </Button>
    </div>
  )
}

TrackEditForm.defaultProps = {
  className: "",
}
