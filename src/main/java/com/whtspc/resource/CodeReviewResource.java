package com.whtspc.resource;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.whtspc.model.CodeReviewRequest;
import com.whtspc.model.CodeReviewResponse;
import com.whtspc.service.CodeReviewService;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/review")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CodeReviewResource {

    private static final String EMPTY_CODE_ERROR = "{\"error\": \"Code field is required and cannot be empty\"}";
    private static final String PROCESSING_ERROR = "{\"error\": \"Failed to process code review\"}";
    private static final String HEALTH_RESPONSE = "{\"status\": \"UP\", \"service\": \"Whitespace\"}";
    private static final String INVALID_RESPONSE_ERROR = "{\"error\": \"Invalid AI response format\"}";

    @Inject
    CodeReviewService codeReviewService;

    @Inject
    ObjectMapper objectMapper;

    @POST
    public Response reviewCode(CodeReviewRequest request) {
        try {
            if (request == null || request.getCode() == null || request.getCode().trim().isEmpty()) {
                throw new IllegalArgumentException("Empty code");
            }
            String code = request.getCode();
            String language = request.getLanguage();

            String aiResponse = codeReviewService.reviewCode(code, language);
            CodeReviewResponse response = objectMapper.readValue(aiResponse, CodeReviewResponse.class);

            return Response.ok(response).build();

        } catch (IllegalArgumentException e) {
            // Invalid input: missing or empty code
            return buildErrorResponse(Response.Status.BAD_REQUEST, EMPTY_CODE_ERROR);
        } catch (JsonProcessingException e) {
            // AI response parsing failed: malformed JSON from AI service
            return buildErrorResponse(Response.Status.INTERNAL_SERVER_ERROR, INVALID_RESPONSE_ERROR);
        } catch (RuntimeException e) {
            // General processing error: AI service or other runtime issues
            return buildErrorResponse(Response.Status.INTERNAL_SERVER_ERROR, PROCESSING_ERROR);
        }
    }

    @GET
    @Path("/health")
    public Response health() {
        return Response.ok(HEALTH_RESPONSE).build();
    }

    private Response buildErrorResponse(Response.Status status, String errorMessage) {
        return Response.status(status).entity(errorMessage).build();
    }
}