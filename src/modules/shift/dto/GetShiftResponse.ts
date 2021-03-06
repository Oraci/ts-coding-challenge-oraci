export class GetShiftResponse {
  id: string;
  talentId: string;
  jobId: string;
  start: Date;
  end: Date;
  canceled: boolean;

  constructor(
    id: string,
    talentId: string,
    jobId: string,
    start: Date,
    end: Date,
    canceled: boolean,
  ) {
    this.id = id;
    this.talentId = talentId;
    this.jobId = jobId;
    this.start = start;
    this.end = end;
    this.canceled = canceled;
  }
}
