package org.noenglish.backend.service;

import org.noenglish.backend.entity.Dictionary;
import org.noenglish.backend.repository.DictionaryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

public interface DictionaryService {

    /** 获取所有可用辞书（不区分语言） */
    public List<Dictionary> getAvailableDictionaries() ;

    /** 按语言获取可用辞书 */
    public List<Dictionary> getAvailableDictionariesByLanguage(String languageCode);
}
