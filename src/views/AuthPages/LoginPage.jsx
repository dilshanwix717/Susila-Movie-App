import React, { Fragment, memo, useState } from "react";
import { Col, Container, Form, Row, Alert, Button, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { auth, db } from "../../firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import img2 from "/assets/images/Susila.png";
import googleLogo from "/assets/images/google.png";

const LoginPage = memo(() => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError("Failed to log in. Please check your credentials.");
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, googleProvider);
      const user = response.user;

      // Reference to Firestore document
      const userDocRef = doc(db, "webAppUsers", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // Adding user details including subscription field
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          firstName: user.displayName?.split(" ")[0] || "",
          lastName: user.displayName?.split(" ").slice(1).join(" ") || "",
          subscription: {
            freeTrialUsed: false, // Initialize freeTrialUsed as false
          },
        });
      }

      navigate("/home");
    } catch (error) {
      setError("Failed to log in with Google.");
    }
  };

  return (
    <Fragment>
      <main className="main-content">
        <div
          className="vh-100"

        >
          <Container>
            <Row className="justify-content-center align-items-center height-self-center vh-100">
              <Col lg="5" md="12" className="align-self-center">
                <div className="user-login-card bg-body">
                  <div className="text-center mb-4">
                    <Link className="navbar-brand text-primary" to="/home">
                      <img
                        className="img-fluid logo logo-lg" // Add logo-lg class
                        src={img2}
                        loading="lazy"
                        alt="streamit"
                        style={{
                          width: "150px",
                          height: "auto",
                          maxHeight: "none",
                        }} />
                    </Link>
                  </div>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-white fw-500 mb-2">
                        {t("form.username_or_email")}
                      </Form.Label>
                      <Form.Control
                        type="email"
                        className="rounded-0"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-white fw-500 mb-2">
                        {t("form.password")}
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showPassword ? "text" : "password"} // Toggle type based on showPassword state
                          className="rounded-0"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                          variant="outline-primary "
                          onClick={() => setShowPassword(!showPassword)}
                          className="eye-icon-button"
                        >
                          <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                        </Button>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group className="text-end mb-3">
                      <Link to="/lost-password" className="text-primary fw-semibold fst-italic">
                        {t("form.forgot_password?")}
                      </Link>
                    </Form.Group>
                    <Form.Label className="list-group-item d-flex align-items-center mb-3 font-size-14 text-white fw-500">
                      <Form.Check.Input type="checkbox" className="m-0 me-2" />
                      {t("form.remember_me")}
                    </Form.Label>
                    <div className="full-button">
                      <div className="iq-button">
                        <button type="submit" className="btn text-uppercase position-relative">
                          <span className="button-text">{t("form.log_in")}</span>
                          <i className="fa-solid fa-play"></i>
                        </button>
                      </div>
                    </div>
                  </Form>
                  <div className="text-center my-2 d-flex align-items-center">
                    <hr className="flex-grow-1" style={{ borderColor: "gray" }} />
                    <span className="text-white fw-500 mx-2">{t("or")}</span>
                    <hr className="flex-grow-1" style={{ borderColor: "gray" }} />
                  </div>

                  <div className="text-center my-3">
                    <Button variant="outline-primary" onClick={handleGoogleLogin}>
                      <img src={googleLogo} alt="Google Logo" style={{ width: "40px", marginRight: "10px" }} />
                      {t("Sign in with Google")}
                    </Button>
                  </div>

                  <p className="my-4 text-center fw-500 text-white">
                    <Link to="/register" className="text-white ms-1">
                      Don't have an account? please
                      <span className="text-primary"> {t("form.register")}</span>
                    </Link>
                  </p>

                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </main>
    </Fragment>
  );
});

LoginPage.displayName = "LoginPage";
export default LoginPage;
