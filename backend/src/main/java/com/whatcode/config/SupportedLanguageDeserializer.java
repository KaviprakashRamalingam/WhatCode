package com.whatcode.config;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.whatcode.model.SupportedLanguage;

import java.io.IOException;

public class SupportedLanguageDeserializer extends JsonDeserializer<SupportedLanguage> {
    
    @Override
    public SupportedLanguage deserialize(JsonParser p, DeserializationContext ctxt) 
            throws IOException {
        String value = p.getText();
        if (value == null || value.trim().isEmpty()) {
            return null;
        }
        try {
            return SupportedLanguage.fromString(value.trim());
        } catch (IllegalArgumentException e) {
            throw new IOException("Invalid language value: " + value, e);
        }
    }
}

