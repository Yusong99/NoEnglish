package org.noenglish.backend.controller;

import org.noenglish.backend.dto.WordSearchResponse;
import org.noenglish.backend.service.WordService;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/words")
@CrossOrigin
public class WordController {

    private final WordService wordService;

    public WordController(WordService wordService) {
        this.wordService = wordService;
    }

    @GetMapping("/search")
    public WordSearchResponse search(
            @RequestParam String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestAttribute("userId") Long userId
    ) {
//        Long userId = (long) request.getAttribute("userId");

//        Page<Word> result = wordService.search(q, page, size);

//        WordSearchResponse res = new HashMap<>();
//        res.put("list", result.getContent());
//        res.put("page", result.getNumber());
//        res.put("totalPages", result.getTotalPages());
//        res.put("totalElements", result.getTotalElements());
//        res.put("hasMore", result.hasNext());

//        return res;
        return wordService.search(q, page, size, userId);
    }

}
