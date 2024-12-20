import Icon from "@/components/ui/Icon";
import React, { useEffect, useState } from 'react';

const VerifiedIcon = () => {
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(tick => tick + 1); // Increment tick to force re-render
    }, 3000); // Reload every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return <Icon icon="line-md:check-all" key={Math.random()} />;
};

export default VerifiedIcon;
