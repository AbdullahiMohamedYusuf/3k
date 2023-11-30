import React from "react";

function Head() {
  return (
    <div>
      <nav>
        <div class="container">
          <div class="menu">
            <i class="fa-sharp fa-light fa-utensils"></i>
            <ul>
              <li>
                <a href="#">Resturant</a>
              </li>
              <li>
                <a href="#">Shops</a>
              </li>
              <li>
                <a href="#">Moskés</a>
              </li>
            </ul>
          </div>
          <div class="buttons">
            <button>
              <a href="/login">Login</a>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Head;
