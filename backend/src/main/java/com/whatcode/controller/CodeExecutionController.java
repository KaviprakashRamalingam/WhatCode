package com.whatcode.controller;

import com.whatcode.dto.CodeExecutionRequest;
import com.whatcode.dto.CodeExecutionResponse;
import com.whatcode.service.CodeExecutionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class CodeExecutionController {

    private final CodeExecutionService codeExecutionService;

    public CodeExecutionController(CodeExecutionService codeExecutionService) {
        this.codeExecutionService = codeExecutionService;
    }

    @PostMapping("/execute")
    public ResponseEntity<CodeExecutionResponse> executeCode(
            @Valid @RequestBody CodeExecutionRequest request
    ) {
        CodeExecutionResponse response = codeExecutionService.executeCode(request);
        return ResponseEntity.status(
                response.isSuccess() ? HttpStatus.OK : HttpStatus.BAD_REQUEST
        ).body(response);
    }

    @PostMapping("/visualize")
    public ResponseEntity<CodeExecutionResponse> visualizeCode(
            @Valid @RequestBody CodeExecutionRequest request
    ) {
        CodeExecutionResponse response = codeExecutionService.visualizeCode(request);
        return ResponseEntity.status(
                response.isSuccess() ? HttpStatus.OK : HttpStatus.BAD_REQUEST
        ).body(response);
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("WhatCode Backend is running");
    }
}

