package com.whtspc.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CodeReviewResponse {

    @JsonProperty("explanation")
    private String explanation;

    @JsonProperty("issues")
    private String issues;

    @JsonProperty("suggestions")
    private String suggestions;

    @JsonProperty("tigerStyle")
    private String tigerStyle;

    public CodeReviewResponse() {
    }

    public CodeReviewResponse(String explanation, String issues, String suggestions, String tigerStyle) {
        this.explanation = explanation;
        this.issues = issues;
        this.suggestions = suggestions;
        this.tigerStyle = tigerStyle;
    }

    public String getExplanation() {
        return explanation;
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }

    public String getIssues() {
        return issues;
    }

    public void setIssues(String issues) {
        this.issues = issues;
    }

    public String getSuggestions() {
        return suggestions;
    }

    public void setSuggestions(String suggestions) {
        this.suggestions = suggestions;
    }

    public String getTigerStyle() {
        return tigerStyle;
    }

    public void setTigerStyle(String tigerStyle) {
        this.tigerStyle = tigerStyle;
    }
}