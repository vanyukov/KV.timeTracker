import { useState } from "react"
import { useNavigate } from "react-router-dom"
import classNames from "classnames"
import {
  Button,
  DatePicker,
  TextField,
  TimePicker,
} from "ui"
import { SelectClient } from "widget"
import { type TdateLib, dateLib, getTrackElapsedTime } from "common/dateTime"
import { type TTrack } from "../types"
import { TrackSubMenu } from "./TrackSubMenu"
import { BtnStartStopTrack } from "./BtnStartStopTrack"
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
      <div className={style.row}>
        <div className={style.row}>
          <BtnStartStopTrack track={track} />
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
            setEditTrack({
              ...editTrack,
              startTime: new Date().toISOString(),
              elapsedTime: newValue?.valueOf() ?? 0,
            })
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
      <SelectClient
        value={track.clientId}
        label="client"
        handleChange={event => {
          if (!event.target.value) {
            return
          }
          setEditTrack({ ...editTrack, clientId: event.target.value as string })
        }}
      />
      <TextField
        value={editTrack.comment}
        onChange={event => {
          setEditTrack({ ...editTrack, comment: event.target.value })
        }}
        multiline
        label="comment"
      />
    </div>
  )
}

TrackEditForm.defaultProps = {
  className: "",
}
