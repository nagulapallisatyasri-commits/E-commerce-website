// frontend/src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('shopvibe_token') || '');
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' or 'register'

  // Configure axios defaults
  axios.defaults.baseURL = 'http://localhost:5000/api';
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }

  // Fetch profile when token changes or on mount
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const res = await axios.get('/profile');
        setUser(res.data);
      } catch (error) {
        console.error('Session expired or error fetching profile:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await axios.post('/auth/login', { email, password });
      const { token: userToken, user: userData } = res.data;
      
      localStorage.setItem('shopvibe_token', userToken);
      setToken(userToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
      
      // Fetch full profile to get phone, address, and profilePicture
      const profileRes = await axios.get('/profile');
      setUser(profileRes.data);
      
      toast.success(`Welcome back, ${userData.name}!`);
      setIsAuthModalOpen(false);
      return true;
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Login failed';
      toast.error(errorMsg);
      return false;
    }
  };

  const register = async (name, email, password) => {
    try {
      await axios.post('/auth/register', { name, email, password });
      toast.success('Registration successful! Please login.');
      setAuthModalMode('login');
      return true;
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Registration failed';
      toast.error(errorMsg);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('shopvibe_token');
    setToken('');
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
    toast.success('Logged out successfully');
  };

  const updateProfile = async (data) => {
    try {
      const res = await axios.put('/profile', data);
      setUser(res.data);
      toast.success('Profile updated successfully!');
      return true;
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Failed to update profile';
      toast.error(errorMsg);
      return false;
    }
  };

  const uploadAvatar = async (formData) => {
    try {
      const res = await axios.post('/profile/upload-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUser(prev => ({
        ...prev,
        profilePicture: res.data.profilePicture
      }));
      toast.success('Profile picture updated!');
      return true;
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Failed to upload profile picture';
      toast.error(errorMsg);
      return false;
    }
  };

  const deleteAvatar = async () => {
    try {
      await axios.delete('/profile/avatar');
      setUser(prev => ({
        ...prev,
        profilePicture: ''
      }));
      toast.success('Profile picture removed!');
      return true;
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Failed to delete profile picture';
      toast.error(errorMsg);
      return false;
    }
  };

  const openLoginModal = () => {
    setAuthModalMode('login');
    setIsAuthModalOpen(true);
  };

  const openRegisterModal = () => {
    setAuthModalMode('register');
    setIsAuthModalOpen(true);
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      isAuthModalOpen,
      setIsAuthModalOpen,
      authModalMode,
      setAuthModalMode,
      login,
      register,
      logout,
      updateProfile,
      uploadAvatar,
      deleteAvatar,
      openLoginModal,
      openRegisterModal
    }}>
      {children}
    </AuthContext.Provider>
  );
};
