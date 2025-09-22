//export const baseUrl = "http://localhost:3002/api";
export const baseUrl = "https://api.slflicks.com/api";


export const SEND_CONTACTUS_MESSAGE = `${baseUrl}/content/sendContactUsMessage`;
export const GET_SUSILA_ORIGINALS = `${baseUrl}/content/getSusilaOriginals`;
export const GET_TELEDRAMA_SERIES = `${baseUrl}/content/getSeries`;
export const GET_WEB_SERIES = `${baseUrl}/content/getSeriesCommon`;
export const GET_MOVIES = `${baseUrl}/content/getMovies`;
export const GET_RANDOM_MOVIES = `${baseUrl}/content/getRandomMovies`;
export const GET_LATEST_MOVIES = `${baseUrl}/content/getLatestMovies`;

export const GET_LATEST_CONTENT = `${baseUrl}/content/getLatestContent`;
export const GET_POPULAR_CONTENT = `${baseUrl}/content/getPopularContent`;
export const GET_BANNERS = `${baseUrl}/content/getBanners`;
export const GET_CONTENT_BY_CONTENT_ID = `${baseUrl}/content/getContentByContentId`;
export const GET_CONTENT_BY_ID = `${baseUrl}/content/getContentById`;
export const GET_CONTENT = `${baseUrl}/content/getAllContent`;
export const GET_FEATURED_TELESERIES = `${baseUrl}/content/getFeaturedTeleseries`;
export const GET_LATEST_TELESERIES = `${baseUrl}/content/getLatestTVSeries`;
export const GET_RANDOM_TELESERIES = `${baseUrl}/content/getRandomTVSeries`;
export const GET_CONTENT_BY_SERIES = `${baseUrl}/content/getContentSeriesIterateData`;

//subscription
export const CREATE_SUBSCRIPTION_CHECKOUT = `${baseUrl}/subscription/create-subscription-checkout`;
export const PAYMENT_SUCCESS = `${baseUrl}/subscription/payment-success`;
export const CANCEL_SUBSCRIPTION = `${baseUrl}/subscription/cancel-subscription`;
export const ACTIVATE_FREE_TRIAL = `${baseUrl}/subscription/activate-free-trial`;
