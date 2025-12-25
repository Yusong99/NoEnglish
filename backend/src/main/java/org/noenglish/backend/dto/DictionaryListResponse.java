package org.noenglish.backend.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.noenglish.backend.entity.Dictionary;

@Getter
@Setter
@Data
public class DictionaryListResponse {
    /*
    * 返回给前端的辞典列表*/
    private Integer id;
    private String name;
    private String description;
    private String coverUrl;
    private String level;
    private String languageCode;

    public DictionaryListResponse(Dictionary dictionary) {
        this.id = dictionary.getId();
        this.name = dictionary.getName();
        this.description = dictionary.getDescription();
        this.coverUrl = dictionary.getCoverUrl();
        this.level = dictionary.getLevel();
        this.languageCode = dictionary.getLanguage().getCode();
    }
}
