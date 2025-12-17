package org.noenglish.backend.dto;

import lombok.Builder;
import lombok.Data;
import org.noenglish.backend.entity.Word;

import java.util.List;

@Data
@Builder
public class WordSearchResponse {
    private List<Word> list;
    private int page;
    private int size;
    private boolean hasMore;
    private long total;
}
