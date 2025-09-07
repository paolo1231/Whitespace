package com.example.resource;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.containsString;

@QuarkusTest
public class CodeReviewResourceTest {

    @Test
    public void testHealthEndpoint() {
        given()
                .when().get("/review/health")
                .then()
                .statusCode(200)
                .body(containsString("UP"));
    }

    @Test
    public void testReviewEndpointWithEmptyCode() {
        given()
                .contentType(ContentType.JSON)
                .body("{\"code\": \"\"}")
                .when().post("/review")
                .then()
                .statusCode(400)
                .body(containsString("Code field is required"));
    }

    @Test
    public void testReviewEndpointWithMissingCode() {
        given()
                .contentType(ContentType.JSON)
                .body("{}")
                .when().post("/review")
                .then()
                .statusCode(400)
                .body(containsString("Code field is required"));
    }
}