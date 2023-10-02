import { useState } from "react"
import { useNavigate } from "react-router-dom"
import classNames from "classnames"
import {
  Button,
  DatePicker,
  FormControlLabel,
  Switch,
  TextField,
  TimeMaskInput,
} from "ui"
import { type TdateLib, dateLib, getElapsedTimeFormat } from "common/dateTime"
import { type TTrack } from "./types"
import style from "./TrackEditForm.module.scss"
import { TrackSubMenu } from "./TrackSubMenu"

type TrackEditFormProps = {
  track: TTrack
  handleSave: (track: TTrack) => void
  className?: string
}

function revertFromMaskToTime(value: string) {
  const time = value.split(":")
  return (+time[0] * 60 + (+time[1] || 0)) * 60 * 1000
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
                checked={editTrack.active}
                onChange={() => {
                  setEditTrack({ ...editTrack, active: !editTrack.active })
                }}
              />
            )}
          />
        </div>
        <TextField value={track.id} disabled label="id" />
      </div>
      <div className={style.row}>
        <TimeMaskInput
          label="elapsedTime"
          value={getElapsedTimeFormat(editTrack)}
          onUpdate={val => {
            const elapsedTime = revertFromMaskToTime(val)
            if (editTrack.active) {
              setEditTrack({
                ...editTrack,
                startTime: new Date(Date.now() - elapsedTime).toISOString(),
                elapsedTime: 0,
              })
            } else {
              setEditTrack({ ...editTrack, elapsedTime })
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
