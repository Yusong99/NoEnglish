package org.noenglish.backend.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.noenglish.backend.entity.Word;
import org.noenglish.backend.repository.WordRepository;
import org.noenglish.backend.service.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class WordServiceImpl implements WordService {
    private WordRepository wordRepository;

    @Autowired
    public void WordService(WordRepository wordRepository) {
        this.wordRepository = wordRepository;
    }

    public List<Word> search(String keyword) {
        log.info("Searching for {}", keyword);
        if (keyword == null || keyword.isBlank()) {
            log.info("Keyword is null or blank");
            return List.of();
        }
        return wordRepository.search(keyword.trim());
    }
}
