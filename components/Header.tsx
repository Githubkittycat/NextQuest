import React from 'react';

interface HeaderProps {
  title: string;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, children }) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-extrabold text-light-text tracking-tight">{title}</h1>
      {children && <p className="text-subtle-text mt-1">{children}</p>}
    </div>
  );
};

export default Header;