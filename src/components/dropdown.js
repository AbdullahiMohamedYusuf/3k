import React from 'react';
import './dropdown.css'

function Dropdown() {
    return (
        <div>
            <div class="page">
                <div class="select-dropdown">
                    <select>
                        <option value="Brooklyn">All</option>

                        <option value="Brooklyn">Moské</option>
                        <option value="Manhattan">Resturang</option>
                        <option value="Queens">Kafé</option>
                        <option value="Brooklyn">Kaffebar</option>

                    </select>
                </div>
            </div>
        </div>
    )
}

export default Dropdown