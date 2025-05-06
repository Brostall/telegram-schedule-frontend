export interface Group {
  id: number;
  name: string;
}

export interface ScheduleItem {
  dayOfWeek: string;
  time: number;
  subject: string;
}

export type Schedule = ScheduleItem[];
