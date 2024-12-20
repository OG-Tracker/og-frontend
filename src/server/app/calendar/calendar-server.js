const calendarServerConfig = (server) => {
  server.get("/categories", () => {
    return [
      {
        label: "Awarded Date",
        value: "awarded",
        activeClass: "ring-green-700 bg-green-700",
        className: " group-hover:border-green-500",
      },
      {
        label: "Proposal Ends",
        value: "ending",

        activeClass: "ring-kog-900 bg-kog-900",
        className: " group-hover:border-kog-900",
      },
      {
        label: "Spend Period",
        value: "spends",
        activeClass: "ring-[#D96C94] bg-[#D96C94]",
        className: " group-hover:border-[#D96C94]",
      },
    ];
  });

  server.get("/calendarEvents", (schema) => {
    let calendarEvents = schema.calendarEvents.all();
    return calendarEvents;
  });

  server.post("/calendarEvents", (schema, request) => {
    const attrs = JSON.parse(request.requestBody);
    return schema.calendarEvents.create(attrs);
  });
  server.put("/calendarEvents/:id", (schema, request) => {
    const id = request.params.id;
    const attrs = JSON.parse(request.requestBody);
    const calendarEvent = schema.calendarEvents.find(id);
    return calendarEvent.update(attrs);
  });
  server.delete("/calendarEvents/:id", (schema, request) => {
    let id = request.params.id;

    return schema.calendarEvents.find(id).destroy();
  });
};

export default calendarServerConfig;
