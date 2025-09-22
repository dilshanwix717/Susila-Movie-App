import { Fragment, memo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LiveCardStyle = memo(({ title, image, link, selectedVideo_Data, selectedVideo_Array }) => {
    const { t } = useTranslation();

    return (
        <Fragment>
            <div className="iq-card card-hover">
                <div className="block-images position-relative w-100">
                    <div className="img-box w-100">
                        <Link
                            to={link}
                            className="position-absolute top-0 bottom-0 start-0 end-0"
                        ></Link>
                        <img
                            src={image}
                            alt="event-card"
                            className="img-fluid object-cover w-100 d-block border-0"
                        />
                    </div>
                    <div className="card-description with-transition">
                        <div className="cart-content">
                            <div className="content-left justify-content-between align-items-end">
                                <h5 className="iq-title text-capitalize mb-2">
                                    <Link to={link}>{t(title)}</Link>
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="block-social-info align-items-center">
                        <ul className="p-0 m-0 d-flex gap-2 music-play-lists">
                        </ul>
                        <div className="iq-button">
                            <Link
                                to={link}
                                className="btn text-uppercase position-relative rounded-circle"
                            >
                                <i className="fa-solid fa-play ms-0"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
});

LiveCardStyle.displayName = "LiveCardStyle";
export default LiveCardStyle;
