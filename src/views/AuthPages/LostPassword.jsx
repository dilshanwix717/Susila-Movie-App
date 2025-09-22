import React, { Fragment, memo, useState } from "react";
import { Col, Container, Form, Row, Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { auth } from "../../firebase"; // Import Firebase auth instance
import { sendPasswordResetEmail } from "firebase/auth";


const LostPassword = memo(() => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess("Password reset email sent! Check your inbox.");
    } catch (error) {
      setError("Failed to send password reset email. Please check the email address.");
    }
  };

  return (
    <Fragment>
      <main className="main-content">
        <div
          className="vh-100"
        // style={{
        //   backgroundImage: "url(assets/images/pages/01.webp)",
        //   backgroundSize: "cover",
        //   backgroundRepeat: "no-repeat",
        //   position: "relative",
        //   minHeight: "500px",
        // }}
        >
          <Container>
            <Row className="justify-content-center align-items-center height-self-center vh-100">
              <Col lg="5" md="12" className="align-self-center">
                <div className="user-login-card bg-body">
                  <p>{t("form.desc_enter1")}</p>
                  {error && <Alert variant="danger">{error}</Alert>}
                  {success && <Alert variant="success">{success}</Alert>}
                  <Form onSubmit={handlePasswordReset}>
                    <Form.Group className="mb-5">
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

                    {/* <Button type="submit" className="btn text-uppercase position-relative">
                      <span className="button-text mx-2">
                        {t("form.new_password")}
                      </span>
                      <i className="fa-solid fa-play"></i>
                    </Button> */}
                    <div className="full-button">
                      <div className="iq-button">
                        <button type="submit" className="btn text-uppercase position-relative">
                          <span className="button-text">
                            {t("form.new_password")}
                          </span>
                          <i className="fa-solid fa-play"></i>
                        </button>
                      </div>
                    </div>
                  </Form>
                  <div className="seperator d-flex justify-content-center align-items-center my-3">
                    <span className="line"></span>
                  </div>
                  <div className="text-center">
                    {/* <Link to="/login" className="btn bg-secondary text-uppercase position-relative" >
                      <span className="button-text mx-2">{t("form.log_in")}</span>
                      <i className="fa-solid fa-play"></i>
                    </Link> */}
                    <p className="my-4 text-center fw-500 text-white">
                      <Link to="/login" className="text-white ms-1">
                        Click here to go back to
                        <span className="text-primary"> Login</span>
                      </Link>
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </main>
    </Fragment>
  );
});

LostPassword.displayName = "LostPassword";
export default LostPassword;
