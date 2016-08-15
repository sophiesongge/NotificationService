package org.ow2.proactive.notification_service.Controller;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowire;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import org.ow2.proactive.notification_service.Model.Notification;
import org.ow2.proactive.notification_service.Service.NotificationService;

@Controller
public class NotificationController {

    private final NotificationService notificationService;

    @Autowired
    public NotificationController(NotificationService notificationService){
        this.notificationService = notificationService;
    }

    @RequestMapping(value = "", method = RequestMethod.POST)//what should the value be?
    public ModelAndView Notification(@PathVariable("notification") Notification notification){

        ModelAndView model = new ModelAndView();

        model.setViewName("index");

        model.addObject("date", notificationService.getDate(notification));
        model.addObject("description", notificationService.getDescription(notification));

        return model;
    }

}