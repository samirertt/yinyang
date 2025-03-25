const API_URL = 'http://localhost:8080/api';

export interface User {
    userId: number;
    username: string;
    password?: string;
    role: string;
    joinDate: string;
    image?: string; // Base64 encoded image
}

export const adminService = {
    getAllUsers: async (): Promise<User[]> => {
        try {
            console.log('Fetching users from:', `${API_URL}/admin/users`);
            const response = await fetch(`${API_URL}/admin/users`, {
                credentials: 'include' // Include cookies if any
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Received users:', data);
            return data;
        } catch (error) {
            console.error('Error in getAllUsers:', error);
            throw error;
        }
    },

    toggleUserRole: async (userId: number): Promise<User> => {
        try {
            console.log('Toggling role for user:', userId);
            const response = await fetch(`${API_URL}/admin/users/${userId}/role`, {
                method: 'PUT',
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Role toggle response:', data);
            return data;
        } catch (error) {
            console.error('Error in toggleUserRole:', error);
            throw error;
        }
    },

    getUserImage: async (userId: number): Promise<string> => {
        try {
            console.log('Fetching image for user:', userId);
            const response = await fetch(`${API_URL}/admin/users/${userId}/image`, {
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const arrayBuffer = await response.arrayBuffer();
            const base64 = btoa(
                new Uint8Array(arrayBuffer)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            return `data:image/jpeg;base64,${base64}`;
        } catch (error) {
            console.error('Error in getUserImage:', error);
            return "https://www.freeiconspng.com/uploads/computer-user-icon-28.png";
        }
    }
}; 