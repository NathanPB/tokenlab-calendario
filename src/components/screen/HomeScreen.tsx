import React from "react";
import EventFeedItem from "../EventFeedItem";
import CreateEventDialog from "../dialog/CreateEventDialog";

export default function HomeScreen() {
  const [showCreateDialog, setShowCreateDialog] = React.useState(false)

  return (
    <div className="flex justify-center h-screen bg-gray-700">
      <main className="h-100 w-full sm:w-3/5 md:w-3/6 bg-gray-600 p-2">
        <CreateEventDialog visible={showCreateDialog} setVisible={setShowCreateDialog}/>
        <button
          className="rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => setShowCreateDialog(true)}
        >
          Create Event
        </button>

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
