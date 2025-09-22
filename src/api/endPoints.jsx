import API_ENDPOINT from "./interceptor.jsx";
import axios from "axios";
import {
    GET_BANNERS,
    GET_CONTENT,
    GET_CONTENT_BY_CONTENT_ID,
    GET_CONTENT_BY_ID,
    GET_LATEST_CONTENT,
    GET_MOVIES,
    GET_RANDOM_MOVIES,
    GET_LATEST_MOVIES,
    GET_WEB_SERIES,
    GET_POPULAR_CONTENT,
    GET_SUSILA_ORIGINALS,
    GET_TELEDRAMA_SERIES,
    SEND_CONTACTUS_MESSAGE,
    GET_FEATURED_TELESERIES,
    GET_LATEST_TELESERIES,
    GET_RANDOM_TELESERIES,
    GET_CONTENT_BY_SERIES,
    CREATE_SUBSCRIPTION_CHECKOUT,
    PAYMENT_SUCCESS,
    CANCEL_SUBSCRIPTION,
    ACTIVATE_FREE_TRIAL
} from "./commonConfigs.jsx";

const AuthorizationCode = 'D4s%I6jN!W3v#E9xS1C5b@N2mH';


const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'D4s%I6jN!W3v#E9xS1C5b@N2mH',
};


export const executeSendContactUsMessage = (contactUsMessage) => {
    return API_ENDPOINT.post(SEND_CONTACTUS_MESSAGE, contactUsMessage, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': AuthorizationCode,
        },
    });
};

// Content End Points

//subscription
export const executeCreateSubscriptionCheckout = (plan, customerId) => {
    return API_ENDPOINT.post(CREATE_SUBSCRIPTION_CHECKOUT, {
        plan: plan,
        customerId: customerId,
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': AuthorizationCode,
        },
    });
};

//free trial
export const executeActivateFreeTrial = (customerId) => {
    return API_ENDPOINT.post(ACTIVATE_FREE_TRIAL, {
        customerId: customerId,
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': AuthorizationCode,
        },
    });
};
// payment success
export const executePaymentSuccess = (sessionId, firebaseId) => {
    return axios.post(PAYMENT_SUCCESS, {
        sessionId: sessionId,
        firebaseId: firebaseId,
    }, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

// cancel subscription
export const executeCancelSubscription = (userId) => {
    return axios.post(CANCEL_SUBSCRIPTION, {
        customerId: userId,
    }, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};



// export const executeSetContinueWatchingForUser = (contactUsMessage) => {
//     return API_ENDPOINT.post(SEND_CONTACTUS_MESSAGE, contactUsMessage, {
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': AuthorizationCode,
//         },
//     });
// };

export const executeGetSusilaOriginals = () => {
    return API_ENDPOINT.get(GET_SUSILA_ORIGINALS, {
        headers: headers,
    });
};

export const executeGetLatestContent = () => {
    return API_ENDPOINT.get(GET_LATEST_CONTENT, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'D4s%I6jN!W3v#E9xS1C5b@N2mH',
        },
    });
};

export const executeGetPopularContent = () => {
    return API_ENDPOINT.get(GET_POPULAR_CONTENT, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'D4s%I6jN!W3v#E9xS1C5b@N2mH',
        },
    });
};

export const executeGetSeries = () => {
    return API_ENDPOINT.get(GET_TELEDRAMA_SERIES, {
        headers: headers,
    });
};

export const executeGetBanners = () => {
    return API_ENDPOINT.get(GET_BANNERS, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'D4s%I6jN!W3v#E9xS1C5b@N2mH',
        },
    });
};

export const executeGetFeaturedTeleseries = () => {
    return API_ENDPOINT.get(GET_FEATURED_TELESERIES, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'D4s%I6jN!W3v#E9xS1C5b@N2mH',
        },
    });
};

export const executeGetLatestTVSeries = () => {
    return API_ENDPOINT.get(GET_LATEST_TELESERIES, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'D4s%I6jN!W3v#E9xS1C5b@N2mH',
        },
    });
};

export const executeGetRandomTVSeries = () => {
    return API_ENDPOINT.get(GET_RANDOM_TELESERIES, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'D4s%I6jN!W3v#E9xS1C5b@N2mH',
        },
    });
};



export const executeGetContentByContentId = (contentId) => {
    return API_ENDPOINT.get(GET_CONTENT_BY_CONTENT_ID, contentId, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'D4s%I6jN!W3v#E9xS1C5b@N2mH',
        },
    });
};

export const executeGetContentByCategoryId = (categoryID) => {
    return API_ENDPOINT.post(GET_CONTENT_BY_ID, categoryID, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'D4s%I6jN!W3v#E9xS1C5b@N2mH',
        },
    });
};


export const executeGetContent = () => {
    return API_ENDPOINT.get(GET_CONTENT, {
        headers: headers,
    });
};

export const executeGetTeledramaSeries = () => {
    return API_ENDPOINT.get(GET_TELEDRAMA_SERIES, {
        headers: headers,
    });
};

export const executeGetWebSeries = (webBody) => {
    return API_ENDPOINT.get(GET_WEB_SERIES, {
        headers: headers,
        params: webBody
    });
};


// export const executeGetContentBySeries = (category,title) => {
//     return API_ENDPOINT.get(GET_CONTENT_BY_SERIES,category,title, {
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'D4s%I6jN!W3v#E9xS1C5b@N2mH',
//         },
//     });
// };

export const executeGetContentBySeries = (category, title) => {
    return API_ENDPOINT.post(GET_CONTENT_BY_SERIES, {
        category: category,
        title: title,
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'D4s%I6jN!W3v#E9xS1C5b@N2mH',
        },
    });
};

export const executeGetMovies = () => {
    return API_ENDPOINT.get(GET_MOVIES, {
        headers: headers,
    });
};

export const excecuteGetRandomMovies = () => {
    return API_ENDPOINT.get(GET_RANDOM_MOVIES, {
        headers: headers,
    });
};

export const excecuteGetLatesMovies = () => {
    return API_ENDPOINT.get(GET_LATEST_MOVIES, {
        headers: headers,
    });
};



// export const executeGetMovies = () => {
//     return API_ENDPOINT.get(GET_MOVIES,{
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'D4s%I6jN!W3v#E9xS1C5b@N2mH',
//         },
//     });
// };