package org.noenglish.backend.controller;

import org.noenglish.backend.entity.Word;
import org.noenglish.backend.service.WordService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/words")
@CrossOrigin
public class WordController {

    private final WordService wordService;

    public WordController(WordService wordService) {
        this.wordService = wordService;
    }

    @GetMapping("/search")
    public Map<String, Object> search(
            @RequestParam String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<Word> result = wordService.search(q, page, size);

        Map<String, Object> res = new HashMap<>();
        res.put("list", result.getContent());
        res.put("page", result.getNumber());
        res.put("totalPages", result.getTotalPages());
        res.put("totalElements", result.getTotalElements());
        res.put("hasMore", result.hasNext());

        return res;
    }

}
