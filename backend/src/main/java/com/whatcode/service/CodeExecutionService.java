package com.whatcode.service;

import com.whatcode.dto.*;
import com.whatcode.model.SupportedLanguage;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class CodeExecutionService {

    public CodeExecutionResponse executeCode(CodeExecutionRequest request) {
        long startTime = System.currentTimeMillis();

        try {
            // This is a placeholder implementation
            // In a real implementation, you would:
            // 1. Execute the code in a sandboxed environment
            // 2. Capture stdout/stderr
            // 3. Handle errors appropriately

            String output = simulateExecution(request.getCode(), request.getLanguage());
            long executionTime = System.currentTimeMillis() - startTime;

            return CodeExecutionResponse.builder()
                    .success(true)
                    .output(output)
                    .executionTime(executionTime)
                    .build();
        } catch (Exception e) {
            long executionTime = System.currentTimeMillis() - startTime;
            return CodeExecutionResponse.builder()
                    .success(false)
                    .error(e.getMessage())
                    .executionTime(executionTime)
                    .build();
        }
    }

    public CodeExecutionResponse visualizeCode(CodeExecutionRequest request) {
        long startTime = System.currentTimeMillis();

        try {
            List<VisualizationStep> steps = generateVisualizationSteps(
                    request.getCode(),
                    request.getLanguage());
            long executionTime = System.currentTimeMillis() - startTime;

            String output = extractOutput(steps);

            return CodeExecutionResponse.builder()
                    .success(true)
                    .output(output)
                    .visualizationSteps(steps)
                    .executionTime(executionTime)
                    .build();
        } catch (Exception e) {
            long executionTime = System.currentTimeMillis() - startTime;
            return CodeExecutionResponse.builder()
                    .success(false)
                    .error(e.getMessage())
                    .executionTime(executionTime)
                    .build();
        }
    }

    private String simulateExecution(String code, SupportedLanguage language) {
        // Placeholder implementation - simulate code execution
        // In production, this would use actual code execution engines
        return switch (language) {
            case PYTHON -> "Code executed successfully\nOutput: [Simulated Python execution]";
            case JAVA -> "Code executed successfully\nOutput: [Simulated Java execution]";
            case TYPESCRIPT -> "Code executed successfully\nOutput: [Simulated TypeScript execution]";
            case REACT -> "Code executed successfully\nOutput: [Simulated React execution]";
        };
    }

    private List<VisualizationStep> generateVisualizationSteps(
            String code,
            SupportedLanguage language) {
        List<VisualizationStep> steps = new ArrayList<>();
        String[] lines = code.split("\n");

        // Generate enhanced visualization steps
        int stepNum = 1;
        Map<String, Object> variables = new HashMap<>();
        List<StackFrame> stackFrames = new ArrayList<>();
        List<MemoryObject> memoryObjects = new ArrayList<>();
        List<ControlFlow> controlFlow = new ArrayList<>();
        List<DataStructure> dataStructures = new ArrayList<>();

        for (int i = 0; i < Math.min(lines.length, 15); i++) {
            String line = lines[i].trim();
            if (line.isEmpty() || line.startsWith("//") || line.startsWith("#")) {
                continue;
            }

            // Generate stack frames for function calls
            if (line.contains("def ") || line.contains("function ") || line.contains("public static")) {
                String funcName = extractFunctionName(line);
                Map<String, Object> params = extractParameters(line);
                stackFrames.add(StackFrame.builder()
                        .functionName(funcName)
                        .parameters(params)
                        .localVariables(new HashMap<>())
                        .lineNumber(i + 1)
                        .build());
            }

            // Generate control flow
            if (i > 0) {
                ControlFlow flow = generateControlFlow(lines, i, language);
                if (flow != null) {
                    controlFlow.add(flow);
                }
            }

            // Detect data structures
            detectDataStructures(line, variables, dataStructures);

            // Generate memory objects for new variables
            if (line.contains("=") && !line.contains("==")) {
                String varName = extractVariableName(line);
                Object value = extractVariableValue(line, variables);
                variables.put(varName, value);
                
                memoryObjects.add(MemoryObject.builder()
                        .address("0x" + UUID.randomUUID().toString().substring(0, 8))
                        .type(detectType(value))
                        .value(value)
                        .references(List.of(varName))
                        .build());
            }

            VisualizationStep step = VisualizationStep.builder()
                    .stepNumber(stepNum++)
                    .description(generateStepDescription(line, language))
                    .lineHighlight(i + 1)
                    .variableStates(new HashMap<>(variables))
                    .stackFrames(new ArrayList<>(stackFrames))
                    .memoryObjects(new ArrayList<>(memoryObjects))
                    .controlFlow(new ArrayList<>(controlFlow))
                    .dataStructures(new ArrayList<>(dataStructures))
                    .timestamp(System.currentTimeMillis())
                    .build();

            steps.add(step);

            // Remove stack frame on return
            if (line.contains("return")) {
                if (!stackFrames.isEmpty()) {
                    stackFrames.remove(stackFrames.size() - 1);
                }
            }
        }

        // Add final output step
        if (!steps.isEmpty()) {
            steps.add(VisualizationStep.builder()
                    .stepNumber(stepNum)
                    .description("Execution completed")
                    .output(simulateExecution(code, language))
                    .variableStates(variables)
                    .stackFrames(stackFrames)
                    .memoryObjects(memoryObjects)
                    .controlFlow(controlFlow)
                    .dataStructures(dataStructures)
                    .timestamp(System.currentTimeMillis())
                    .build());
        }

        return steps;
    }

    private String generateStepDescription(String line, SupportedLanguage language) {
        // Generate human-readable descriptions
        if (line.contains("def ") || line.contains("function ")) {
            return "Defining a function";
        } else if (line.contains("if ")) {
            return "Checking condition";
        } else if (line.contains("for ") || line.contains("while ")) {
            return "Starting loop iteration";
        } else if (line.contains("=")) {
            return "Assigning value to variable";
        } else if (line.contains("print") || line.contains("System.out.println") || line.contains("console.log")) {
            return "Printing output";
        } else if (line.contains("return")) {
            return "Returning value";
        }
        return "Executing line: " + line.substring(0, Math.min(50, line.length()));
    }

    private void trackVariables(String line, Map<String, Object> variables) {
        // Simple variable tracking simulation
        if (line.contains("=") && !line.contains("==")) {
            String varName = extractVariableName(line);
            Object value = extractVariableValue(line, variables);
            variables.put(varName, value);
        }
    }

    private String extractFunctionName(String line) {
        if (line.contains("def ")) {
            String afterDef = line.substring(line.indexOf("def ") + 4).trim();
            return afterDef.split("[(\s]")[0];
        } else if (line.contains("function ")) {
            String afterFunc = line.substring(line.indexOf("function ") + 9).trim();
            return afterFunc.split("[(\s]")[0];
        } else if (line.contains("public static")) {
            String[] parts = line.split("\\s+");
            for (int i = 0; i < parts.length; i++) {
                if (parts[i].contains("(")) {
                    return parts[i].split("\\(")[0];
                }
            }
        }
        return "unknown";
    }

    private Map<String, Object> extractParameters(String line) {
        Map<String, Object> params = new HashMap<>();
        if (line.contains("(") && line.contains(")")) {
            String paramStr = line.substring(line.indexOf("(") + 1, line.indexOf(")"));
            String[] paramsArr = paramStr.split(",");
            for (String param : paramsArr) {
                String trimmed = param.trim();
                if (!trimmed.isEmpty()) {
                    String name = trimmed.split("[:\\s]")[0].trim();
                    params.put(name, "value");
                }
            }
        }
        return params;
    }

    private String extractVariableName(String line) {
        String[] parts = line.split("=");
        if (parts.length >= 2) {
            String leftSide = parts[0].trim();
            leftSide = leftSide.replaceAll("(var|let|const|int|String|double|float|final)\\s+", "");
            return leftSide.split("[\\[\\s]")[0].trim();
        }
        return "unknown";
    }

    private Object extractVariableValue(String line, Map<String, Object> existingVars) {
        String[] parts = line.split("=");
        if (parts.length >= 2) {
            String rightSide = parts[1].trim().replaceAll("[;]", "");
            
            // Try to parse as number
            try {
                if (rightSide.contains(".")) {
                    return Double.parseDouble(rightSide);
                } else {
                    return Integer.parseInt(rightSide);
                }
            } catch (NumberFormatException e) {
                // Check if it's a string literal
                if (rightSide.startsWith("\"") || rightSide.startsWith("'")) {
                    return rightSide.substring(1, rightSide.length() - 1);
                }
                // Check if it's an array/list
                if (rightSide.contains("[") || rightSide.contains("{")) {
                    return parseArrayOrList(rightSide);
                }
                // Check if variable reference
                if (existingVars.containsKey(rightSide)) {
                    return existingVars.get(rightSide);
                }
            }
        }
        return "value";
    }

    private Object parseArrayOrList(String str) {
        if (str.contains("[")) {
            String content = str.substring(str.indexOf("[") + 1, str.lastIndexOf("]"));
            String[] items = content.split(",");
            List<Object> list = new ArrayList<>();
            for (String item : items) {
                String trimmed = item.trim();
                try {
                    if (trimmed.contains(".")) {
                        list.add(Double.parseDouble(trimmed));
                    } else {
                        list.add(Integer.parseInt(trimmed));
                    }
                } catch (NumberFormatException e) {
                    list.add(trimmed.replaceAll("[\"']", ""));
                }
            }
            return list;
        }
        return List.of();
    }

    private String detectType(Object value) {
        if (value instanceof Integer) return "int";
        if (value instanceof Double) return "double";
        if (value instanceof String) return "String";
        if (value instanceof List) return "List/Array";
        return "Object";
    }

    private ControlFlow generateControlFlow(String[] lines, int currentIndex, SupportedLanguage language) {
        if (currentIndex == 0) return null;
        
        String currentLine = lines[currentIndex].trim();
        String prevLine = lines[currentIndex - 1].trim();
        
        int fromLine = currentIndex;
        int toLine = currentIndex + 1;
        String type = "sequential";
        Boolean condition = null;

        if (prevLine.contains("if ")) {
            type = "branch";
            condition = !currentLine.contains("else");
        } else if (prevLine.contains("for ") || prevLine.contains("while ")) {
            type = "loop";
        } else if (currentLine.contains("return")) {
            type = "return";
        } else if (currentLine.contains("(") && !currentLine.contains("=")) {
            type = "call";
        }

        return ControlFlow.builder()
                .fromLine(fromLine)
                .toLine(toLine)
                .type(type)
                .condition(condition)
                .build();
    }

    private void detectDataStructures(String line, Map<String, Object> variables, List<DataStructure> dataStructures) {
        if (line.contains("=") && !line.contains("==")) {
            String varName = extractVariableName(line);
            Object value = extractVariableValue(line, variables);
            
            if (value instanceof List) {
                List<?> list = (List<?>) value;
                dataStructures.add(DataStructure.builder()
                        .type(list.size() > 0 && list.get(0) instanceof List ? "graph" : "array")
                        .data(list)
                        .operations(List.of("read", "write"))
                        .build());
            }
        }
    }

    private String extractOutput(List<VisualizationStep> steps) {
        return steps.stream()
                .filter(step -> step.getOutput() != null)
                .map(VisualizationStep::getOutput)
                .reduce((a, b) -> a + "\n" + b)
                .orElse("Execution completed");
    }
}
