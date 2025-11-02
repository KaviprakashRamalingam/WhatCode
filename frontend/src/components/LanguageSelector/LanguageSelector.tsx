import React from "react";
import { SupportedLanguage, LanguageOption } from "../../types";
import { LANGUAGE_OPTIONS } from "../../utils/languageConfig";
import "./LanguageSelector.css";

interface LanguageSelectorProps {
  selectedLanguage: SupportedLanguage;
  onLanguageChange: (language: SupportedLanguage) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onLanguageChange(event.target.value as SupportedLanguage);
  };

  return (
    <div className="language-selector">
      <label htmlFor="language-select" className="language-label">
        Select Language:
      </label>
      <select
        id="language-select"
        className="language-select"
        value={selectedLanguage}
        onChange={handleChange}
      >
        {LANGUAGE_OPTIONS.map((option: LanguageOption) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
