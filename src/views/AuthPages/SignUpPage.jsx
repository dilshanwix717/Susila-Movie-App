import React, { Fragment, memo, useState } from "react";
import { Col, Container, Form, Row, Button, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpPage = memo(() => {
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();

  // Password validation function
  const isPasswordValid = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      toast.warn("You must accept the terms and conditions to sign up.");
      return;
    }

    if (!isPasswordValid(password)) {
      toast.error(
        "Password must include an uppercase letter, a lowercase letter, a number, a symbol, and be at least 8 characters long."
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      if (response.user) {
        await updateProfile(response.user, { displayName: firstName });
        const uid = response.user.uid;

        await setDoc(doc(db, "webAppUsers", uid), {
          uid,
          email,
          firstName,
          lastName,
          subscription: {
            freeTrialUsed: false,
          },
        });

        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setTermsAccepted(false);
        toast.success("Account created successfully!");
        navigate("/login");
      }
    } catch (error) {
      if (error.message.includes("auth/email-already-in-use")) {
        toast.error("Email already exists. Please use a new email.");
      } else {
        toast.error("Error during sign-up: " + error.message);
      }
    }
  };

  return (
    <Fragment>
      <main className="main-content">
        <div className="vh-100">
          <Container>
            <Row className="justify-content-center align-items-center height-self-center vh-100">
              <Col lg="8" md="12" className="align-self-center">
                <div className="user-login-card bg-body">
                  <h4 className="text-center mb-5">{t("form.create_account")}</h4>
                  <Form onSubmit={handleSignUp}>
                    <Row lg="2" className="row-cols-1 g-2 g-lg-5 mb-3">
                      <Col>
                        <Form.Label>{t("form.first_name")}</Form.Label>
                        <Form.Control
                          type="text"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </Col>
                      <Col>
                        <Form.Label>{t("form.last_name")}</Form.Label>
                        <Form.Control
                          type="text"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>{t("form.email")} *</Form.Label>
                      <Form.Control
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>{t("form.password")} *</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                          variant="outline-primary"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                        </Button>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>{t("form.confirm_password")} *</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showConfirmPassword ? "text" : "password"}
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Button
                          variant="outline-primary"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          <i className={`fa ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                        </Button>
                      </InputGroup>
                    </Form.Group>

                    <Form.Check
                      className="mt-3 mb-3"
                      label={
                        <>
                          {t("form.read_and_accept")}{" "}
                          <Link to="/terms-of-use">{t("form.terms_conditions")}</Link>
                        </>
                      }
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                    />

                    <Button type="submit" variant="primary" className="w-100">
                      {t("form.sign_up")}
                    </Button>
                  </Form>

                  <p className="my-4 text-center">
                    <Link to="/login">{t("Already have an account? Log in")}</Link>
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

SignUpPage.displayName = "SignUpPage";
export default SignUpPage;
