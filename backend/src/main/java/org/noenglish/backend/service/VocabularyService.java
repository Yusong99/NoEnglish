package org.noenglish.backend.service;


import org.noenglish.backend.dto.Vocabulary;

import java.util.List;

public interface VocabularyService {
    public  List<Vocabulary> getRandomN2Words();
}
