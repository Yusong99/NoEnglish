package org.noenglish.backend.service.impl;

import lombok.RequiredArgsConstructor;
import org.noenglish.backend.dto.VocabularySimpleDTO;
import org.noenglish.backend.repository.VocabularyRepository;
import org.noenglish.backend.service.VocabularyService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VocabularyServiceImpl implements VocabularyService {

    private final VocabularyRepository vocabularyRepository;

    @Override
    public List<VocabularySimpleDTO> randomByLevel(String level) {
        return vocabularyRepository.findRandomByLevel(level);
    }
}
