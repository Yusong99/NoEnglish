package org.noenglish.backend.controller;

import org.noenglish.backend.entity.Word;
import org.noenglish.backend.service.WordService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/words")
@CrossOrigin
public class WordController {

    private final WordService wordService;

    public WordController(WordService wordService) {
        this.wordService = wordService;
    }

    @GetMapping("/search")
    public List<Word> search(@RequestParam("q") String q) {
        return wordService.search(q);
    }
}
