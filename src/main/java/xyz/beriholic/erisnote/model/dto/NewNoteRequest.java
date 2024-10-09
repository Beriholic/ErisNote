package xyz.beriholic.erisnote.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewNoteRequest {
    private String title;
    private String content;
    private String categoriesId;
}
