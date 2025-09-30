package com.whtspc.service;

import dev.langchain4j.model.chat.ChatModel;
import dev.langchain4j.model.openai.OpenAiChatModel;
import dev.langchain4j.service.AiServices;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@ApplicationScoped
public class DynamicCodeReviewService {

    @Inject
    @ConfigProperty(name = "quarkus.langchain4j.openai.api-key")
    String openaiApiKey;

    @Inject
    @ConfigProperty(name = "grok.api-key", defaultValue = "")
    String grokApiKey;

    private final Map<String, CodeReviewService> serviceCache = new ConcurrentHashMap<>();

    public String reviewCode(String code, String language, String modelId) {
        CodeReviewService service = getOrCreateService(modelId);
        return service.reviewCode(code, language);
    }

    private CodeReviewService getOrCreateService(String modelId) {
        return serviceCache.computeIfAbsent(modelId, this::createService);
    }

    private CodeReviewService createService(String modelId) {
        ChatModel chatModel = createChatModel(modelId);
        return AiServices.create(CodeReviewService.class, chatModel);
    }

    private ChatModel createChatModel(String modelId) {
        ModelInfo model = getModelInfo(modelId);
        
        var builder = OpenAiChatModel.builder()
            .modelName(model.apiName)
            .maxTokens(model.maxTokens);
            
        return switch (model.provider) {
            case "openai" -> builder.apiKey(openaiApiKey).build();
            case "grok" -> builder.apiKey(grokApiKey).baseUrl("https://api.x.ai/v1").build();
            default -> throw new IllegalArgumentException("Unknown provider: " + model.provider);
        };
    }

    private ModelInfo getModelInfo(String modelId) {
        return Map.of(
            "gpt-4o-mini", new ModelInfo("gpt-4o-mini", "openai", "gpt-4o-mini", 4000),
            "gpt-3.5-turbo", new ModelInfo("gpt-3.5-turbo", "openai", "gpt-3.5-turbo", 4000),
            "gpt-5-nano", new ModelInfo("gpt-5-nano", "openai", "gpt-5-nano", 4000),
            "gpt-4.1-nano", new ModelInfo("gpt-4.1-nano", "openai", "gpt-4.1-nano", 3500),
            "grok-code-fast-1", new ModelInfo("grok-code-fast-1", "grok", "grok-code-fast-1", 3000)
        ).get(modelId);
    }

    record ModelInfo(String id, String provider, String apiName, int maxTokens) {}
}
