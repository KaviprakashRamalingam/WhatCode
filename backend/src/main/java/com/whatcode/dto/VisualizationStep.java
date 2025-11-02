package com.whatcode.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VisualizationStep {
    private int stepNumber;
    private String description;
    private Map<String, Object> variableStates;
    private Integer lineHighlight;
    private String output;
    private List<StackFrame> stackFrames;
    private List<MemoryObject> memoryObjects;
    private List<ControlFlow> controlFlow;
    private List<DataStructure> dataStructures;
    private Long timestamp;
}
