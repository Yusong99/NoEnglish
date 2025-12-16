package org.noenglish.backend.service;

import org.noenglish.backend.entity.Word;
import org.springframework.data.domain.Page;

import java.util.List;

public interface WordService {
    Page<Word> search(String keyword, int page, int size);
}
