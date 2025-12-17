package org.noenglish.backend.repository;

import org.noenglish.backend.entity.Word;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface WordRepository extends JpaRepository<Word, Long> {

    @Query("""
        select w from Word w
        where w.word like %:q%
           or w.reading like %:q%
           or w.meaning like %:q%
    """)
    Page<Word> search(
            @Param("q") String q,
            Pageable pageable
    );
}
