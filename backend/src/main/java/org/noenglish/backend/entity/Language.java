package org.noenglish.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "language")
@Getter
@Setter
public class Language {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 10, unique = true)
    private String code;   // ja / fr / en

    @Column(length = 50)
    private String name;   // 日语 / 法语
}
