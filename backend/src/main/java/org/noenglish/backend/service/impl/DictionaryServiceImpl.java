package org.noenglish.backend.service.impl;

import org.noenglish.backend.entity.Dictionary;
import org.noenglish.backend.repository.DictionaryRepository;
import org.noenglish.backend.service.DictionaryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DictionaryServiceImpl implements DictionaryService {
    private final DictionaryRepository dictionaryRepository;

    public DictionaryServiceImpl(DictionaryRepository dictionaryRepository) {
        this.dictionaryRepository = dictionaryRepository;
    }

    /**
     * 获取所有可用辞书（不区分语言）
     */
    public List<Dictionary> getAvailableDictionaries() {
        return dictionaryRepository.findByEnabledTrueOrderBySortOrderAsc();
    }

    /** 按语言获取可用辞书 */
    public List<Dictionary> getAvailableDictionariesByLanguage(String languageCode) {
        return dictionaryRepository
                .findByLanguage_CodeAndEnabledTrue(languageCode);
    }
}
