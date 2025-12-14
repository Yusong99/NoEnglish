package org.noenglish.backend.service;

import org.noenglish.backend.entity.Word;

import java.util.List;

public interface WordService {
    public List<Word> search(String keyword);
}
