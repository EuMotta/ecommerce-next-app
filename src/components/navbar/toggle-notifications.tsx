import React from 'react';

import { Bell } from 'lucide-react';

import { Button } from '../ui/button';

const ToggleNotifications = ({ ...props }) => {
  return (
    <Button variant="outline" size="icon" className="h-8 w-8" {...props}>
      <Bell className="h-4 w-4" />
      <span className="sr-only">Toggle notifications</span>
    </Button>
  );
};

export default ToggleNotifications;
