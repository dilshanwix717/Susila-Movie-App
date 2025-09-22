import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const PrivateRoute = ({ children, requireSubscription = true }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [userSubscriptionStatus, setUserSubscriptionStatus] = useState(null);
    const [userId, setUserId] = useState("");
    const [subscriptionEndDate, setSubscriptionEndDate] = useState("");
    const [daysLeft, setDaysLeft] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const [monthsLeft, setMonthsLeft] = useState(0);
    const [freeTrialEnd, setFreeTrialEnd] = useState(false);
    const [hasAccess, setHasAccess] = useState(false); // Track access based on subscription

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setIsAuthenticated(true);
                setUserId(user.uid);
                try {
                    const userDocRef = doc(db, "webAppUsers", user.uid);
                    const userDocSnap = await getDoc(userDocRef);

                    if (userDocSnap.exists()) {
                        const userData = userDocSnap.data();
                        const subscriptionStatus = userData?.subscription?.status;
                        const planEndDate = userData?.subscription?.planEndDate;
                        // Set subscription data
                        setSubscriptionEndDate(planEndDate || "");
                        setUserSubscriptionStatus(subscriptionStatus || "");
                        // Redirect if needed
                        if (location.pathname === '/login') {
                            // Redirect logged-in users to the home page
                            navigate('/home');
                        }

                        // Check subscription status
                        if (subscriptionStatus === "active") {
                            setHasAccess(true);
                        } else if (subscriptionStatus === "cancelled") {
                            const today = new Date();
                            const endDate = new Date(planEndDate);
                            const timeLeft = endDate - today;
                            if (timeLeft > 0) {
                                setUserSubscriptionStatus("grace");
                            } else {
                                setUserSubscriptionStatus("expired");
                            }
                        } else {
                            setUserSubscriptionStatus("none");
                        }
                    } else {
                        setUserSubscriptionStatus("none");
                    }
                } catch (error) {
                    console.error("Error checking user data:", error);
                    setUserSubscriptionStatus("error");
                }
            } else {
                setIsAuthenticated(false);
                // Redirect to /home if the base path "/" is accessed, otherwise go to /login
                if (location.pathname === "/" || location.pathname === "") {
                    navigate("/home");
                } else if (location.pathname !== '/login') {
                    navigate("/login");
                }
            }
        });

        return () => unsubscribe();
    }, [navigate, location.pathname, userId]);

    useEffect(() => {
        const calculateDaysLeft = (endDate) => {
            if (!endDate) return;
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Normalize to midnight
            const end = new Date(endDate);
            end.setHours(0, 0, 0, 0); // Normalize to midnight

            const diffTime = end - today;
            let days = 0;
            if (diffTime > 0) {
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                const months = Math.floor(diffDays / 30);
                if (diffDays === 30) {
                    days = diffDays;
                } else {
                    days = diffDays % 30;
                }
                setMonthsLeft(months);
                setDaysLeft(days);
                console.log(days)
            } else {
                setMonthsLeft(0);
                setDaysLeft(0);
            }
        };
        if (subscriptionEndDate) {
            calculateDaysLeft(subscriptionEndDate);
            setFreeTrialEnd(true)
            console.log(subscriptionEndDate)
        }
    }, [subscriptionEndDate]); // Triggered when subscriptionEndDate changes


    useEffect(() => {
        const cancelSubscription = async (userId) => {
            if (daysLeft === 0 && monthsLeft === 0 && userSubscriptionStatus === "active") {
                try {
                    const userDocRef = doc(db, "webAppUsers", userId);
                    await updateDoc(userDocRef, {
                        "subscription.status": "cancelled",
                        "subscription.planType": "",
                        "subscription.isFreeTrial": false
                    });
                    setUserSubscriptionStatus("cancelled");
                    console.log("Subscription automatically cancelled.");
                    navigate("/pricing");
                } catch (error) {
                    console.error("Failed to update subscription status in Firestore:", error);
                }
            }
            console.log(daysLeft)
            console.log("test")
        };
        if (freeTrialEnd) {
            cancelSubscription(userId);
        }

    }, [freeTrialEnd]); // Dependencies to trigger effect when any of these values change

    useEffect(() => {
        if (isAuthenticated) {
            // Redirect logged-in users without a subscription plan from "/" or "/ " to "/home"
            if (
                (location.pathname === "/" || location.pathname === "/ ") &&
                userSubscriptionStatus !== "active"
            ) {
                navigate("/home");
            }

            // Redirect logged-in users from "/login" to "/home"
            if (location.pathname === "/login") {
                navigate("/home");
            }
        }
    }, [isAuthenticated, userSubscriptionStatus, location.pathname, navigate]);

    // Loading state
    if (isAuthenticated === null) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    backgroundColor: '#000'
                }}
            >
                <div
                    className="spinner-border"
                    role="status"
                    style={{ color: '#e50914' }}
                >
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    // Handle subscription-based access
    if (requireSubscription) {
        if (isAuthenticated) {
            // Check subscription status for protected routes
            switch (userSubscriptionStatus) {
                case "active":
                    return children; // Full access
                case "grace":
                    return children; // Still has access during grace period
                case "none":
                case "expired":
                    navigate("/pricing");
                    return null;
                default:
                    return null;
            }
        }
        return null;
    }
    // For routes that don't require subscription
    return children;
};

export default PrivateRoute;

