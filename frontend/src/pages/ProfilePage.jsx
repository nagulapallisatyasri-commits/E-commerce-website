// frontend/src/pages/ProfilePage.jsx
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, MapPin, Camera, Trash2, 
  LogOut, Save, ShieldAlert, ArrowLeft, Loader2 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const { 
    user, 
    token, 
    loading, 
    updateProfile, 
    uploadAvatar, 
    deleteAvatar, 
    logout, 
    openLoginModal 
  } = useAuth();
  
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // React Hook Form initialization
  const { 
    register, 
    handleSubmit, 
    setValue,
    formState: { errors } 
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      address: ''
    }
  });

  // Hydrate form fields when user data is loaded
  useEffect(() => {
    if (user) {
      setValue('name', user.name || '');
      setValue('phone', user.phone || '');
      setValue('address', user.address || '');
    }
  }, [user, setValue]);

  // Form submission handler
  const onSubmit = async (data) => {
    setSaving(true);
    await updateProfile(data);
    setSaving(false);
  };

  // Avatar upload handler
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    setUploading(true);
    await uploadAvatar(formData);
    setUploading(false);
  };

  // Avatar delete handler
  const handleAvatarDelete = async () => {
    if (window.confirm('Are you sure you want to remove your profile picture?')) {
      setUploading(true);
      await deleteAvatar();
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-loading-container">
        <Loader2 className="animate-spin text-peach" size={36} />
        <p>Fetching your credentials...</p>
      </div>
    );
  }

  // Not Logged In State
  if (!token || !user) {
    return (
      <div className="profile-denied-container">
        <motion.div 
          className="profile-denied-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="denied-icon-wrap">
            <ShieldAlert size={38} className="denied-icon" />
          </div>
          <h2>Access Secure Area</h2>
          <p>Please log in or register to view your personal dashboard, edit details, and upload pictures.</p>
          <div className="denied-cta-row">
            <button onClick={openLoginModal} className="denied-login-btn">
              Login to Account
            </button>
            <Link to="/" className="denied-back-link">
              <ArrowLeft size={14} /> Back Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Avatar display logic
  const avatarUrl = user.profilePicture 
    ? `http://localhost:5000${user.profilePicture}` 
    : '';

  return (
    <div className="profile-page-container">
      <motion.div 
        className="profile-dashboard-grid"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Card - Picture & Quick Actions */}
        <div className="profile-card profile-sidebar-card">
          <div className="profile-avatar-section">
            <div className="avatar-wrapper">
              {avatarUrl ? (
                <img src={avatarUrl} alt={user.name} className="avatar-image" />
              ) : (
                <div className="avatar-placeholder">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
              )}
              {uploading && (
                <div className="avatar-loading-overlay">
                  <Loader2 className="animate-spin text-white" size={24} />
                </div>
              )}
              <label htmlFor="avatar-upload-input" className="avatar-upload-btn" title="Upload Photo">
                <Camera size={16} />
                <input 
                  id="avatar-upload-input" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleAvatarChange} 
                  style={{ display: 'none' }}
                />
              </label>
            </div>
            <h3>{user.name}</h3>
            <p className="profile-email-badge">
              <Mail size={12} /> {user.email}
            </p>
          </div>

          <div className="profile-avatar-actions">
            {user.profilePicture && (
              <button 
                onClick={handleAvatarDelete} 
                className="profile-avatar-delete-btn"
                disabled={uploading}
              >
                <Trash2 size={14} /> Remove Picture
              </button>
            )}
          </div>

          <div className="profile-sidebar-divider"></div>

          <button onClick={logout} className="profile-logout-btn">
            <LogOut size={16} /> Log Out
          </button>
        </div>

        {/* Right Card - Form & Details */}
        <div className="profile-card profile-main-card">
          <div className="profile-card-header">
            <h2>Personal Information</h2>
            <p>Update your details and shipping address for a smooth checkout.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="profile-edit-form">
            <div className="form-grid">
              {/* Name field */}
              <div className="form-field-group">
                <label>
                  <User size={14} /> Full Name
                </label>
                <input 
                  type="text" 
                  placeholder="Your full name"
                  className={errors.name ? 'input-error' : ''}
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <span className="field-error-msg">{errors.name.message}</span>}
              </div>

              {/* Email field (disabled) */}
              <div className="form-field-group">
                <label>
                  <Mail size={14} /> Email Address
                </label>
                <input 
                  type="email" 
                  value={user.email} 
                  disabled 
                  className="input-disabled"
                  title="Email cannot be changed"
                />
                <span className="field-hint-msg">Email cannot be modified.</span>
              </div>

              {/* Phone field */}
              <div className="form-field-group">
                <label>
                  <Phone size={14} /> Phone Number
                </label>
                <input 
                  type="tel" 
                  placeholder="Your phone number"
                  className={errors.phone ? 'input-error' : ''}
                  {...register('phone', {
                    pattern: {
                      value: /^[0-9+\s-]{8,15}$/,
                      message: 'Please enter a valid phone number'
                    }
                  })}
                />
                {errors.phone && <span className="field-error-msg">{errors.phone.message}</span>}
              </div>

              {/* Address field */}
              <div className="form-field-group full-width">
                <label>
                  <MapPin size={14} /> Shipping Address
                </label>
                <textarea 
                  placeholder="Street, City, State, ZIP Code"
                  rows={4}
                  className={errors.address ? 'input-error' : ''}
                  {...register('address', { maxLength: { value: 250, message: 'Address is too long' } })}
                />
                {errors.address && <span className="field-error-msg">{errors.address.message}</span>}
              </div>
            </div>

            <button type="submit" className="profile-save-btn" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="animate-spin" size={16} /> Saving...
                </>
              ) : (
                <>
                  <Save size={16} /> Save Changes
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
