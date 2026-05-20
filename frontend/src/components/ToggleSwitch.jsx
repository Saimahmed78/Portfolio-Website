import React from 'react';

export const ToggleSwitch = ({ enabled, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!enabled)}
    style={{
      width: '44px',
      height: '24px',
      borderRadius: '12px',
      background: enabled ? 'var(--accent-primary)' : 'var(--bg-surface)',
      position: 'relative',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    }}
  >
    <div
      style={{
        width: '18px',
        height: '18px',
        borderRadius: '50%',
        background: 'white',
        position: 'absolute',
        top: '3px',
        left: enabled ? '23px' : '3px',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }}
    />
  </button>
);
