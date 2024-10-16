import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <header className="Header">
        <div className="Header--top">
          <div className="Header--logo">
            <a className="Logo" href="/">
              <img src="./uzh_logo.svg" alt="Universität Zürich" width="208" height="92" />
            </a>
          </div>
          <h2 className="Header--department">Quassel</h2>
        </div>

        <nav className="MainNav--inner">
          <ul className="MainNav--list">
            <li className="MainNav--list--item">
              <Link to="/" className="MainNav--link">
                Home
              </Link>
            </li>
            <li className="MainNav--list--item">
              <Link to="/about" className="MainNav--link">
                About
              </Link>
            </li>
          </ul>
        </nav>

        <div className="MainNav">
          <div className="MainNav--service">
            <nav className="ServiceNav">
              <ul className="ServiceNav--list">
                <li className="ServiceNav--list--item">
                  <a className="ServiceNav--link" href="">
                    English
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </>
  ),
});
