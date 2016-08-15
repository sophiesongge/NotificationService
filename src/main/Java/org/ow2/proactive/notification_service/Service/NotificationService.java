package org.ow2.proactive.notification_service.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.ow2.proactive.notification_service.Model.Notification;

@Service
public class NotificationService {

    private static final Logger logger = LoggerFactory.getLogger(NotificationService.class);

    public Notification createNotification(long ID, String date, String description){
        Notification notification = new Notification(ID, date, description);
        return notification;
    }

    public long getID(Notification notification) {

        return notification.getId();
    }

    public String getDate(Notification notification){

        return notification.getDate();
    }

    public String getDescription(Notification notification){

        return notification.getDescription();
    }

}