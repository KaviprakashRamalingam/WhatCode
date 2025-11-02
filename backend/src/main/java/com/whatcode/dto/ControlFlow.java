package com.whatcode.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ControlFlow {
    private Integer fromLine;
    private Integer toLine;
    private String type; // sequential, branch, loop, return, call
    private Boolean condition;
}

