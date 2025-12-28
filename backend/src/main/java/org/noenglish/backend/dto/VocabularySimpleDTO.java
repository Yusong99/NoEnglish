package org.noenglish.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VocabularySimpleDTO {

    private String word;
    private String kana;
    private String meaningCn;
    private String partOfSpeech;

}
