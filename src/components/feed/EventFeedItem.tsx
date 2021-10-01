import React from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../../services/firebase";
import UserAvatarList from "../utils/UserAvatarList";
import {formatTimeString} from "../../utils";
import classNames from "classnames";

export type EventFeedItemArgs = {
  id: string
  description: string
  owner: string,
  participants: string[]
  dateStart: Date
  dateEnd: Date
  cancelled: boolean
  onEdit: (id: string)=>void
}

export enum Status {
  FUTURE,
  OCCURRING,
  DONE
}

export default function EventFeedItem({ id, description, owner, participants, dateStart, dateEnd, cancelled, onEdit }: EventFeedItemArgs) {
  const [user, loadingAuth] = useAuthState(auth)
  const [participantsUsers, setParticipantsUsers] = React.useState<any[]>([])

  React.useEffect(() => {
    Promise.all(
      participants.map(uid => db.doc(`users/${uid}`).get())
    ).then(setParticipantsUsers)
  }, [participants])

  const status = +dateStart > Date.now()
    ? Status.FUTURE
    : +dateEnd > Date.now()
      ? Status.OCCURRING
      : Status.DONE

  if (loadingAuth) {
    return null
  }

  function handleCancel() {
    if (window.confirm('Sure?')) {
      db.doc(`events/${id}`).update({
        description, owner, participants, dateStart, dateEnd, cancelled: true
      })
    }
  }

  const cancellable = owner === user.uid && !cancelled && status !== Status.DONE
  const editable = owner === user.uid

  return (
    <article className={
      classNames(
        "mt-2 w-full p-3 rounded shadow-lg bg-gray-700 text-gray-300",
        { "ring ring-green-500 my-4": status === Status.OCCURRING && !cancelled },
        { "ring ring-red-500 my-4": cancelled }
      )
    }>
      <div className="flex justify-between">
        <section>
          { description }
          { cancelled && <span className="text-red-500"><br/>Cancelled!</span> }
          <br/>
          {
            cancellable && (
              <span className="text-blue-700 cursor-pointer" onClick={handleCancel}>
                Cancel
              </span>
            )
          }
          { (cancellable && editable) && ' | '}
          {
            editable && (
              <span className="text-blue-600 cursor-pointer" onClick={() => onEdit(id)}>
                Edit
              </span>
            )
          }
        </section>
        <section>
          <span className="text-gray-400">
            { status === Status.FUTURE && `In ${formatTimeString(+dateStart - Date.now())}`}
            { status === Status.OCCURRING && "Occurring Now!" }
            { status === Status.DONE && `${formatTimeString(Date.now() - +dateEnd)} ago` }
          </span>
          <UserAvatarList
            users={
              participantsUsers.map(user =>
                (
                  {
                    uid: user.id,
                    email: user.data()!!.email,
                    name: user.data()!!.name
                  }
                )
              )
            }
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
