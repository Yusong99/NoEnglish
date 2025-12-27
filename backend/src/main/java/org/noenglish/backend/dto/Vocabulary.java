package org.noenglish.backend.dto;

import lombok.Data;

@Data
public class Vocabulary {
    private Long id;
    private String level;
    private String word;
    private String kana;
    private String partOfSpeech;
    private String meaningCn;
    private String frequency;
    private String tags;      // JSON 字符串
    private String examples;  // JSON 字符串
}
