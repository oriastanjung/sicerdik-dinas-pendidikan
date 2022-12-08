import WebViewer from "@pdftron/webviewer";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import SideBar from "../components/SideBar/SideBar";
import { useEffect, useRef } from "react";
import {
  useParams,
  useLocation,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
function TampilanBorang(props) {
  const viewer = useRef(null);
  const navigation = useNavigate();
  const [searchParams] = useSearchParams();
  const jsonData = {
    nama_siswa: searchParams.get("nama_siswa"),
    asal_sekolah: searchParams.get("asal_sekolah"),
    nomor_naskah: searchParams.get("nomor_naskah"),
  };
  console.log("searchparams >> ", searchParams.get("nama_siswa"));
  console.log("props >> ", props);

  console.log("query >> ", jsonData);
  useEffect(() => {
    WebViewer(
      { path: "lib", initialDoc: "/files/borang1.doc" },
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
        await documentViewer.getDocument().applyTemplateValues(jsonData);
      });
    });
  }, []);

  return (
    <div>
      <NavBar />
      <div className="d-flex flex-row justify-content-center">
        <div
          className="pt-3"
          style={{ width: "17%", borderRight: "2px solid #A19F9F" }}
        >
          <SideBar />
        </div>
        <main className="main pt-5 pb-5 px-2" style={{ width: "83%" }}>
          <div className="d-flex align-items-center mb-4">
            <div
              onClick={() => navigation(-1)}
              style={{ cursor: "pointer", marginRight: "40%" }}
            >
              <img
                src="https://img.icons8.com/pastel-glyph/200/circled-left.png"
                alt=""
                width={"50px"}
                height={"50px"}
              />
            </div>
            <h4 className="text-center">Tampilan Borang</h4>
          </div>
          <div
            className="webviewer"
            ref={viewer}
            style={{
              height: "100vh",

              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
        </main>
      </div>
    </div>
  );
}

export default TampilanBorang;
