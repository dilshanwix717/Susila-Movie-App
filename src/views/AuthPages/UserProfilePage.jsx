import { Fragment, memo, useEffect, useState } from "react";
import { Col, Container, Row, Form, Button, Alert, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { auth, db } from "../../firebase";
import {
    onAuthStateChanged,
    updateProfile,
    reauthenticateWithCredential,
    EmailAuthProvider,
    updatePassword
} from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import BreadCrumbWidget from "../../components/BreadcrumbWidget";
import { useNavigate } from "react-router-dom";  // Import the navigate hook
import { Link } from "react-router-dom";  // Import Link for back button
import { IoArrowBack } from "react-icons/io5";  // Importing icon for the back button

const UserProfilePage = memo(() => {
    const { t } = useTranslation();
    const navigate = useNavigate();  // Initialize the navigate hook
    const [userId, setUserId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");

    // Fetch user details when the component mounts
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserId(user.uid);
                setEmail(user.email);

                // Fetch user data from Firestore
                const userDocRef = doc(db, "webAppUsers", user.uid);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    setFirstName(userData.firstName || "");
                    setLastName(userData.lastName || "");
                } else {
                    console.log("No user data found in Firestore.");
                }
            }
        });
        return () => unsubscribe();
    }, []);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        try {
            if (!userId) throw new Error("User not logged in.");

            // Update profile display name in Firebase Auth
            await updateProfile(auth.currentUser, { displayName: firstName });

            // Update user data in Firestore
            const userDocRef = doc(db, "webAppUsers", userId);
            await updateDoc(userDocRef, {
                firstName,
                lastName,
                email,
            });

            setSuccessMessage("Profile updated successfully.");
            setError("");
        } catch (error) {
            console.error("Error updating profile:", error.message);
            setError("Failed to update profile: " + error.message);
        }
    };

    const handlePasswordChange = async () => {
        try {
            setPasswordError("");
            if (newPassword !== confirmPassword) {
                throw new Error("Passwords do not match.");
            }

            if (auth.currentUser.providerData[0]?.providerId === "google.com") {
                // For Google accounts, set a new password
                await updatePassword(auth.currentUser, newPassword);
            } else {
                // For email/password accounts, verify the current password
                const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
                await reauthenticateWithCredential(auth.currentUser, credential);
                await updatePassword(auth.currentUser, newPassword);
            }

            setSuccessMessage("Password updated successfully.");
            setPasswordError("");
            setShowPasswordModal(false);
        } catch (error) {
            console.error("Error changing password:", error.message);
            setPasswordError("Failed to change password: " + error.message);
        }
    };

    return (
        <Fragment>
            <BreadCrumbWidget title={t("Update")} />

            <Container className="section-padding">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    {/* Back Button with Icon */}
                    <Link to="/account" className="d-flex align-items-center">
                        <Button variant="outline-secondary" onClick={() => navigate(-1)} className="d-flex align-items-center">
                            <IoArrowBack className="me-2" />
                            {t("Back")}
                        </Button>
                    </Link>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}
                {successMessage && <Alert variant="success">{successMessage}</Alert>}

                <Form onSubmit={handleUpdateProfile}>
                    <Row className="justify-content-center">
                        <Col md="8" lg="6">
                            <Form.Group controlId="formFirstName" className="mb-3">
                                <Form.Label>{t("form.first_name")}</Form.Label>
                                <Form.Control
                                    type="text"
                                    required
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formLastName" className="mb-3">
                                <Form.Label>{t("form.last_name")}</Form.Label>
                                <Form.Control
                                    type="text"
                                    required
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>{t("form.email")}</Form.Label>
                                <Form.Control
                                    type="email"
                                    required
                                    value={email}
                                    disabled
                                />
                            </Form.Group>

                            <Button
                                variant="secondary"
                                onClick={() => setShowPasswordModal(true)}
                                className="w-100 mb-3"
                            >
                                {t("Change/Add Password")}
                            </Button>

                            <Button variant="primary" type="submit" className="me-3 w-100">
                                {t("Update Profile")}
                            </Button>

                        </Col>
                    </Row>
                </Form>
            </Container>

            {/* Password Modal */}
            <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{t("Change/Add Password")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {passwordError && <Alert variant="danger">{passwordError}</Alert>}
                    <Form>
                        {auth.currentUser.providerData[0]?.providerId !== "google.com" && (
                            <Form.Group controlId="formCurrentPassword" className="mb-3">
                                <Form.Label>{t("Current Password")}</Form.Label>
                                <div className="d-flex">
                                    <Form.Control
                                        type={showCurrentPassword ? "text" : "password"}
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                    />
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    >
                                        {showCurrentPassword ? t("Hide") : t("Show")}
                                    </Button>
                                </div>
                            </Form.Group>
                        )}

                        <Form.Group controlId="formNewPassword" className="mb-3">
                            <Form.Label>{t("New Password")}</Form.Label>
                            <div className="d-flex">
                                <Form.Control
                                    type={showNewPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <Button
                                    variant="outline-secondary"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                    {showNewPassword ? t("Hide") : t("Show")}
                                </Button>
                            </div>
                        </Form.Group>

                        <Form.Group controlId="formConfirmPassword" className="mb-3">
                            <Form.Label>{t("Confirm New Password")}</Form.Label>
                            <div className="d-flex">
                                <Form.Control
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <Button
                                    variant="outline-secondary"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? t("Hide") : t("Show")}
                                </Button>
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowPasswordModal(false)}>
                        {t("Cancel")}
                    </Button>
                    <Button variant="primary" onClick={handlePasswordChange}>
                        {t("Confirm")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
});

UserProfilePage.displayName = "UserProfilePage";
export default UserProfilePage;
