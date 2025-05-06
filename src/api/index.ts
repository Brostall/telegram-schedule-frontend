import axios from "axios";
import { Group, Schedule } from "../types";

const API_URL = "http://localhost:5037/api";

export const fetchGroups = async (): Promise<Group[]> => {
  const res = await axios.get(`${API_URL}/groups`);
  return res.data;
};

export const fetchSchedule = async (groupId: number): Promise<Schedule> => {
  const res = await axios.get(`${API_URL}/schedule/${groupId}`);
  return res.data;
};
