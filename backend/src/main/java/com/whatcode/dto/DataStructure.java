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
public class DataStructure {
    private String type; // array, linkedList, tree, graph, stack, queue
    private Object data;
    private List<String> operations;
}

