import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'azure' | 'success' | 'warning' | 'outline';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
  icon,
}) => {
  const variantClass = {
    default: 'badge',
    azure: 'badge badge-azure',
    success: 'badge badge-success',
    warning: 'badge badge-warning',
    outline: 'badge badge-outline',
  }[variant];

  return (
    <span className={`${variantClass} ${className}`}>
      {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </span>
  );
};
