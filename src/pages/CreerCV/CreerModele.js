import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import Modele1 from "../../components/models/Modele1";
import Modele2 from "../../components/models/Modele2";
import Modele3 from "../../components/models/Modele3";
import Modele4 from "../../components/models/Modele4";

export default function CreerModele() {
  const { modele } = useParams();
  const cvRef = useRef();

  const telechargerPDF = async () => {
    const element = cvRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "pt", "a4");
    const imgWidth = 595;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("Mon_CV.pdf");
  };

  const renderModele = () => {
    switch (modele) {
      case "modele1":
        return <Modele1 editable />;
      case "modele2":
        return <Modele2 editable />;
      case "modele3":
        return <Modele3 editable />;
      case "modele4":
        return <Modele4 editable />;
      default:
        return <div>Modèle introuvable</div>;
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <div ref={cvRef}>{renderModele()}</div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
        <button
          onClick={telechargerPDF}
          style={{
            padding: "12px 20px",
            fontSize: "16px",
            borderRadius: "8px",
            background: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Télécharger
        </button>
      </div>
    </div>
  );
}
