import React, { useState, useRef } from "react";
import "./SkillBar.css";

export default function SkillBar({ name = "Compétence", defaultValue = 70, editable = false }) {
  const [value, setValue] = useState(defaultValue);
  const [showSlider, setShowSlider] = useState(false);
  const sliderRef = useRef(null);

  // Quand on clique sur la barre jaune → on affiche le slider
  const handleBarClick = (e) => {
    if (!editable) return;

    setShowSlider(true);

    // On positionne directement le slider selon l’endroit du clic
    const rect = e.target.getBoundingClientRect();
    const percent = Math.min(
      100,
      Math.max(0, ((e.clientX - rect.left) / rect.width) * 100)
    );
    setValue(percent);
  };

  // Dès qu’on relâche → on cache le slider
  const handleMouseUp = () => {
    setShowSlider(false);
  };

  return (
    <div className="skill-wrapper" onMouseUp={handleMouseUp}>
      {/* Titre de compétence + pourcentage */}
      <div className="skill-header">
        <span
          contentEditable={editable}
          suppressContentEditableWarning={true}
          className="skill-name"
        >
          {name}
        </span>
        <span className="skill-value">{Math.round(value)}%</span>
      </div>

      {/* Barre jaune */}
      <div className="skill-bar" onMouseDown={handleBarClick}>
        <div
          className="skill-bar-fill"
          style={{ width: `${value}%` }}
        ></div>
      </div>

      {/* Slider visible seulement pendant l'ajustement */}
      {editable && showSlider && (
        <input
          ref={sliderRef}
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="skill-slider-visible"
          autoFocus
        />
      )}
    </div>
  );
}
