import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  users: User[];
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  registerUser: (username: string, password: string, role: 'admin' | 'user') => Promise<boolean>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean, message: string }>;
  editUser: (id: number, updatedData: { username: string; role: 'admin' | 'user' }) => Promise<{ success: boolean; message: string }>;
  toggleUserStatus: (id: number) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialUsers: User[] = [
  { id: 1, username: 'admin', password: '123456', role: 'admin', isEnabled: true },
  { id: 2, username: 'user', password: 'password', role: 'user', isEnabled: true },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : initialUsers;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
      const storedUser = sessionStorage.getItem('currentUser');
      if (storedUser) {
          const user: User = JSON.parse(storedUser);
          const userExists = users.find(u => u.id === user.id);
          return userExists ? user : null;
      }
      return null;
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const login = async (username: string, password: string): Promise<boolean> => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user && user.isEnabled) {
      const { password: _, ...userToStore } = user;
      setCurrentUser(userToStore);
      sessionStorage.setItem('currentUser', JSON.stringify(userToStore));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('currentUser');
    navigate('/login');
  };

  const registerUser = async (username: string, password: string, role: 'admin' | 'user'): Promise<boolean> => {
    if (users.some(u => u.username === username)) {
      return false; // Usuário já existe
    }
    const newUser: User = {
      id: Date.now(),
      username,
      password,
      role,
      isEnabled: true,
    };
    setUsers(prevUsers => [...prevUsers, newUser]);
    return true;
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<{ success: boolean, message: string }> => {
    if (!currentUser) {
      return { success: false, message: 'Nenhum usuário logado.' };
    }
    
    const userInDataStore = users.find(u => u.id === currentUser.id);

    if (userInDataStore?.password !== currentPassword) {
      return { success: false, message: 'Senha atual incorreta.' };
    }

    setUsers(prevUsers =>
      prevUsers.map(u =>
        u.id === currentUser.id ? { ...u, password: newPassword } : u
      )
    );
    
    return { success: true, message: 'Senha alterada com sucesso!' };
  };

  const editUser = async (id: number, updatedData: { username: string; role: 'admin' | 'user' }): Promise<{ success: boolean; message: string }> => {
    if (users.some(u => u.username === updatedData.username && u.id !== id)) {
        return { success: false, message: 'Este nome de usuário já está em uso.' };
    }

    setUsers(prevUsers =>
      prevUsers.map(u =>
        u.id === id ? { ...u, ...updatedData } : u
      )
    );

    if (currentUser?.id === id) {
        const updatedCurrentUser = { ...currentUser, ...updatedData };
        setCurrentUser(updatedCurrentUser);
        sessionStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
    }
    return { success: true, message: 'Usuário atualizado com sucesso!' };
  };

  const toggleUserStatus = (id: number) => {
    setUsers(prevUsers =>
      prevUsers.map(u =>
        u.id === id ? { ...u, isEnabled: !u.isEnabled } : u
      )
    );
  };

  return (
    <AuthContext.Provider value={{ currentUser, users, login, logout, registerUser, changePassword, editUser, toggleUserStatus }}>
      {children}
    </AuthContext.Provider>
  );
};