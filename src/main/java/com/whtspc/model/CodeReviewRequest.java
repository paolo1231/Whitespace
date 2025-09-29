package com.whtspc.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public record CodeReviewRequest(String code, String language) {
    
    @JsonCreator
    public static CodeReviewRequest create(
            @JsonProperty("code") String code,
            @JsonProperty("language") String language) {
        return new CodeReviewRequest(code, language != null ? language : "java");
    }
    
    public CodeReviewRequest(String code) {
        this(code, "java");
    }
}