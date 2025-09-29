package com.whtspc.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;
import java.util.ArrayList;
import java.util.List;

public record CodeReviewResponse(
        String explanation,
        List<String> issues,
        List<String> suggestions,
        List<String> tigerStyle
        ) {

    @JsonCreator
    public static CodeReviewResponse create(
            @JsonProperty("explanation") JsonNode explanation,
            @JsonProperty("issues") JsonNode issues,
            @JsonProperty("suggestions") JsonNode suggestions,
            @JsonProperty("tigerStyle") JsonNode tigerStyle
    ) {
        return new CodeReviewResponse(
                parseStringOrArray(explanation),
                parseArray(issues),
                parseArray(suggestions),
                parseArray(tigerStyle)
        );
    }

    private static String parseStringOrArray(JsonNode node) {
        if (node == null) {
            return "";
        }
        if (node.isTextual()) {
            return node.asText();
        }
        if (node.isArray() && node.size() > 0) {
            return node.get(0).asText();
        }
        return node.toString();
    }

    private static List<String> parseArray(JsonNode node) {
        List<String> result = new ArrayList<>();
        if (node == null) {
            return result;
        }

        if (node.isArray()) {
            node.forEach(item -> result.add(item.asText()));
        } else if (node.isTextual()) {
            result.add(node.asText());
        }
        return result;
    }
}
