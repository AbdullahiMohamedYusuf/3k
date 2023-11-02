import React from "react";
import "./login.css";
function Sign() {
  return (
    <main>
      <div className="LoginContainer">
        <div className="header">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="#">Resturant</a>
            </li>
            <li>
              <a href="#">Moské</a>
            </li>
          </ul>
          <button>
            <a href="/login">Login</a>
          </button>
        </div>
        <div className="title2">
          <h2>Sign up</h2>
          <div className="line2"></div>
        </div>
        <div class="container5">
          <div class="screen">
            <div class="screen__content">
              <form class="login">
                <div class="login__field">
                  <i class="login__icon fas fa-user"></i>
                  <input
                    type="text"
                    class="login__input"
                    placeholder=" Username"
                    name="username"
                  />
                </div>
                <div class="login__field">
                  <i class="login__icon fas fa-user"></i>
                  <input
                    type="email"
                    class="login__input"
                    placeholder=" Email"
                    name="email"
                  />
                </div>
                <div class="login__field">
                  <i class="login__icon fas fa-lock"></i>
                  <input
                    type="password"
                    class="login__input"
                    placeholder="Password"
                  />
                </div>
                <button class="button login__submit">
                  <span class="button__text">Sign Up Now</span>
                  <i class="button__icon fas fa-chevron-right"></i>
                </button>
              </form>
              <div class="social-login">
                <h3>Follow us on</h3>
                <div class="social-icons">
                  <a href="#" class="social-login__icon fab fa-instagram"></a>
                  <a href="#" class="social-login__icon fab fa-facebook"></a>
                  <a href="#" class="social-login__icon fab fa-twitter"></a>
                </div>
              </div>
            </div>
            <div class="screen__background">
              <span class="screen__background__shape screen__background__shape4"></span>
              <span class="screen__background__shape screen__background__shape3"></span>
              <span class="screen__background__shape screen__background__shape2"></span>
              <span class="screen__background__shape screen__background__shape1"></span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Sign;
