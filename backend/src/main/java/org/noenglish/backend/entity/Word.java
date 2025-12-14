package org.noenglish.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.Id;

@Entity
@Getter
@Setter
@Table(name = "words")
public class Word {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100)
    private String word;      // 表记

    @Column(length = 100)
    private String reading;   // 读音

    @Column(columnDefinition = "TEXT")
    private String meaning;   // 释义

    @Column(columnDefinition = "TEXT")
    private String pos;       // 词性（多个）

    // getter / setter
}
