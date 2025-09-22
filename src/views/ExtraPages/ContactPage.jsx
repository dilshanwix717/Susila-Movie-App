import { memo, Fragment, useState } from "react";
import { Container, Row, Col, Form, Modal, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import BreadcrumbWidget from "../../components/BreadcrumbWidget";
import { useTranslation } from "react-i18next";
import ContactUsMessage from "../../providers/contentProviders.jsx";
import { executeSendContactUsMessage } from "../../api/endPoints.jsx";

const ContactPage = memo(() => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    userId: "OVoIeTuumjOejFq7QFBYD9zZGRL2",
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponseMessage(""); // Clear previous response message

    const message = new ContactUsMessage(
      formData.userId,
      formData.name,
      formData.email,
      formData.message
    );

    try {
      const response = await executeSendContactUsMessage(message.toJson());

      if (response.data.success) {
        setResponseMessage("Message sent successfully!");
        setFormData({ userId: "OVoIeTuumjOejFq7QFBYD9zZGRL2", name: "", email: "", message: "" }); // Clear fields
      } else {
        setResponseMessage("Failed to send message.");
      }
    } catch (error) {
      setResponseMessage("Failed to send message.");
      console.error(error);
    } finally {
      setIsLoading(false); // Hide spinner
    }
  };

  return (
    <Fragment>
      <BreadcrumbWidget title={t("header.contact_us")} />
      <div className="section-padding">
        <Container>
          <Row>
            <Col lg="8">
              <div className="title-box">
                <h2>{t("contact_us.create_with_us")}</h2>
                <p className="mb-0">{t("contact_us.learn_more")}</p>
              </div>
              <Form className="mb-5 mb-lg-0" onSubmit={handleSubmit}>
                <Row>
                  <Col md="6" className="mb-4 mb-lg-5">
                    <input
                      type="text"
                      className="form-control font-size-14"
                      placeholder={`${t("form.your_name")}*`}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                  <Col md="6" className="mb-4 mb-lg-5">
                    <input
                      type="email"
                      className="form-control font-size-14"
                      placeholder={`${t("form.your_email")}*`}
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                  <Col md="12" className="mb-4 mb-lg-5">
                    <textarea
                      className="form-control font-size-14"
                      cols="40"
                      rows="10"
                      placeholder={`${t("form.message")}`}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </Col>
                  <Col>
                    <Row>
                      <div className="iq-button">
                        <button type="submit" className="btn" disabled={isLoading}>
                          {t("contact_us.send_message")}
                        </button>
                        {responseMessage && <p>{responseMessage}</p>}
                      </div>
                    </Row>
                  </Col>
                </Row>
              </Form>
            </Col>

            <Col lg="1" className="d-none d-lg-block"></Col>
            <Col lg="3">
              <div className="border-bottom pb-4 mb-4">
                <h5>{t("contact_us.come_see_use")}</h5>
                <h6>Sri Lanka</h6>
                <div className="mb-3">No.80,<br />Nawala Road,Nawala,<br />Sri Lanka.</div>
                <h6>Dubai</h6>
                <span>Susila Global Portal Est,<br />PO Box 128688,<br />Al Muteena.</span>
              </div>
              <div className="border-bottom pb-4 mb-4">
                <h5>{t("contact_us.get_in_touch")}</h5>
                <p className="mb-4 font-size-20">
                  {t("footer.email_us")}:{" "}
                  <a href={`mailto:${t("footer.info@slflicks")}`} className="text-white">
                    {t("footer.info@slflicks")}
                  </a>
                </p>

                <div className="contact-info text-white mb-0">
                  <p className="mb-2">
                    <a href="tel:+971506854568" className="text-white">Dubai:  +971 50 685 4568</a>
                  </p>
                  <div className="d-flex  ">
                    <div>
                      <p className="mb-0">
                        Sri Lanka:
                      </p>
                    </div>
                    <div> <p className="mb-0 mx-2">
                      <a href="tel:+94716555588" className="text-white"> +94 716 555 588</a>
                    </p>
                      <p className="mb-0 mx-2">
                        <a href="tel:+94717555588" className="text-white">+94 717 555 588</a>
                      </p></div>
                  </div>
                </div>
              </div>
              <div>
                <h5>{t("contact_us.follow_us")}</h5>
                <ul className="p-0 m-0 mt-4 list-unstyled widget_social_media">
                  <li>
                    <a
                      href="https://www.facebook.com/susilalife?mibextid=ZbWKwL"
                      className="position-relative"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/channel/UCPanPZ7x8Gyczus5A1kQCww"
                      className="position-relative"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-youtube"></i>
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://www.instagram.com/susila_life/?igshid=MzRlODBiNWFlZA%3D%3D"
                      className="position-relative"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="map">
        <Container fluid className="p-0">
          <iframe
            loading="lazy"
            className="w-100"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.0955606943853!2d79.88864997540716!3d6.879154093119687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25b0ea3345d8d%3A0xdfa6f5cfda220057!2sSusila%20Holdings!5e0!3m2!1sen!2slk!4v1718616577019!5m2!1sen!2slk"
            height="600"
          ></iframe>
        </Container>
      </div>
      <div className="section-padding">
        <Container>
          <Row className="row">
            <Col lg="10">
              <div className="title-box">
                <h3 className="fw-500">
                  {t("contact_us.take_challenge")}
                </h3>
              </div>
            </Col>
            <Col lg="2" className="d-none d-lg-block"></Col>
          </Row>
          <Row>
            <Col lg="6" md="6">
              <div className="contact-box d-flex gap-3 rounded mb-3 mb-lg-0">
                {/*<img*/}
                {/*  src={generateImgPath("/assets/images/pages/box-pattern.webp")}*/}
                {/*  className="img-fluid position-absolute top-0 end-0"*/}
                {/*  alt="pattern"*/}
                {/*/>*/}
                <div className="icon-wrapper rounded-circle text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 10 17"
                    fill="none"
                  >
                    <path
                      d="M4.22501 8.70833C4.86668 7.55 6.10001 6.86667 6.81668 5.84167C7.57501 4.76667 7.15001 2.75833 5.00001 2.75833C3.59168 2.75833 2.90001 3.825 2.60835 4.70833L0.450012 3.8C1.04168 2.025 2.65001 0.5 4.99168 0.5C6.95001 0.5 8.29168 1.39167 8.97501 2.50833C9.55835 3.46667 9.90001 5.25833 9.00001 6.59167C8.00001 8.06667 7.04168 8.51667 6.52501 9.46667C6.31668 9.85 6.23335 10.1 6.23335 11.3333H3.82501C3.81668 10.6833 3.71668 9.625 4.22501 8.70833ZM6.66668 14.6667C6.66668 15.5833 5.91668 16.3333 5.00001 16.3333C4.08335 16.3333 3.33335 15.5833 3.33335 14.6667C3.33335 13.75 4.08335 13 5.00001 13C5.91668 13 6.66668 13.75 6.66668 14.6667Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
                <div style={{ zIndex: "1" }}>
                  <h6 className="font-size-18 fw-500 mb-4">
                    {t("contact_us.general_enquiries")}
                  </h6>
                  <p className="mb-1 font-size-14">
                    {t("contact_us.call_on")}{" "}
                    <span className="text-primary">
                      <a href="tel:+94716555588" className="text-primary">
                        +94 716 555 588
                      </a>
                    </span>
                  </p>
                  <p className="mb-0">
                    {t("contact_us.mail")}{" "}
                    <Link
                      to="mailto:info@slflicks.com"
                      className="text-white fw-500"
                    >
                      info@slflicks.com
                    </Link>
                  </p>
                </div>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="contact-box d-flex gap-3 rounded mb-3 mb-lg-0">
                {/*<img*/}
                {/*  src={generateImgPath("/assets/images/pages/box-pattern.webp")}*/}
                {/*  className="img-fluid position-absolute top-0 end-0"*/}
                {/*  alt="pattern"*/}
                {/*/>*/}
                <div className="icon-wrapper rounded-circle text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M8 0.5C3.85833 0.5 0.5 3.85833 0.5 8V13.8333C0.5 14.75 1.25 15.5 2.16667 15.5H5.5V8.83333H2.16667V8C2.16667 4.775 4.775 2.16667 8 2.16667C11.225 2.16667 13.8333 4.775 13.8333 8V8.83333H10.5V15.5H13.8333C14.75 15.5 15.5 14.75 15.5 13.8333V8C15.5 3.85833 12.1417 0.5 8 0.5ZM3.83333 10.5V13.8333H2.16667V10.5H3.83333ZM13.8333 13.8333H12.1667V10.5H13.8333V13.8333Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
                <div style={{ zIndex: "1" }}>
                  <h6 className="font-size-18 fw-500 mb-4">
                    {t("contact_us.user_support")}
                  </h6>
                  <p className="mb-1 font-size-14">
                    {t("contact_us.call_on")}{" "}
                    <a href="tel:+94716555588" className="text-primary">
                      +94 716 555 588
                    </a>                  </p>
                  <p className="mb-0">
                    {t("contact_us.mail")}{" "}
                    <Link
                      to="mailto:info@slflicks.com"
                      className="text-white fw-500"
                    >
                      info@slflicks.com
                    </Link>
                  </p>
                </div>
              </div>
            </Col>

          </Row>
        </Container>
        {/* Spinner */}
        {isLoading && (
          <Modal
            show={isLoading}
            centered
            backdrop="static"
            keyboard={false}
            className="d-flex justify-content-center align-items-center"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
              border: "none", // Remove border around modal
            }}
            contentClassName="bg-transparent border-0" // Make modal content transparent
          >
            <Spinner
              animation="border"
              role="status"
              style={{ color: "#e50914", width: "4rem", height: "4rem" }}
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Modal>
        )}
      </div>
    </Fragment>
  );
});

ContactPage.displayName = "ContactPage";
export default ContactPage;
