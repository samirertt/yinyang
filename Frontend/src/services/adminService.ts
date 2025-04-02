import axios from 'axios';

const API_URL = 'http://localhost:8080';

export interface User {
    userId: number;
    username: string;
    role: string;
    userImg?: string;
}

const token = localStorage.getItem('jwtToken');

export const adminService = {
    getAllUsers: async (): Promise<User[]> => {
        const response = await axios.get(`${API_URL}/admin/users`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    },

    toggleUserRole: async (userId: number): Promise<User> => {
        const response = await axios.put(`${API_URL}/admin/users/${userId}/toggle-role`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    }
}; 