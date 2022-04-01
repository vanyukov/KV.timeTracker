import { observable, action } from "mobx";
import StoreClass from "../StoreClass";
import tracks from "~/api/db/tracks";
import * as dateTime from "~/api/helpers/dateTime";

export default class TracksStore extends StoreClass {
  constructor(rootStore) {
    super(rootStore);
    this.table = "tracks";
    this.api = this.rootStore.api.tracks;
  }

  @action start = (track = tracks.getNew()) => {
    this.items
      .filter(item => item.active)
      .forEach(track => {
        this.stop(track.date);
      });
    if (!track.active) {
      track = this.items.find(item => item.date == track.date);
      track.active = true;
      track.startTime = new Date();
    } else {
      this.items.push(track);
    }
    return this.rootStore.dbStore.saveTableRow(this.table, track);
  };

  @action stop = date => {
    this.items
      .filter(item => item.date == date)
      .map(track => {
        track.active = false;
        track.elapsedTime += new Date() - track.startTime;
        this.rootStore.dbStore.deleteTableRow(this.table, date);
        this.rootStore.dbStore.saveTableRow(this.table, track);
      });
  };

  @action delete = date => {
    this.items = this.items.filter(item => item.date != date);
    this.rootStore.dbStore.deleteTableRow(this.table, date);
  };

  @action loadTracks = data => {
    this.rootStore.dbStore.loadTableRows(this.table).then(data => {
      if (!Array.isArray(data)) {
        return null;
      }
      data.forEach(item => {
        const newLine = {};
        const track = tracks.getNew();
        for (let field in track) {
          newLine[field] = item[field];
        }
        this.items.push(newLine);
      });
    });
  };

  @action update = track => {
    const itemStore = this.items.find(item => item.date == track.date);
    for (let key in track) {
      itemStore[key] = track[key];
    }
    this.rootStore.dbStore.deleteTableRow(this.table, itemStore.date);
    this.rootStore.dbStore.saveTableRow(this.table, track);
  };

  @action fillNewTrack = track => {
    return Promise.all([
      this.rootStore.chromeStore.getFieldFromJira("ticket"),
      this.rootStore.chromeStore.getFieldFromJira("title"),
      this.rootStore.chromeStore.getFieldFromJira("branch"),
      this.rootStore.chromeStore.getFieldFromJira("epic"),
    ]).then(results => {
      if (results[0]) {
        track.ticket = results[0];
      }
      if (results[1]) {
        track.ticketTitle = results[1];
      }
      if (results[2]) {
        track.branch = results[2];
      } else if (results[0]) {
        track.branch = results[0];
      }
      if (results[3]) {
        track.epic = results[3];
      }
      track.client = this.rootStore.Settings.getSetting('defaultClient');
      const defaultCommentId = this.rootStore.Settings.getSetting('defaultComment');
      const defaultComment = this.rootStore.Comments.items.find(item=>item.id===defaultCommentId);
      track.comment = defaultComment.text
      track.idUTZ = defaultComment.idUTZ;
      return track;
    });
  };

  tracksOfDay = params => {
    let filterDate = "";
    if (params.day) {
      const month = String(params.month).padStart(2, "0");
      const day = String(params.day).padStart(2, "0");
      filterDate = `${params.year}-${month}-${day}`;
    } else {
      filterDate = dateTime.getFormat("YYYY-MM-DD");
    }
    return this.items.filter(
      item => dateTime.getFormat("YYYY-MM-DD", item.date) == filterDate
    );
  };
}
