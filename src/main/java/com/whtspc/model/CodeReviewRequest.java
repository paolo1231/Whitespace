package com.whtspc.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CodeReviewRequest {

    @JsonProperty("code")
    private String code;

    public CodeReviewRequest() {
    }

    public CodeReviewRequest(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}