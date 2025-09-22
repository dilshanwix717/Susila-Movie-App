import React, { memo, Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Alert, Button, Card, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import BreadCrumbWidget from "../../components/BreadcrumbWidget";
import { FaUser, FaEnvelope, FaCheckCircle, FaCalendarAlt } from "react-icons/fa";

const MyAccount = memo(() => {
  const { t } = useTranslation();
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user details from Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        setUserId(user.uid);

        const userDocRef = doc(db, "webAppUsers", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data());
        } else {
          setError("User data not found.");
        }
      } else {
        setUserId("");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Fragment>
      <BreadCrumbWidget title={t("header.my_account")} />
      <div className="section-padding service-details">
        <Container>
          <Row>
            <Col lg={8} md={10} className="mx-auto">
              <h3 className="mb-4 text-center">{t("header.my_account")}</h3>
              {error && <Alert variant="danger">{error}</Alert>}

              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : (
                <Row className="g-4">
                  {/* Personal Info Card */}
                  <Col md={6}>
                    <Card className="shadow-sm">
                      <Card.Header className="text-primary d-flex align-items-center">
                        <FaUser className="me-2" />
                        <strong>{t("Personal Info")}</strong>
                      </Card.Header>
                      <Card.Body>
                        <Row className="mb-2">
                          <Col xs={5}>
                            <strong>{t("form.first_name")}:</strong>
                          </Col>
                          <Col xs={7}>{userData.firstName || "N/A"}</Col>
                        </Row>
                        <Row className="mb-2">
                          <Col xs={5}>
                            <strong>{t("form.last_name")}:</strong>
                          </Col>
                          <Col xs={7}>{userData.lastName || "N/A"}</Col>
                        </Row>
                        <Row>
                          <Col xs={5}>
                            <strong>{t("form.email")}:</strong>
                          </Col>
                          <Col xs={7}>
                            <FaEnvelope className="me-1" />
                            {userData.email || "N/A"}
                          </Col>
                        </Row>
                        <div className="text-center mt-3">
                          <Button as={Link} to="/update-user" variant="outline-primary">
                            {t("Update Profile")}
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>

                  {/* Subscription Info Card */}
                  <Col md={6}>
                    <Card className="shadow-sm">
                      <Card.Header className="text-primary d-flex align-items-center">
                        <FaCheckCircle className="me-2" />
                        <strong>{t("Subscription Info")}</strong>
                      </Card.Header>
                      <Card.Body>
                        <Row className="mb-2">
                          <Col xs={5}>
                            <strong>{t("Plan Type")}:</strong>
                          </Col>
                          <Col xs={7}>{userData.subscription?.planType || "N/A"}</Col>
                        </Row>
                        <Row className="mb-2">
                          <Col xs={5}>
                            <strong>{t("Status")}:</strong>
                          </Col>
                          <Col xs={7}>{userData.subscription?.status || "N/A"}</Col>
                        </Row>
                        <Row>
                          <Col xs={5}>
                            <strong>{t("End Date")}:</strong>
                          </Col>
                          <Col xs={7}>
                            <FaCalendarAlt className="me-1" />
                            {userData.subscription?.planEndDate || "N/A"}
                          </Col>
                        </Row>
                        <div className="text-center mt-3">
                          <Button as={Link} to="/pricing" variant="outline-primary">
                            {t("Subscription Details")}
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
});

MyAccount.displayName = "MyAccount";
export default MyAccount;
