import { ScheduleItem, Group } from './types';

let cachedData: any = null;

async function loadData() {
  if (!cachedData) {
    const res = await fetch("/schedule.json");
    cachedData = await res.json();
  }
  return cachedData;
}

export async function fetchGroups() {
  const data = await loadData();
  return data.groups;
}

export async function fetchSchedule(groupId: number) {
  const data = await loadData();
  return data.schedule.filter((item: any) => item.groupId === groupId);
} 
