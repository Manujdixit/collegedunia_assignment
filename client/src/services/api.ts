const API_URL = import.meta.env.VITE_BASE_URL
console.log(API_URL);


export const api = {
  auth: {
    login: async (email: string, password: string) => {
      const response = await fetch(`${API_URL}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      return response.json();
    },
    register: async (name: string, email: string, password: string) => {
      const response = await fetch(`${API_URL}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      return response.json();
    },
  },
  notes: {
    getAll: async (token: string) => {
      const response = await fetch(`${API_URL}/note`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.json();
    },
    create: async (token: string, data: { title: string; content: string; category: string }) => {
      const response = await fetch(`${API_URL}/note`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    update: async (token: string, id: string, data: { title: string; content: string; category: string }) => {
      const response = await fetch(`${API_URL}/note/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    delete: async (token: string, id: string) => {
      const response = await fetch(`${API_URL}/note/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.json();
    },
  },
  user: {
    updateProfile: async (token: string, data: {
      name?: string;
      about?: string;
    }) => {
      const response = await fetch(`${API_URL}/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      return response.json();
    },
  },
};