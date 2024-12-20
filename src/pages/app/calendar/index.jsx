import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import Checkbox from "@/components/ui/Checkbox";
import {
  useGetCategoriesQuery,
  useGetCalendarEventsQuery,
  useCreateCalendarEventMutation,
  useEditCalendarEventMutation,
  useDeleteCalendarEventMutation,
} from "@/store/api/app/calendarSlice";
import EventModal from "./EventModal";
import LoaderCircle from "@/components/Loader-circle";

const CalendarPage = () => {
  const calendarComponentRef = useRef(null);
  const { data: getCategories } = useGetCategoriesQuery();
  const {
    data: getCalendarEvents,
    isLoading,
    isError,
    error,
  } = useGetCalendarEventsQuery();
  const [createCalendarEvent] = useCreateCalendarEventMutation();
  const [editCalendarEvent] = useEditCalendarEventMutation();
  const [deleteCalendarEvent] = useDeleteCalendarEventMutation();
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editEvent, setEditEvent] = useState(null);
  const [events] = useState([
    { title: "New Event Planning", id: "1", tag: "business" },
    { title: "Meeting", id: "2", tag: "meeting" },
    { title: "Generating Reports", id: "3", tag: "holiday" },
    { title: "Create New theme", id: "4", tag: "etc" },
  ]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setCalendarEvents(getCalendarEvents?.calendarEvents);
    setCategories(getCategories);
    setSelectedCategories(getCategories?.map((c) => c.value));
  }, [getCalendarEvents, getCategories]);
  useEffect(() => {
    const draggableEl = document.getElementById("external-events");

    const initDraggable = () => {
      if (draggableEl) {
        new Draggable(draggableEl, {
          itemSelector: ".fc-event",
          eventData: function (eventEl) {
            let title = eventEl.getAttribute("title");
            let id = eventEl.getAttribute("data");
            let event = events.find((e) => e.id === id);
            let tag = event ? event.tag : "";
            return {
              title: title,
              id: id,
              extendedProps: {
                calendar: tag,
              },
            };
          },
        });
      }
    };

    if (!isLoading) {
      initDraggable();
    }

    return () => {
      draggableEl?.removeEventListener("mousedown", initDraggable);
    };
  }, [isLoading]);

  const handleDateClick = (arg) => {
    setEditEvent(null);
    setShowModal(true);
    setSelectedEvent(arg);
  };
  // event click
  const handleEventClick = (arg) => {
    setShowModal(true);
    setEditEvent(arg);
  };
  // handle close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditEvent(null);
    setSelectedEvent(null);
  };

  // add event
  const handleAddEvent = (newEvent) => {
    createCalendarEvent(newEvent);
  };

  // edit event
  const handleEditEvent = (updatedEvent) => {
    editCalendarEvent({
      id: editEvent.event.id,
      event: updatedEvent,
    });
  };
  const handleCategorySelection = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleClassName = (arg) => {
    if (arg.event.extendedProps.calendar === "awarded") {
      return "awarded";
    } else if (arg.event.extendedProps.calendar === "ending") {
      return "ending";
    } else if (arg.event.extendedProps.calendar === "spends") {
      return "spends";
    }
  };

  //filter events
  const filteredEvents = calendarEvents?.filter((event) =>
    selectedCategories.includes(event.extendedProps.calendar)
  );

  if (isLoading) {
    return <LoaderCircle />;
  }
  if (isError) {
    return <div>Error... {error.message}</div>;
  }
  return (
    <div className="ogtkog-calender !p-0">
      <div className="flex flex-col">
        <div className="flex justify-center items-center h-full w-full">
          <ul className="grid grid-cols-4  px-4 w-full">
            <li>
              <Checkbox
                label="All"
                className=""
                activeClass="ring-gray-600 bg-gray-600"
                value={selectedCategories?.length === categories?.length}
                onChange={() => {
                  if (selectedCategories?.length === categories?.length) {
                    setSelectedCategories([]);
                  } else {
                    setSelectedCategories(categories.map((c) => c.value));
                  }
                }}
              />
            </li>
            {categories?.map((category) => (
              <li key={category.value}>
                <Checkbox
                  activeClass={category.activeClass}
                  label={category.label}
                  value={selectedCategories.includes(category.value)}
                  onChange={() => handleCategorySelection(category.value)}
                />
              </li>
            ))}
          </ul>
        </div>

        <FullCalendar

          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          height="60vh"
          
          views={{
            dayGridMonth: {
              dayMaxEventRows: 1, // Adjust how events are displayed
            },
          }}

          ref={calendarComponentRef}
          headerToolbar={{
            right: "prev,next today",
            left: "title",

          }}
          events={filteredEvents}
          editable={false}
          rerenderDelay={10}
          eventDurationEditable={false}
          selectable={false}
          selectMirror={false}
          droppable={false}
          dayMaxEvents={1}
          weekends={true}
          eventClassNames={handleClassName}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          initialView="dayGridMonth"
          eventOrder={(a, b) => {
            // Give priority to "spends" events
            if (a.extendedProps.calendar === "spends" && b.extendedProps.calendar !== "spends") {
              return -1;
            }
            if (b.extendedProps.calendar === "spends" && a.extendedProps.calendar !== "spends") {
              return 1;
            }
            // Otherwise, sort alphabetically by title (or any other logic you prefer)
            return a.title.localeCompare(b.title);
          }}
        />

      </div>
      {/* <EventModal
        showModal={showModal}
        onClose={handleCloseModal}
        categories={categories}
        onAdd={handleAddEvent}
        selectedEvent={selectedEvent}
        event={editEvent}
        onEdit={handleEditEvent}
        onDelete={deleteCalendarEvent}
      /> */}
    </div>
  );
};

export default CalendarPage;
