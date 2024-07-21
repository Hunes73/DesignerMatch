package com.pz.designmatch.model.chat;

import com.pz.designmatch.model.enums.MessageStatus;
import com.pz.designmatch.model.user.UserEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Setter
@Getter
@NoArgsConstructor
@Table(name = "messages")
public class ChatMessage {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "chat_id")
  private ChatRoom chat;

  @ManyToOne
  @JoinColumn(name = "sender_id")
  private UserEntity sender;

  @ManyToOne
  @JoinColumn(name = "recipient_id")
  private UserEntity recipient;

  private String content;

  @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
  private LocalDateTime timestamp;

  @Enumerated(EnumType.STRING)
  private MessageStatus status;

  public ChatMessage(ChatRoom chat, UserEntity sender, UserEntity recipient, String content,
      LocalDateTime timestamp, MessageStatus status) {
    this.chat = chat;
    this.sender = sender;
    this.recipient = recipient;
    this.content = content;
    this.timestamp = timestamp;
    this.status = status;
  }
}
