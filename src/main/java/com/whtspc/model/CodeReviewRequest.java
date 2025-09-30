package com.whtspc.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public record CodeReviewRequest(String code, String language, String model) {

    @JsonCreator
    public static CodeReviewRequest create(
            @JsonProperty("code") String code,
            @JsonProperty("language") String language,
            @JsonProperty("model") String model) {
        return new CodeReviewRequest(code,
                language != null ? language : "java",
                model != null ? model : "gpt-5-nano");
    }

    public CodeReviewRequest(String code) {
        this(code, "java", "gpt-5-nano");
    }

    public CodeReviewRequest(String code, String language) {
        this(code, language, "gpt-5-nano");
    }
}
