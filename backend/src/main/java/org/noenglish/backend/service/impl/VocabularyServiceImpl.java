package org.noenglish.backend.service.impl;

import org.noenglish.backend.dto.Vocabulary;
import org.noenglish.backend.mapper.VocabularyMapper;
import org.noenglish.backend.service.VocabularyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VocabularyServiceImpl implements VocabularyService {

    @Autowired
    private VocabularyMapper vocabularyMapper;

    public List<Vocabulary> getRandomN2Words() {
        return vocabularyMapper.selectRandomByLevel("N2", 20);
    }
}
