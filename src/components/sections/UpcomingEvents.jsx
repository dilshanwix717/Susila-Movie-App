import { useState, Fragment, memo, useCallback, useEffect } from "react";
import { db } from '../../firebase';
import { collection, getDocs, query } from 'firebase/firestore';

//components
import SectionSlider from "../slider/SectionSlider";
import LiveCardStyle from "../cards/LiveCardStyle";

// the hook
import { useTranslation } from "react-i18next";

const UpcomingEvents = memo((props) => {
    const { t } = useTranslation();
    const [eventsData, setEventsData] = useState([]);
    const [error, setError] = useState(null);

    // Firestore collection reference for live events
    const collectionRef = collection(db, 'live');

    // Function to fetch events from Firestore
    const getEventName = useCallback(async () => {
        setError(null);  // Reset error state before making the call
        try {
            const q = query(collectionRef);
            const data = await getDocs(q);
            // Map event data to the format for rendering
            setEventsData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } catch (error) {
            console.error("Error fetching events: ", error);
            setError("Failed to load events. Please try again later.");
        }
    }, [collectionRef]);

    useEffect(() => {
        getEventName();
    }, [getEventName]);

    return (
        <Fragment>
            <SectionSlider
                title={t('Upcoming Live Events')}
                list={eventsData}
                className="upcoming-events-block streamit-block"
                paddingY={props.paddingY}  // Optional padding from props
            >
                {(data) => (
                    <LiveCardStyle
                        image={data.imageUrl}  // Assuming each event has a thumbnail
                        title={data.name}
                        description={data.description}
                        //     startTime={new Date(data.startDateTime.seconds * 1000).toLocaleString()}
                        //  endTime={new Date(data.endDateTime.seconds * 1000).toLocaleString()}
                        //watchlistLink="/events/watchlist"  // Assuming you have a watchlist feature for events
                        link={data.link}  // Assuming event details page by event ID
                        //  selectedEvent_Data={data}  // Pass current event data
                        selectedEvent_Array={eventsData}  // Pass entire event array for navigation
                    />
                )}
            </SectionSlider>
        </Fragment>
    );
});

UpcomingEvents.displayName = "UpcomingEvents";
export default UpcomingEvents;
