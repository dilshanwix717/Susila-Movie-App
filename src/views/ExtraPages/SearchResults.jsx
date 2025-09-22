import { useEffect, useState, Fragment } from "react";
import { useLocation } from "react-router-dom";
import { Spinner, Button, Dropdown, Form } from "react-bootstrap";
import { AiOutlineFilter, AiOutlineSearch } from "react-icons/ai";
import { executeGetMovies, executeGetSusilaOriginals, executeGetSeries, executeGetContent, } from "../../api/endPoints";
import CardStyle from "../../components/cards/CardStyle";

const SearchResults = () => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("query") || "";

    const skeletons = Array.from({ length: 8 });

    useEffect(() => {
        const fetchResults = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const moviesResponse = await executeGetMovies();
                const seriesResponse = await executeGetSeries();

                const moviesData = moviesResponse?.data?.data || [];
                const seriesData = seriesResponse?.data?.data || [];
                const allData = [...moviesData, ...seriesData];

                let filteredResults = allData.filter((item) =>
                    item.title.toLowerCase().includes(query.toLowerCase())
                );
                // Apply the selected filter
                if (filter !== "All") {
                    filteredResults = filteredResults.filter(
                        (item) => item.category === filter
                    );
                }
                // Apply additional search term filtering
                if (searchTerm) {
                    filteredResults = filteredResults.filter((item) =>
                        item.title.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                }
                setResults(filteredResults);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Unable to fetch search results. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
    }, [query, filter, searchTerm]);

    return (
        <Fragment>
            <div
                className="search-results d-flex flex-column justify-content-center align-items-center"
                style={{
                    minHeight: "calc(100vh - 160px)", // Adjust height between header and footer
                    padding: "150px 40px",
                }}
            >
                <h2 className="mt-20 text-center mb-4">Search Results for "{query}"</h2>
                {/* Filter Button  */}
                <div className="d-flex justify-content-end w-100 mb-4">
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-primary" className="d-flex align-items-center"                        >
                            <AiOutlineFilter size={20} className="me-2" />
                            {filter}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setFilter("All")}>
                                All
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setFilter("Movies")}>
                                Movies
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setFilter("Series")}>
                                Series
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                {isLoading ? (
                    <div className="row w-100 mx-auto">
                        {skeletons.map((_, index) => (
                            <div key={index} className="col-5 col-md-3 col-lg-2"                            >
                                <div className="card skeleton-card border-0 shadow-sm">
                                    <div
                                        className="skeleton-image  w-100 mx-2"
                                        style={{
                                            height: "300px",
                                            width: "250px",
                                            borderRadius: "4px",
                                            backgroundColor: "#141314", // Dark color for skeleton background
                                        }}
                                    >
                                        <div
                                            className="skeleton-text mb-1"
                                            style={{
                                                height: "12px",
                                                width: "80%",
                                                borderRadius: "4px",
                                                backgroundColor: "#141314", // Dark color for skeleton background
                                            }}
                                        ></div>
                                    </div>
                                    <div className="p-2">
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center text-danger">{error}</div>
                ) : results.length ? (
                    <div className="row w-100 mx-auto">
                        {results.map((item) => (
                            <div key={item.id} className="col-6 col-md-4 col-lg-2 mb-3"                             >
                                <div
                                    style={{ transform: "scale(0.85)", transformOrigin: "top center", }}                                >
                                    <CardStyle
                                        image={item.thumbnail_url}
                                        title={item.title}
                                        link="/movies-detail"
                                        video_url={item.video_url}
                                        selectedVideo_Data={item}
                                        selectedVideo_Array={results}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center">No results found.</p>
                )}
            </div>
        </Fragment>
    );
};

export default SearchResults;
