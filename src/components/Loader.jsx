import { Fragment, memo } from "react";
import { Spinner, Modal } from "react-bootstrap"; // Import necessary components from react-bootstrap

const Loader = memo(() => {
  return (
    <Fragment>
      <div className="vh-100">

        <Modal
          show={true} // Always show the loader modal
          centered
          backdrop="static"
          keyboard={false}
          className="d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
            border: 'none', // Remove border around modal
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
      </div>
    </Fragment>
  );
});

Loader.displayName = "Loader";
export default Loader;

// import { Fragment, memo } from "react";
// import LoaderGif from '/assets/images/Susila.png'

// const Loader = memo(() => {
//   return (
//     <Fragment>
//       <div className="loader simple-loader animate__animated">
//         <div className="loader-body">
//           <img
//             src={LoaderGif}
//             alt="loader"
//             className="img-fluid"
//             width="300"
//           />
//         </div>
//       </div>
//     </Fragment>

//   );
// });

// Loader.displayName = "Loader";
// export default Loader;


