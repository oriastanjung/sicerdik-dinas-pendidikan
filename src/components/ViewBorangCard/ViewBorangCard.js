import React, { useState, useRef, useEffect } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import styles from "./ViewBorangCard.module.css";
import iconEye from "../../assets/icon-eye.png";
import { useReactToPrint } from "react-to-print";
import { apiFile } from "../../config/index";
import WebViewer from "@pdftron/webviewer";
function ViewBorangCard(props) {
  const [show, setShow] = useState(false);
  const viewer = useRef(null);

  const handleSetShow = () => {
    setShow(!show);
  };

  useEffect(() => {
    console.log("props.file >>> ", props.file);
    console.log("props.data >>> ", props.data);
    WebViewer(
      { path: "lib", initialDoc: `/files/${props.file}` },
      viewer.current
    ).then((instance) => {
      instance.UI.disableElements(["toolbarGroup-Shapes"]);
      instance.UI.disableElements(["toolbarGroup-Edit"]);
      instance.UI.disableElements(["toolbarGroup-Insert"]);
      instance.UI.disableElements(["toolbarGroup-View"]);
      instance.UI.disableElements(["toolbarGroup-Annotate"]);
      instance.UI.disableElements(["toolbarGroup-Forms"]);
      instance.UI.disableElements(["toolbarGroup-Button"]);
      instance.UI.disableElements(["toolbarGroup-FillAndSign"]);
      instance.UI.disableElements(["signatureToolGroupButton"]);
      instance.UI.disableElements(["notesPanel"]);
      instance.UI.disableElements(["viewControlsButton"]);
      instance.UI.disableElements(["selectToolButton"]);
      instance.UI.disableElements(["toggleNotesButton"]);
      instance.UI.disableElements(["searchButton"]);
      instance.UI.disableElements(["freeTextToolGroupButton"]);
      instance.UI.disableElements(["crossStampToolButton"]);
      instance.UI.disableElements(["checkStampToolButton"]);
      instance.UI.disableElements(["rubberStampToolGroupButton"]);
      instance.UI.disableElements(["dateFreeTextToolButton"]);
      instance.UI.disableElements(["eraserToolButton"]);
      instance.UI.disableElements(["panToolButton"]);
      instance.UI.disableElements(["signatureToolGroupButton"]);
      instance.UI.disableElements(["viewControlsOverlay"]);
      instance.UI.disableElements(["ribbons"]);
      instance.UI.disableElements(["tools"]);
      instance.UI.disableElements(["headerItems"]);
      instance.UI.disableElements(["toolsHeader"]);
      const { documentViewer } = instance.Core;

      documentViewer.addEventListener("documentLoaded", async () => {
        await documentViewer.getDocument().documentCompletePromise();
        documentViewer.updateView();
        await documentViewer.getDocument().applyTemplateValues(props.data);
      });
      console.log("selesai");
    });
  }, []);
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
        <div
          className="webviewer"
          ref={viewer}
          style={{ height: "100vh", width: "50%" }}
        ></div>
      )}
    </>
  );
}

export default ViewBorangCard;
