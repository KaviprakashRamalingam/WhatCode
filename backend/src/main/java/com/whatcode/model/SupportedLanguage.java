package com.whatcode.model;

public enum SupportedLanguage {
    PYTHON("python"),
    JAVA("java"),
    TYPESCRIPT("typescript"),
    REACT("react");

    private final String value;

    SupportedLanguage(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static SupportedLanguage fromString(String value) {
        for (SupportedLanguage lang : SupportedLanguage.values()) {
            if (lang.value.equalsIgnoreCase(value)) {
                return lang;
            }
        }
        throw new IllegalArgumentException("Unsupported language: " + value);
    }
}
