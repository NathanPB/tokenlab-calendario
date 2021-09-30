import React from "react";
import EventFeedItem from "../EventFeedItem";

export default function HomeScreen() {
  return (
    <div className="flex justify-center h-screen bg-gray-700">
      <main className="h-100 w-full sm:w-3/5 md:w-3/6 bg-gray-600 p-2">
        aaa



        <hr className="my-2"/>

        <EventFeedItem
          id={"a"}
          description={"Event description goes here"}
          owner={{ uid: "aa", name: "Nathan Bombana", email: "bondia" }}
          guests={[]}
          dateStart={new Date('2021-09-01')}
          dateEnd={new Date('2021-09-02')}
        />

      </main>
    </div>
  )
}
