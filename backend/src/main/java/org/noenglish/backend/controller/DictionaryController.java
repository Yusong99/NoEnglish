package org.noenglish.backend.controller;

import org.noenglish.backend.dto.DictionaryListResponse;
import org.noenglish.backend.entity.Dictionary;
import org.noenglish.backend.service.DictionaryService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dictionaries")
public class DictionaryController {

    private final DictionaryService dictionaryService;

    public DictionaryController(DictionaryService dictionaryService) {
        this.dictionaryService = dictionaryService;
    }

    /** 辞书列表（可选语言） */
    @GetMapping
    public List<DictionaryListResponse> list(
            @RequestParam(required = false) String lang
    ) {
        List<Dictionary> dictionaries =
                (lang == null)
                        ? dictionaryService.getAvailableDictionaries()
                        : dictionaryService.getAvailableDictionariesByLanguage(lang);

        return dictionaries.stream()
                .map(DictionaryListResponse::new)
                .toList();
    }
}
