package org.ow2.proactive.notification_service.Model;

public class Notification{
    private long id;
    private String date;
    private String description;

    public Notification(long id, String date, String description){
        this.id = id;
        this.date = date;
        this.description = description;
    }

    public long getId(){
        return id;
    }

    public String getDate(){
        return date;
    }

    public String getDescription(){
        return description;
    }

    public void setId(long id){
        this.id = id;
    }

    public void setDate(String date){
        this.date = date;
    }

    public void setDescription(String description){
        this.description = description;
    }

}