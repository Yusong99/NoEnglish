package org.noenglish.backend.controller;

import lombok.RequiredArgsConstructor;
import org.noenglish.backend.common.ApiResponse;
import org.noenglish.backend.dto.VocabularySimpleDTO;
import org.noenglish.backend.service.VocabularyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vocab")
@RequiredArgsConstructor
public class VocabularyController {

    private final VocabularyService vocabularyService;

    /**
     * 示例：
     * GET /api/vocab/random?level=N2
     * GET /api/vocab/random?level=N3
     */
    @GetMapping("/random")
    public ApiResponse<List<VocabularySimpleDTO>> random(
            @RequestParam String level
    ) {
        return ApiResponse.success(
                vocabularyService.randomByLevel(level)
        );
    }
}