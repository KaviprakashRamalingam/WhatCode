package com.whatcode.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StackFrame {
    private String functionName;
    private Map<String, Object> parameters;
    private Map<String, Object> localVariables;
    private Object returnValue;
    private Integer lineNumber;
}

