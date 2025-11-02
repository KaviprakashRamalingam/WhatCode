package com.whatcode.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CodeExecutionResponse {
    private boolean success;
    private String output;
    private String error;
    private List<VisualizationStep> visualizationSteps;
    private Long executionTime;
}
