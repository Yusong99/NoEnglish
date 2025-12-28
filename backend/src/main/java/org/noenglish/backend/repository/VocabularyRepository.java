package org.noenglish.backend.repository;

import org.noenglish.backend.dto.VocabularySimpleDTO;
import org.noenglish.backend.entity.Vocabulary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VocabularyRepository extends JpaRepository<Vocabulary, Long> {

    @Query(
            value = """
        SELECT 
          word,
          kana,
          meaning_cn AS meaningCn,
          part_of_speech AS partOfSpeech
        FROM jlpt_words
        WHERE level = :level
        ORDER BY RAND()
        LIMIT 20
      """,
            nativeQuery = true
    )
    List<VocabularySimpleDTO> findRandomByLevel(@Param("level") String level);
}
