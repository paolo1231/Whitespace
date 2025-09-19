package com.whtspc.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CodeReviewRequest {

    @JsonProperty("code")
    private String code;

    @JsonProperty("language")
    private String language = "java"; // Default to Java for backward compatibility

    public CodeReviewRequest() {
    }

    public CodeReviewRequest(String code) {
        this.code = code;
    }

    public CodeReviewRequest(String code, String language) {
        this.code = code;
        this.language = language;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }
}