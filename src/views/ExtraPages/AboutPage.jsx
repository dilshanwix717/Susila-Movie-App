import { Fragment, memo } from "react";

//components
import TeamSection from "./AboutSections/TeamSection";
import ContactUs from "./AboutSections/ContactUs";
import WorkSection from "./AboutSections/WorkSection";
import BreadcrumbWidget from "../../components/BreadcrumbWidget";

// the hook
import { useTranslation } from "react-i18next";

const AboutPage = memo(() => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <BreadcrumbWidget title={t("header.about_us")} />
        <div style={{margin:50,textAlign:"center"}}>
            For three decades, Susila Productions has been the beacon of entertainment for Sri
            Lankans, captivating audiences with timeless teledramas such as "Doo Daruwo,
            Yashorawaya" and many more. Through our teledramas, we've woven tales that
            resonate with the heart and soul of Sri Lankan culture, addressing universal themes
            of love, family, and societal dynamics. Our commitment to quality content has
            earned us the trust and admiration of viewers across the island nation.
            But now, our reach extends beyond geographical boundaries. With just a click of a
            button, audiences from any part of the world can immerse themselves in the
            richness of Sri Lankan content. Whether you're nestled in the hills of Sri Lanka or
            traversing distant lands, SL Flicks ensures that our captivating storytelling is
            accessible to all.
            Join us as we continue to redefine the boundaries of entertainment, bringing joy,
            laughter, and tears to audiences worldwide. Experience the magic of SL Flicks,
            where every click unlocks a world of unforgettable narratives and unforgettable
            moments.
        </div>
      {/*<TeamSection></TeamSection>*/}
      {/*<ContactUs></ContactUs>*/}
      {/*<WorkSection></WorkSection>*/}
    </Fragment>
  );
});

AboutPage.displayName = "AboutPage";
export default AboutPage;
