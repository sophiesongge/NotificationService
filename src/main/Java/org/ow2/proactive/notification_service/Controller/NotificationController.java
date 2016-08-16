package org.ow2.proactive.notification_service.Controller;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowire;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import org.ow2.proactive.notification_service.Model.Notification;
import org.ow2.proactive.notification_service.Service.NotificationService;

@RestController
@RequestMapping(value = "/notification")
public class NotificationController {



    @RequestMapping(method = RequestMethod.POST)//what should the value be?
    public ModelAndView Notification(@RequestBody Notification notification){

        ModelAndView model = new ModelAndView();

        model.setViewName("index");

        model.addObject("date", notification.getDate());
        model.addObject("description", notification.getDescription());

        return model;
    }

}