package org.noenglish.backend.service;

import org.noenglish.backend.dto.VocabularySimpleDTO;

import java.util.List;

public interface VocabularyService {

    List<VocabularySimpleDTO> randomByLevel(String level);

}