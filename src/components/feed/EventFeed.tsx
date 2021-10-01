import React from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../../services/firebase";
import {useCollectionData} from "react-firebase-hooks/firestore";
import EventFeedItem from "./EventFeedItem";
import firebase from "firebase/compat";

export default function EventFeed({ onEdit }: { onEdit: (id: string)=>void }) {
  const [user, authLoading] = useAuthState(auth)
  const now = React.useMemo(() => firebase.firestore.Timestamp.now(), [])

  const [docsPast, docsPastLoading] = useCollectionData(
    db.collection('events')
      .where('participants', 'array-contains', user.uid)
      .where('dateEnd', '<', now)
      .orderBy('dateEnd')
      .limit(20),
    { idField: 'id' }
  )

  const [docsIncoming, docsIncomingLoading] = useCollectionData(
    db.collection('events')
      .where('participants', 'array-contains', user.uid)
      .where('dateStart', '>', now)
      .orderBy('dateStart')
      .limit(20),
    { idField: 'id' }
  )

  const [docsNow, docsNowLoading] = useCollectionData(
    db.collection('events')
      .where('participants', 'array-contains', user.uid)
      .where('dateStart', '<=', now)
      .orderBy('dateStart')
      .limit(20),
    { idField: 'id' }
  )

  if (authLoading || docsPastLoading || docsIncomingLoading || docsNowLoading) {
    return null
  }

  function makeEventFeedItem(doc: any) {
    return (
      <div>
        <EventFeedItem
          key={doc.id}
          id={doc.id}
          description={doc.description}
          owner={doc.owner}
          participants={doc.participants}
          dateStart={new Date(doc.dateStart.seconds * 1000)}
          dateEnd={new Date(doc.dateEnd.seconds * 1000)}
          cancelled={!!doc.cancelled}
          onEdit={onEdit}
        />
      </div>
      )
  }

  const docsNowFiltered = docsNow?.filter(doc => docsPast?.findIndex(doc2 => doc2.id === doc.id) !== 0)

  return (
    <>
      { docsIncoming?.map(makeEventFeedItem) || null }
      { docsNowFiltered?.length && <hr className="border-blue-500 my-4"/> }
      { docsNowFiltered?.map(makeEventFeedItem) || null }
      <hr className="border-blue-500 my-4"/>
      { docsPast?.map(makeEventFeedItem) || null }
    </>
  )



}
