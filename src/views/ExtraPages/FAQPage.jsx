import { Fragment, memo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import BreadcrumbWidget from "../../components/BreadcrumbWidget";
import { useTranslation } from "react-i18next";

// FAQ data moved outside the component
const faqData = [
  {
    id: "faq1",
    question: "How do I access an OTT platform?",
    answer:
      "You can access an OTT platform through various devices, including smartphones, tablets, smart TVs, streaming devices, and computers. Simply download the platform's app or visit their website, sign up for a subscription, and start streaming.",
  },
  {
    id: "faq2",
    question: "What type of content is available on OTT platforms?",
    answer:
      "SL Flicks offer a wide range of content, including movies, TV shows, web series, documentaries, original productions, live events, and more.",
  },
  {
    id: "faq3",
    question: "Can I share my OTT account with others?",
    answer:
      "SL Flicks have policies regarding the number of devices or screens that can stream content simultaneously under one account. Sharing accounts with people outside your household might violate the platform's terms of service.",
  },
  {
    id: "faq4",
    question: "How is the video quality on OTT platforms?",
    answer:
      "The video quality on OTT platforms can vary depending on several factors, such as your internet connection speed, the device you're using.",
  },
  {
    id: "faq5",
    question: "How secure are payments on OTT platforms?",
    answer:
      "SL Flicks use secure payment gateways to process subscriptions, ensuring the safety of your payment information. Always use official apps or websites to subscribe and avoid sharing sensitive information with unknown sources.",
  },
  // Add more FAQs here as needed
];

const FAQPage = memo(() => {
  const { t } = useTranslation();
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (faqId) => {
    setActiveFaq(activeFaq === faqId ? null : faqId); // Toggle between open and closed
  };

  return (
    <Fragment>
      <BreadcrumbWidget title={t("header.faq")} />
      <div className="section-padding">
        <Container>
          <Row>
            <Col lg="12" sm="12">
              <div className="iq-accordian iq-accordian-square">
                {faqData.map((item) => (
                  <div
                    key={item.id}
                    className={`iq-accordian-block ${activeFaq === item.id ? "iq-active" : ""}`}
                    onClick={() => toggleFaq(item.id)}
                  >
                    <div className="iq-accordian-title">
                      <div className="iq-icon-right">
                        <i aria-hidden="true" className="fa fa-minus active"></i>
                        <i aria-hidden="true" className="fa fa-plus inactive"></i>
                      </div>
                      <h4 className="mb-0 accordian-title iq-heading-title">
                        {item.question}
                      </h4>
                    </div>
                    <div
                      className={`iq-accordian-details ${activeFaq === item.id ? "d-block" : "d-none"}`}
                    >
                      <p className="mb-0">{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
});

FAQPage.displayName = "FAQPage";
export default FAQPage;
