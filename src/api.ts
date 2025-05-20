import { ScheduleItem, Group } from './types';

const API_BASE = ''; // или вообще убери эту строку, если она не используется

export const fetchGroups = async (): Promise<Group[]> => {
    try {
        const response = await fetch('/api/groups');
        if (!response.ok) {
            throw new Error('Failed to fetch groups');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching groups:', error);
        throw error;
    }
};

export const fetchSchedule = async (groupId: number): Promise<ScheduleItem[]> => {
    try {
        const response = await fetch(`/api/schedule/${groupId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch schedule');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching schedule:', error);
        throw error;
    }
}; 
