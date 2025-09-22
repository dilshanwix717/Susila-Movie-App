import {Fragment, memo, useEffect} from "react";

//react-bootstrap
import { Container, Row, Col } from "react-bootstrap";

//components
import CardStyle from "../components/cards/CardStyle";
import BreadCrumbWidget from "../components/BreadcrumbWidget";

//function
import { generateImgPath } from "../StaticData/data";

// the hook
import { useTranslation } from "react-i18next";
import {useViewData} from "../ViewDataContext.jsx";
import CardStyleForSeries from "../components/cards/CardStyleForSeries.jsx";

const ViewAll = memo(() => {
  const { t } = useTranslation();
  const { viewData,arrayTitle  } = useViewData();

  useEffect(() => {
    console.log("viewData in ViewAll:", viewData);
  }, [viewData]);

  return (
      <Fragment>
        {/*{console.log('viewData===>',viewData)}*/}
        <BreadCrumbWidget title={arrayTitle}/>
        <div className="section-padding">
            {/*<h2>{arrayTitle}</h2>*/}
          <Container fluid>
            <div className="card-style-grid">
              <Row className="row row-cols-xl-4 row-cols-md-2 row-cols-1">
                {viewData.map((item, index) => (
                    <Col key={index} className="mb-4">
                        {console.log('item.video_url===>',item.video_url)}
                        {!item.category ? (<CardStyleForSeries
                        image={item.thumbnail_url}
                        title={item.title}
                        // movieTime={t(data.movieTime)}
                        // movie_url={data.video_url}
                        selectedVideo_Data={item}
                        selectedVideo_Array={viewData}
                        watchlistLink="/playlist"
                        // link="/movies-detail"
                    />
                        ):(
                      <CardStyle
                          image={item.thumbnail_url}
                          title={item.title}
                          movie_url={item.video_url}
                          // movieTime={item.movieTime}
                          watchlistLink="/playlist"
                          link="/movies-detail"
                      />)}
                    </Col>
                ))}
              </Row>
            </div>
          </Container>
        </div>
      </Fragment>
  )
      ;
});

ViewAll.displayName = "ViewAll";
export default ViewAll;
