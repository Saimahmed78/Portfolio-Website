import React from 'react';

export const FormInput = React.forwardRef(({ label, error, className = "", ...props }, ref) => (
  <div className="form-group">
    {label && <label className="form-label">{label}</label>}
    <input
      ref={ref}
      className={`form-input ${error ? 'border-red-500' : ''} ${className}`}
      {...props}
    />
    {error && <span style={{ color: 'var(--accent-danger)', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{error}</span>}
  </div>
));

export const FormSelect = React.forwardRef(({ label, error, children, className = "", ...props }, ref) => (
  <div className="form-group">
    {label && <label className="form-label">{label}</label>}
    <select
      ref={ref}
      className={`form-input ${error ? 'border-red-500' : ''} ${className}`}
      {...props}
    >
      {children}
    </select>
    {error && <span style={{ color: 'var(--accent-danger)', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{error}</span>}
  </div>
));

export const FormTextarea = React.forwardRef(({ label, error, className = "", ...props }, ref) => (
  <div className="form-group">
    {label && <label className="form-label">{label}</label>}
    <textarea
      ref={ref}
      className={`form-input ${error ? 'border-red-500' : ''} ${className}`}
      {...props}
    />
    {error && <span style={{ color: 'var(--accent-danger)', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{error}</span>}
  </div>
));
