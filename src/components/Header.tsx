import React from "react";

interface Props {}

const Header: React.FC<Props> = props => {
  return (
    <div className="flex justify-start bg-blue-400 shadow-md p-3">
      <span className="text-white font-medium text-lg">Trello</span>
    </div>
  );
};

export default Header;
