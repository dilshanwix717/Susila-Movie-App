import { lazy } from "react";
// Layout
import FrontendLayout from "../layouts/FrontendLayout";
import BlankLayout from "../layouts/BlankLayout";
import PrivateRoute from "./PrivateRoute"; // Import PrivateRoute

// Main Pages
const HomePage = lazy(() => import("../views/MainPages/HomePage"));
const ExplorePage = lazy(() => import("../views/MainPages/ExplorePage"));
const MoviePage = lazy(() => import("../views/MainPages/MoviesPage"));
const TvShowsList = lazy(() => import("../views/MainPages/TvShowsPage"));
const MiscellaneousPage = lazy(() => import("../views/MainPages/MiscellaneousPage"));
const LiveEventsPage = lazy(() => import("../views/MainPages/LiveEventsPage"));

// Detail Pages
const MovieDetail = lazy(() => import("../views/Movies/DetailPage"));
const TvShowsDetail = lazy(() => import("../views/TvShows/DetailPage"));
const LatestEpisodes = lazy(() => import("../views/TvShows/EpisodePage"));
const VideoDetail = lazy(() => import("../views/VideosPage/DetailPage"));
const WatchlistDetail = lazy(() => import("../views/WatchlistDetail"));
const RelatedMerchandisePage = lazy(() => import("../views/Movies/RelatedMerchandiesPage"));

// Merchandise Pages
const IndexPage = lazy(() => import("../views/MerchandisePages/IndexPage"));
const ShopCategoryPage = lazy(() => import("../views/MerchandisePages/ShopCategoryPage"));
const ProductDetail = lazy(() => import("../views/MerchandisePages/ProductDetailPage"));
const CartPage = lazy(() => import("../views/MerchandisePages/CartPage"));
const CheckOutPage = lazy(() => import("../views/MerchandisePages/CheckoutPage"));
const WishlistPage = lazy(() => import("../views/MerchandisePages/WishlistPage"));
const TrackOrder = lazy(() => import("../views/MerchandisePages/TrackOrder"));
const MyAccount = lazy(() => import("../views/MerchandisePages/my-account"));
const AllProduct = lazy(() => import("../views/MerchandisePages/AllProduct"));

// Extra Pages
const AboutPage = lazy(() => import("../views/ExtraPages/AboutPage"));
const ContactPage = lazy(() => import("../views/ExtraPages/ContactPage"));
const FAQPage = lazy(() => import("../views/ExtraPages/FAQPage"));
const PrivacyPolicy = lazy(() => import("../views/ExtraPages/PrivacyPolicy"));
const TermsofUse = lazy(() => import("../views/ExtraPages/TermsofUse"));
const CommingSoonPage = lazy(() => import("../views/ExtraPages/CommingSoonPage"));
const ErrorPage1 = lazy(() => import("../views/ExtraPages/ErrorPage1"));
const ErrorPage2 = lazy(() => import("../views/ExtraPages/ErrorPage2"));
const ViewAll = lazy(() => import("../views/ViewAll"));
const RestrictedPage = lazy(() => import("../views/Movies/RestictedPage"));
const SearchResults = lazy(() => import("../views/ExtraPages/SearchResults"));

// Auth Pages
const LoginPage = lazy(() => import("../views/AuthPages/LoginPage"));
const SignUpPage = lazy(() => import("../views/AuthPages/SignUpPage"));
const LostPassword = lazy(() => import("../views/AuthPages/LostPassword"));
const UpdateUser = lazy(() => import("../views/AuthPages/UserProfilePage"));


//subscription
const PricingPage = lazy(() => import("../views/SubscriptionPage/PricingPage"));
const SuccessPage = lazy(() => import("../views/SubscriptionPage/Success"));
const CancelPage = lazy(() => import("../views/SubscriptionPage/Cancel"));

// live stream
const LiveStreamPage = lazy(() => import("../views/LiveEvents/LiveStream"));

export const LandingpageRouter = [
  {
    path: "/",
    element: (
      <PrivateRoute>
        <FrontendLayout HeaderMega="true" FooterCompact="true" />
      </PrivateRoute>
    ),
    children: [
      // Detail Pages
      { path: "/movies-detail", element: <MovieDetail /> },
      { path: "/shows-details", element: <TvShowsDetail /> },
      { path: "/episodes", element: <LatestEpisodes /> },
      { path: "/videos-detail", element: <VideoDetail /> },
      { path: "/watchlist-detail", element: <WatchlistDetail /> },
      { path: "/related-merchandise", element: <RelatedMerchandisePage /> },
      { path: "/update-user", element: <UpdateUser /> },

      // Merchandise Pages
      { path: "/all-products", element: <AllProduct /> },
      { path: "/product-detail", element: <ProductDetail /> },
      { path: "/checkout", element: <CheckOutPage /> },
      { path: "/wishlist", element: <WishlistPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/track-order", element: <TrackOrder /> },

      // live stream
      { path: "/live-stream/:eventId", element: <LiveStreamPage /> },
    ],
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <FrontendLayout HeaderMerchandise="true" FooterMerchandise="true" />
      </PrivateRoute>
    ),
    children: [
      { path: "/merchandise-store", element: <IndexPage /> },
      { path: "/shop", element: <ShopCategoryPage /> },
    ],
  },
  {
    path: "/",
    element: <BlankLayout />,
    children: [
      // Auth Pages
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <SignUpPage /> },
      { path: "/lost-password", element: <LostPassword /> },

      // Extra Pages

      { path: "/coming-soon", element: <CommingSoonPage /> },
      { path: "/error-page-one", element: <ErrorPage1 /> },
      { path: "/error-page-two", element: <ErrorPage2 /> },
    ],
  },

  {
    path: "/",
    element: <FrontendLayout HeaderMega="true" FooterCompact="true" />,
    children: [
      // Main Pages
      { path: "/", element: <HomePage /> },
      { path: "/explore", element: <ExplorePage /> },
      { path: "/movies", element: <MoviePage /> },
      { path: "/tv-shows", element: <TvShowsList /> },
      { path: "/live", element: <LiveEventsPage /> },
      { path: "/search", element: <SearchResults /> },

      { path: "/home", element: <HomePage /> },
      { path: "/pricing", element: <PricingPage /> },
      { path: "/account", element: <MyAccount /> },

      // Extra Pages
      { path: "/about-us", element: <AboutPage /> },
      { path: "/contact-us", element: <ContactPage /> },
      { path: "/privacy-policy", element: <PrivacyPolicy /> },
      { path: "/terms-of-use", element: <TermsofUse /> },
      { path: "/faq", element: <FAQPage /> },
      { path: "/view-all", element: <ViewAll /> },

      //subscription
      { path: "/success", element: <SuccessPage /> },
      { path: "/cancel", element: <CancelPage /> },
    ],
  },
];