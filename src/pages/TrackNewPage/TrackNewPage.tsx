import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import { jiraFillTrack } from "api/jira";
import { makeDayLink } from "common/dateTime";
import { MainLayout } from "layout";
import { type TTrack, tracksAddNew, TrackEditForm, tracksDB } from "feature/Tracks";
import { useAuthUser } from "feature/Auth";
import { Typography } from "ui";

export function TrackNewPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAuthUser();
  const [track, setTrack] = useState(tracksDB.getNew(user?.email ?? "local"));
  useEffect(() => {
    void jiraFillTrack(track).then(res => {
      setTrack(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlerAddNew = useCallback(
    (editTrack: TTrack) => {
      void dispatch(tracksAddNew(editTrack));
      navigate(makeDayLink(editTrack.date));
    },
    [dispatch, navigate],
  );

  return (
    <MainLayout>
      <div className="container">
        <Typography variant="h4" component="p" className="pb12">
          Add new track
        </Typography>
        <TrackEditForm track={track} handleSave={handlerAddNew} />
      </div>
    </MainLayout>
  );
}
