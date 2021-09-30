import React from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../services/firebase";
import UserAvatarList from "./utils/UserAvatarList";
import {formatTimeString} from "../utils";

export type EventFeedItemArgs = {
  id: string
  description: string
  owner: { uid: string, name: string, email: string }
  guests: { uid: string, name: string, email: string }[]
  dateStart: Date
  dateEnd: Date
}

export enum Status {
  FUTURE,
  OCCURRING,
  DONE
}

export default function EventFeedItem({ id, description, owner, guests, dateStart, dateEnd }: EventFeedItemArgs) {
  const document = db.doc(`events/${id}`)

  const [currentUser, loadingAuth] = useAuthState(auth)
  const isOwner = owner.uid === currentUser?.uid
  const isGuest = guests.findIndex(it => it.uid === currentUser?.uid) !== -1

  const status = +dateStart > Date.now()
    ? Status.FUTURE
    : +dateEnd > Date.now()
      ? Status.OCCURRING
      : Status.DONE

  if (loadingAuth) {
    return null
  }

  return (
    <article className="w-full p-3 rounded shadow-lg bg-gray-700 text-gray-300">
      <div className="flex justify-between">
        <section>
          { description }
        </section>
        <section>
          <span className="text-gray-400">
            { status === Status.FUTURE && `In ${formatTimeString(+dateStart - Date.now())}`}
            { status === Status.OCCURRING && "Occurring Now!" }
            { status === Status.DONE && `${formatTimeString(Date.now() - +dateEnd)} ago` }
          </span>
          <UserAvatarList
            users={[owner, ...guests]}
            extraIconsEnd={
              [() => <img src="https://ui-avatars.com/api/?name=%2B"/>]
            }
            wrapperStyle={{ justifyContent: 'end' }}
          />
        </section>
      </div>
    </article>
  )
}
