import React from 'react';
import './dropdown.css'

function Dropdown({ onChange }) {
  const handleDropdownChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="drop">
      <div class="page">
        <div class="select-dropdown">
          <select onChange={handleDropdownChange}>
            <option value="All">All</option>
            <option value="Moské">Moské</option>
            <option value="Resturang">Resturang</option>
            <option value="Kafé">Kafé</option>
            <option value="Kaffebar">Kaffebar</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
