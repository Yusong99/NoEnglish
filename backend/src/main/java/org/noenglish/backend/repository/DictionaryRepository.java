package org.noenglish.backend.repository;

import org.noenglish.backend.entity.Dictionary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DictionaryRepository extends JpaRepository<Dictionary, Integer> {

    List<Dictionary> findByEnabledTrueOrderBySortOrderAsc();

    List<Dictionary> findByLanguage_CodeAndEnabledTrue(String code);
}