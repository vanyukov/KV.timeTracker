import { useState } from "react"
import { useNavigate } from "react-router-dom"
import classNames from "classnames"
import {
  Button,
  DatePicker,
  FormControlLabel,
  Switch,
  TextField,
  TimePicker,
} from "ui"
import { type TdateLib, dateLib, getTrackElapsedTime } from "common/dateTime"
import { type TTrack } from "../types"
import { TrackSubMenu } from "./TrackSubMenu"
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
  const navigate = useNavigate()

  return (
    <div className={classNames(className, style.wrap)}>
      <div className={style.row}>
        <div className={style.row}>
          <FormControlLabel
            label="active"
            labelPlacement="top"
            control={(
              <Switch
                checked={Boolean(editTrack.active)}
                onChange={() => {
                  if (editTrack.active) {
                    // switch to unactive
                    editTrack.elapsedTime += +new Date() - (+new Date(editTrack.startTime));
                  } else {
                    // switch to active
                    editTrack.startTime = new Date().toISOString()
                  }
                  setEditTrack({ ...editTrack, active: editTrack.active ? 0 : 1 })
                }}
              />
            )}
          />
        </div>
        <TextField value={track.id} disabled label="id" />
      </div>
      <div className={style.row}>
        <TimePicker
          label="elapsedTime"
          views={["hours", "minutes"]}
          ampm={false}
          value={getTrackElapsedTime(editTrack)}
          onChange={(newValue: TdateLib | null) => {
            if (!newValue) {
              return
            }
            if (editTrack.active) {
              setEditTrack({
                ...editTrack,
                startTime: dateLib(dateLib().valueOf() - newValue.valueOf()).utc().toISOString(),
                elapsedTime: 0,
              })
            } else {
              setEditTrack({ ...editTrack, elapsedTime: newValue?.valueOf() ?? 0 })
            }
          }}
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
      <div className="flex">
        <Button
          variant="contained"
          className="w100"
          onClick={() => {
            handleSave(editTrack)
          }}
        >
          Save
        </Button>
        <TrackSubMenu
          id={track.id}
          onDelete={() => {
            navigate(-1)
          }}
        />
      </div>
    </div>
  )
}

TrackEditForm.defaultProps = {
  className: "",
}
