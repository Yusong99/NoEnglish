package org.noenglish.backend.repository;

import org.noenglish.backend.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WordRepository extends JpaRepository<Word, Long> {

    @Query("""
        SELECT w FROM Word w
        WHERE w.word LIKE %:q%
           OR w.reading LIKE %:q%
    """)
    List<Word> search(@Param("q") String q);
}
