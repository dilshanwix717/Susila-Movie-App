import { memo, Fragment, useState, useEffect, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom"; // Combined react-router-dom imports
import { Button, Nav, Form, FormControl, Collapse, Navbar, Offcanvas, Container, Dropdown } from "react-bootstrap"; // React-bootstrap imports
import Logo from "../logo";
import CustomToggle from "../CustomToggle";
import { useTranslation } from "react-i18next"; // Translation hook
import { auth } from "../../firebase";
import img2 from "/assets/images/Susila.png";
import { AiOutlineSearch } from "react-icons/ai"; // Importing the search icon

const HeaderDefault = memo(() => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [isMega, setIsMega] = useState(true);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false); // Track if the dropdown is open

  //for translation
  const { t, i18n } = useTranslation();

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const headerSticky = document.querySelector(".header-sticky");
      if (headerSticky) {
        if (window.scrollY > 1) {
          headerSticky.classList.add("sticky");
        } else {
          headerSticky.classList.remove("sticky");
        }
      }
    };

    const updateIsMega = () => {
      setIsMega(location.pathname === "/");
    };
    window.addEventListener("scroll", handleScroll);
    updateIsMega();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  // Track authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      try {
        await auth.signOut();
        localStorage.removeItem('user'); // Remove user data from local storage
        navigate('/home'); // Navigate to home page or login page
      } catch (error) {
        console.error('Error signing out:', error);
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Close the dropdown when an item is clicked
  const handleCloseDropdown = () => {
    setShowDropdown(prevState => !prevState);
  };
  return (
    <Fragment>
      <header className="header-center-home header-default header-sticky">
        <Navbar expand="xl" className="nav navbar-light iq-navbar header-hover-menu py-xl-0"        >
          <Container fluid className="navbar-inner">
            <div className="d-flex align-items-center justify-content-between w-100 landing-header">
              <div className="d-flex gap-3 gap-xl-0 align-items-center">
                {/* Logo in Navbar (hidden on mobile) */}
                <Link className="navbar-brand text-primary d-none d-xl-block" to="/home">
                  <img
                    className="img-fluid logo logo-lg"
                    src={img2}
                    loading="lazy"
                    alt="streamit"
                    style={{
                      width: "65px",
                      height: "auto",
                      maxHeight: "none",
                    }}
                  />
                </Link>

                {/* Offcanvas Menu Trigger Button */}
                <button type="button" data-bs-toggle="offcanvas" data-bs-target="#navbar_main" aria-controls="navbar_main" className="d-xl-none btn  rounded-pill p-1 pt-0 toggle-rounded-btn" onClick={() => setShow1(!show1)}>
                  <img
                    className="img-fluid logo logo-lg"
                    src={img2}
                    loading="lazy"
                    alt="slflicks"
                    style={{
                      width: "65px",
                      height: "auto",
                      maxHeight: "none",
                    }}
                  />
                </button>
              </div>
              <Navbar id="navbar_main" expand="xl"
                className={`offcanvas mobile-offcanvas nav hover-nav horizontal-nav py-xl-0 ${show1 ? "show" : ""}`}
                style={{ visibility: show1 ? "visible" : "hidden" }}>
                <Container fluid className="container-fluid p-lg-0 mt-2">
                  <Offcanvas.Header className="px-0" closeButton onHide={() => setShow1(false)}>
                    <div className="navbar-brand ms-3"><Logo /></div>
                  </Offcanvas.Header>
                  <ul className="navbar-nav iq-nav-menu list-unstyled" id="header-menu">
                    <Nav.Item as="li">
                      <Nav.Link href="/explore" className={location.pathname === "/explore" ? "active" : ""}                      >
                        {t("header.explore")}
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                      <Nav.Link href="/tv-shows" className={location.pathname === "/tv-shows" ? "active" : ""}                      >
                        {t("header.tv_show")}
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                      <Nav.Link href="/movies" className={location.pathname === "/movies" ? "active" : ""}                      >
                        {t("header.movie")}
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                      <Nav.Link href="/live" className={location.pathname === "/live" ? "active" : ""}                      >
                        {t("Live")}
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                      <Nav.Link aria-expanded={open2} onClick={() => setOpen2(!open2)}
                        className={
                          ["/about-us", "/contact-us", "/faq", "/PrivacyPolicy"].includes(location.pathname)
                            ? "active" : ""}
                      >
                        <span className="item-name">{t("more")}</span>
                        <span className="menu-icon ms-2">
                          <i className="fa fa-caret-down toggledrop-desktop right-icon" aria-hidden="true"></i>
                          <span className="toggle-menu">
                            <i className="fa fa-plus arrow-active text-white" aria-hidden="true"></i>
                            <i className="fa fa-minus arrow-hover text-white" aria-hidden="true"></i>
                          </span>
                        </span>
                      </Nav.Link>
                      <Collapse in={open2} className="sub-nav list-unstyled">
                        <ul>
                          <Nav.Item as="li">
                            <Link to="/about-us" className={location.pathname === "/about-us" ? "active" : ""}>{t("header.about_us")}</Link>
                          </Nav.Item>
                          <Nav.Item as="li">
                            <Link to="/contact-us" className={location.pathname === "/contact-us" ? "active" : ""}>{t("header.contact_us")}</Link>
                          </Nav.Item>
                          <Nav.Item as="li">
                            <Link to="/faq" className={location.pathname === "/faq" ? "active" : ""}>{t("header.faq")}</Link>
                          </Nav.Item>
                          <Nav.Item as="li">
                            <Link to="/privacy-policy" className={location.pathname === "/PrivacyPolicy" ? "active" : ""}>{t("header.privacy_policy")}</Link>
                          </Nav.Item>
                        </ul>
                      </Collapse>
                    </Nav.Item>

                  </ul>
                </Container>
              </Navbar>
              <div className="">
                <Form className="d-flex w-100 " onSubmit={handleSearch}>
                  <Form.Control
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                    style={{
                      padding: "10px 15px", // Adjust padding for smaller size
                      fontSize: "14px",    // Adjust font size for smaller appearance
                    }}
                  />
                  <Button
                    variant="outline-dark"
                    type="submit"
                    style={{
                      backgroundColor: "#141314",
                      padding: "1px 15px", // Adjust padding for smaller size
                      fontSize: "14px",    // Adjust font size for smaller appearance
                    }}
                  >
                    <AiOutlineSearch size={16} color="#e50914" />
                  </Button>
                </Form>

              </div>

              <div className="mx-5"></div>
              <div className="right-panel ms-auto">
                <ul
                  className="navbar-nav align-items-center ms-auto mb-2 mb-xl-0 gap-3"
                  onMouseEnter={() => setShowDropdown(true)} // Open on hover
                  onMouseLeave={() => setShowDropdown(false)} // Close when mouse leaves
                >
                  <Dropdown as="li" className="nav-item" show={showDropdown}
                    onToggle={(isOpen) => setShowDropdown(isOpen)}
                  // ref={dropdownRef} // Attach the ref
                  >
                    <Dropdown.Toggle size="sm" id="dropdownMenuButton1" as={CustomToggle} href="#" variant="nav-link d-flex align-items-center px-0">
                      <div className="btn-icon rounded-pill user-icons">
                        <span className="btn-inner">
                          <svg className="icon-18" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M9.877 15.206c-3.844 0-7.127.581-7.127 2.909 0 2.328 3.263 2.93 7.127 2.93 3.845 0 7.127-.582 7.127-2.909 0-2.327-3.263-2.93-7.127-2.93Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M9.877 11.886c2.523 0 4.568-2.045 4.568-4.568C14.444 4.795 12.4 2.75 9.877 2.75 7.354 2.75 5.31 4.795 5.31 7.318c-.01 2.515 2.02 4.56 4.535 4.568h.032Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      as="ul"
                      className="dropdown-menu-end dropdown-user border-0 p-0 m-0 w-auto"
                    >
                      <>
                        <li>
                          <Link to="/pricing" className="iq-sub-card d-flex align-items-center gap-3">
                            <svg width="16" height="16" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg"                              >
                              <path fillRule="evenodd" clipRule="evenodd" d="M8.587 8.236l2.598-5.232a1 1 0 0 1 1.63 0l2.598 5.232 5.809.844c.745.108 1.042 1.019.502 1.541L17.522 14.692l.992 5.749c.128.738-.652 1.301-1.319.953L12 18.678l-5.194 2.716c-.667.349-1.446-.214-1.319-.953l.992-5.749L2.276 10.622c-.54-.522-.243-1.433.502-1.541l5.809-.845Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <h6 className="mb-0 font-size-14 fw-normal">{t("header.subscription")}</h6>
                          </Link>
                        </li>
                      </>
                      {isAuthenticated ? (
                        <div>
                          <li>
                            <Link to="/account" className="iq-sub-card d-flex align-items-center gap-3">
                              <svg width="16" height="16" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg"                                >
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.845 20.662C4.153 20.662 1 20.088 1 17.787c0-2.301 3.133-4.425 6.845-4.425 3.692 0 6.845 2.103 6.845 4.403 0 2.301-3.133 4.425-6.845 4.425Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.837 10.174c2.423 0 4.387-1.964 4.387-4.387S10.26 1.4 7.837 1.4c-2.423 0-4.387 1.964-4.387 4.387-.008 2.414 1.942 4.378 4.357 4.386h.033Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              <h6 className="mb-0 font-size-14 fw-normal">{t("header.my_account")}</h6>
                            </Link>
                          </li>
                          <li>
                            <Link onClick={handleLogout} className="iq-sub-card d-flex align-items-center gap-3">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"                                >
                                <path d="M1.822 16c-.355 0-.659-.126-.911-.378-.252-.252-.378-.556-.378-.911V1.733c0-.355.126-.659.378-.911C1.163.57 1.467.444 1.822.444h6.134v1H1.822c-.074 0-.141.03-.2.089a.267.267 0 0 0-.089.2v12.978c0 .074.03.141.089.2.059.06.126.089.2.089h6.134v1H1.822ZM12.089 11.6l-.733-.711 2.178-2.156H5.689V7.711h7.822L11.333 5.555l.733-.733L15.467 8.244 12.089 11.6Z" fill="currentColor" />
                              </svg>
                              <h6 className="mb-0 font-size-14 fw-normal">{t("header.logout")}</h6>
                            </Link>
                          </li>
                        </div>
                      ) : (
                        <div>

                          <li>
                            <Link to="/login" className="iq-sub-card d-flex align-items-center gap-3">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"                                >
                                <path fillRule="evenodd" d="M12.89 8.086H1.414l2.942-3.027a.697.697 0 0 0-.001-.97l-.484-.5a.697.697 0 0 0-.969-.001L.201 7.08a.697.697 0 0 0 0 .97l2.7 2.746c.27.273.708.273.978.003l.485-.485a.697.697 0 0 0-.001-.969L1.415 8.086H12.89c.38 0 .69-.31.69-.69V8.776a.688.688 0 0 0-.69-.69Z" />
                              </svg>
                              <h6 className="mb-0 font-size-14 fw-normal">{t("login")}</h6>
                            </Link>
                          </li>
                        </div>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </ul>
              </div>

            </div>

          </Container>
        </Navbar>
      </header>
    </Fragment>
  );
});

HeaderDefault.displayName = "HeaderDefault";
export default HeaderDefault;
