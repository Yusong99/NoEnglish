package org.noenglish.backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.noenglish.backend.dto.Vocabulary;

import java.util.List;

@Mapper
public interface VocabularyMapper {

    List<Vocabulary> selectRandomByLevel(
            @Param("level") String level,
            @Param("limit") int limit
    );
}
