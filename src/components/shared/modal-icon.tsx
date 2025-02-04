import React from "react";
import { Icon } from "@iconify/react";

const ModalIcon = ({ icon }: { icon: string }): React.ReactNode => {
  return (
    <div className="absolute top-0 left-0 w-9 h-9 bg-yellow-400 rounded-br-full">
      <Icon
        icon={icon}
        className="absolute top-1.5 left-1.5 text-lg text-zinc-800"
      />
    </div>
  );
};

export default React.memo(ModalIcon);
