import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-muted py-6">
      <div className="container mx-auto px-4 md:px-6 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Portfolio Pilot. All rights reserved.</p>
        <p className="mt-1">Designed with passion and code.</p>
      </div>
    </footer>
  );
}
