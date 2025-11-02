package com.whatcode.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.whatcode.config.SupportedLanguageDeserializer;
import com.whatcode.model.SupportedLanguage;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CodeExecutionRequest {

    @NotBlank(message = "Code cannot be blank")
    private String code;

    @NotNull(message = "Language cannot be null")
    @JsonDeserialize(using = SupportedLanguageDeserializer.class)
    private SupportedLanguage language;
}
