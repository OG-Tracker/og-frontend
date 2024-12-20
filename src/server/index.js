import { createServer, Model, Factory, hasMany, belongsTo } from "miragejs";

import authServerConfig from "./auth-server";
import ShopServerConfig from "./shop-server";
import { products, proposals } from "@/constant/data";
import { faker } from "@faker-js/faker";
import { calendarEvents } from "./app/data";
import calendarServerConfig from "./app/calendar/calendar-server";
const previousDay = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
const dayBeforePreviousDay = new Date(
  new Date().getTime() - 24 * 60 * 60 * 1000 * 2
);

createServer({
  models: {
    // user: Model,
    product: Model,
    calendarEvent: Model,
  },
  factories: {},
// TODO maybe the credentials
  seeds(server) {
    // server.create("user", {
    //   email: "petros@gmail.com",
    //   password: "petros",
    // });
    products.forEach((product, i) => {
      server.create("product", {
        id: product.refNum,
        // id: product.proposer,
        
        
        // img: product.img,
        refNum: product.refNum,
        ptitle: product.ptitle,
        reqDot: product.reqDot,
        desc: product.desc,
        status: product.status,
        proposer: product.proposer,
        paLink: product.paLink,
        subLink:product.subLink,
        reqDot: product.reqDot,
        benAdd: product.benAdd,
        scanLink: product.scanLink,
        ptitle:  product.ptitle,
        track: product.track,
        category:product.category,
        fdate: product.fdate,
        ldate: product.ldate,
        propLink:product.propLink,
        summary:product.summary,
        twitter:product.twitter,
        github: product.github,
        youtube:product.youtube,
        website:product.website,
        articles:product.articles,
        task1: product.task1,
        status1: product.status1,
        task2: product.task2,
        status2:  product.status2,
        task3: product.task3,
        status3: product.status3,
        task4: product.task4,
        status4: product.status4,
        task5: product.task5,
        status5: product.status5,
        task6: product.task6,
        status6: product.status6,
        task7: product.task7,
        status7: product.status7,
        task8: product.task8,
        status8: product.status8,
        task9: product.task9,
        status9: product.status9,
        task10: product.task10,
        status10: product.status10,
        task11: product.task11,
        status11: product.status11,
        task12: product.task12,
        status12: product.status12,
        task13: product.task13,
        status13: product.status13,
        task14: product.task14,
        status14: product.status14,
        task15: product.task15,
        status15: product.status15,
        task16: product.task16,
        status16: product.status16,
        task17: product.task17,
        status17: product.status17,
        task18: product.task18,
        status18: product.status18,
        task19: product.task19,
        status19: product.status19,
        task20: product.task20,
        status20: product.status20,
        task21: product.task21,
        status21: product.status21,
        task22: product.task22,
        status22: product.status22,
        task23: product.task23,
        status23: product.status23,

        // subtitle: product.subtitle,
          // rating: product.rating,
        // price: product.price,
        // oldPrice: product.oldPrice,
        // percent: product.percent,
        // brand: product.brand,
        // name: product.name,
      });
    });

    // proposals.forEach((proposal, e) => {
    //   server.create("proposal", {
    //     id: e + 1,
    //     refNum1: proposal.refNum1,
    //     ptitle1: proposal.ptitle1,
    //     reqDot1: proposal.reqDot1,
    //     desc1: proposal.desc1,
    //     status1: proposal.status1,
    //     proposer1: proposal.proposer1,
    //     paLink1: proposal.paLink1,
    //     subLink1:proposal.subLink1,
    //     reqDot1: proposal.reqDot1,
    //     benAdd1: proposal.benAdd1,
    //     scanLink1: proposal.scanLink1,
    //     ptitle1:  proposal.ptitle1,
    //     track1: proposal.track1,
    //     category1:proposal.category1,
    //     fdate1: proposal.fdate1,
    //     ldate1: proposal.ldate1,
    
    //   });
    // });

    calendarEvents.forEach((element) => {
      server.create("calendarEvent", {
        id: faker.string.uuid(),
        title: element.title,
        start: element.start,
        end: element.end,
        allDay: element.allDay,
        //className: "warning",
        extendedProps: {
          calendar: element.extendedProps.calendar,
        },
      });
    });
  },
  routes() {
    //this.namespace = "api";

    // authServerConfig(this);
    ShopServerConfig(this);
    calendarServerConfig(this);
    this.timing = 500;
    //this.passthrough();
  },
});
