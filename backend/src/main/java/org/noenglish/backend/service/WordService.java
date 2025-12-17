package org.noenglish.backend.service;

import org.noenglish.backend.dto.WordSearchResponse;
import org.noenglish.backend.entity.Word;
import org.springframework.data.domain.Page;

import java.util.List;

public interface WordService {
    WordSearchResponse search(String keyword, int page, int size, Long userId);
}
