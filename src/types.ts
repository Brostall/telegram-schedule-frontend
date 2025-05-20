export interface Group {
    id: number;
    name: string;
}

export interface ScheduleItem {
    id: number;
    groupId: number;
    dayOfWeek: string;
    time: number;
    subject: string;
    lastUpdated: string;
}

export type Schedule = ScheduleItem[]; 