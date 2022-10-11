import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import styles from "./ViewSuratCard.module.css";
import iconEye from "../../assets/icon-eye.png";

function ViewSuratCard(props) {
  const [show, setShow] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const handleSetShow = () => {
    setShow(!show);
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
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
        <div className="d-flex justify-content-center align-items-center border border-secondary">
          {props.pdfFile ? (
            <Document
              file={props.pdfFile}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
            </Document>
          ) : (
            <p className={styles.noSurat}>Surat Tidak Dilampirkan</p>
          )}
        </div>
      )}
    </>
  );
}

export default ViewSuratCard;
