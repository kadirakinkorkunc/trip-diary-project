package com.tripdiaryproject.kafkaconsumer.domain;


import java.time.LocalDate;
import java.util.UUID;



public class TransferObject {
    private String message;
    private String id = UUID.randomUUID().toString();
    private LocalDate messageDate = LocalDate.now();


    public TransferObject(String message, String id, LocalDate messageDate) {
        this.message = message;
        this.id = id;
        this.messageDate = messageDate;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        message = message;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public LocalDate getMessageDate() {
        return messageDate;
    }

    public void setMessageDate(LocalDate messageDate) {
        this.messageDate = messageDate;
    }
}
