package org.noenglish.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "vocabulary")
public class Vocabulary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String word;

    private String meaning;

    private Integer level; // JLPT 等级，如 2 = N2

    @Column(name = "example_jp")
    private String exampleJp;

    @Column(name = "example_cn")
    private String exampleCn;
}
