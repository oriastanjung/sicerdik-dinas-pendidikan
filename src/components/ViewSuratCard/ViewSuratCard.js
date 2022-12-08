import React, { useState, useRef } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import styles from "./ViewSuratCard.module.css";
import iconEye from "../../assets/icon-eye.png";
import { useReactToPrint } from "react-to-print";
import { apiFile } from "../../config/index";
function ViewSuratCard(props) {
  const [show, setShow] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const printArea = useRef();

  const handleSetShow = () => {
    setShow(!show);
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handlePrint = useReactToPrint({
    content: () => printArea.current,
    documentTitle: "emp-data",
  });
  return (
    <>
      <div className={`${styles.card} mb-2`}>
        <div className={styles.label}>
          <p>{props.label}</p>
        </div>
        <div className={styles.icon} onClick={handleSetShow}>
          <img src={iconEye} alt="" />
        </div>
      </div>

      {show && (
        <div>
          <div
            // id="printarea"
            ref={printArea}
            className="d-flex justify-content-center align-items-center border border-secondary"
          >
            {props.pdfFile ? (
              <Document
                file={{ url: `${apiFile}/${props.pdfFile}` }}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                {console.log("props pdfFile >> ", props.pdfFile)}
                <Page pageNumber={pageNumber} renderInteractiveForms={true} />
              </Document>
            ) : (
              <p className={styles.noSurat}>Surat Tidak Dilampirkan</p>
            )}
          </div>
          {props.pdfFile && (
            <div className={`${styles.buttonCetak} my-3 me-4`}>
              <button onClick={handlePrint}>Cetak</button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ViewSuratCard;
