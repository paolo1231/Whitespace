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
    private static final Object INVALID_RESPONSE_ERROR = "{\"error\": \"Invalid AI response format\"}";

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
            String language = request.getLanguage() != null ? request.getLanguage() : "java";

            String aiResponse = codeReviewService.reviewCode(code, language);
            CodeReviewResponse response = objectMapper.readValue(aiResponse, CodeReviewResponse.class);

            return Response.ok(response).build();

        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(EMPTY_CODE_ERROR)
                    .build();
        } catch (JsonProcessingException e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(INVALID_RESPONSE_ERROR)
                    .build();
        } catch (RuntimeException e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(PROCESSING_ERROR)
                    .build();
        }
    }

    @GET
    @Path("/health")
    public Response health() {
        return Response.ok(HEALTH_RESPONSE).build();
    }
}