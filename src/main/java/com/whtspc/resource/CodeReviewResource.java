package com.whtspc.resource;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.whtspc.model.CodeReviewRequest;
import com.whtspc.model.CodeReviewResponse;
import com.whtspc.service.DynamicCodeReviewService;

import java.util.List;

import io.quarkus.logging.Log;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/review")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CodeReviewResource {

    private static final String HEALTH_RESPONSE = "{\"status\": \"UP\", \"service\": \"Whitespace\"}";

    @Inject
    DynamicCodeReviewService dynamicCodeReviewService;

    @Inject
    ObjectMapper objectMapper;

    @POST
    public Response reviewCode(CodeReviewRequest request) {
        try {
            if (request == null || request.code() == null || request.code().trim().isEmpty()) {
                return errorResponse(Response.Status.BAD_REQUEST, "Code field is required and cannot be empty");
            }

            String aiResponse = dynamicCodeReviewService.reviewCode(request.code(), request.language(), request.model());
            Log.debug("AI Response: " + aiResponse);

            // Clean and parse the AI response
            String cleanedResponse = cleanAiResponse(aiResponse);
            CodeReviewResponse response = objectMapper.readValue(cleanedResponse, CodeReviewResponse.class);
            return Response.ok(response).build();

        } catch (JsonProcessingException e) {
            Log.error("Failed to parse AI response: " + e.getMessage());
            return createFallbackResponse(request.code(), request.language());
        } catch (RuntimeException e) {
            return errorResponse(Response.Status.INTERNAL_SERVER_ERROR, "Failed to process code review");
        }
    }

    private String cleanAiResponse(String response) {
        if (response == null) {
            return "{}";
        }

        // Remove markdown code blocks
        String cleaned = response.replaceAll("```json\\s*", "").replaceAll("```\\s*", "");

        // Find JSON content between first { and last }
        int firstBrace = cleaned.indexOf('{');
        int lastBrace = cleaned.lastIndexOf('}');

        if (firstBrace != -1 && lastBrace != -1 && lastBrace > firstBrace) {
            cleaned = cleaned.substring(firstBrace, lastBrace + 1);
        }

        // Fix common JSON formatting issues
        cleaned = fixJsonFormatting(cleaned);

        return cleaned.trim();
    }

    private String fixJsonFormatting(String json) {
        // Find and fix the formattedCode field specifically
        int start = json.indexOf("\"formattedCode\":");
        if (start == -1) {
            return json;
        }

        int valueStart = json.indexOf("\"", start + 15) + 1;
        int valueEnd = json.lastIndexOf("\"");

        if (valueStart <= 0 || valueEnd <= valueStart) {
            return json;
        }

        String codeValue = json.substring(valueStart, valueEnd);
        String escapedCode = codeValue
                .replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "\\r")
                .replace("\t", "\\t");

        return json.substring(0, valueStart) + escapedCode + json.substring(valueEnd);
    }

    private Response createFallbackResponse(String code, String language) {
        // Create a basic response when JSON parsing fails
        CodeReviewResponse fallback = new CodeReviewResponse(
                "Code analysis completed for " + (language != null ? language.toUpperCase() : "unknown") + " code.",
                List.of("Unable to parse detailed analysis - please try again"),
                List.of("Consider reviewing code manually for best practices"),
                List.of("Apply Tiger Style principles: remove unnecessary complexity and focus on clarity"),
                code // Return original code as fallback
        );
        return Response.ok(fallback).build();
    }

    @GET
    @Path("/health")
    public Response health() {
        return Response.ok(HEALTH_RESPONSE).build();
    }

    private Response errorResponse(Response.Status status, String message) {
        return Response.status(status).entity("{\"error\": \"" + message + "\"}").build();
    }
}
