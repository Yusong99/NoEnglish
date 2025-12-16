package org.noenglish.backend.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.noenglish.backend.entity.Word;
import org.noenglish.backend.repository.WordRepository;
import org.noenglish.backend.service.WordService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class WordServiceImpl implements WordService {
    private final WordRepository wordRepository;

    public WordServiceImpl(WordRepository wordRepository) {
        this.wordRepository = wordRepository;
    }

    @Override
    public Page<Word> search(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return wordRepository.search(keyword, pageable);
    }
}
