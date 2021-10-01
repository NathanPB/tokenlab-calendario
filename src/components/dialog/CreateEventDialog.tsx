
import React, {FormEvent} from "react";
import { Transition, Dialog } from '@headlessui/react'
import DateTimePicker from "react-datetime-picker";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../../services/firebase";
import firebase from "firebase/compat/app";

export type CreateEventDialogProps = {
  editId?: string
  clearEditId: ()=>void
  visible: boolean
  setVisible: (visible: boolean)=>void
}

// https://tailwindui.com/components/application-ui/overlays/modals
export default function CreateEventDialog({ editId, clearEditId, visible, setVisible }: CreateEventDialogProps) {
  const [user] = useAuthState(auth)
  const [description, setDescription] = React.useState('')
  const [dateStart, setDateStart] = React.useState<Date>(new Date())
  const [dateEnd, setDateEnd] = React.useState<Date>()

  const [existing, setExisting] = React.useState<firebase.firestore.DocumentSnapshot>()

  function resetState() {
    setExisting(undefined)
    setDescription('')
    setDateStart(new Date())
    setDateEnd(undefined)
    setVisible(false)
    clearEditId()
  }

  React.useEffect(() => {
    if (editId) {
      db.doc(`events/${editId}`).get()
        .then(doc => {
          if (doc.exists) {
            const data = doc.data()!!
            setExisting(doc)
            setDescription(data.description)
            setDateStart(new Date(data.dateStart.seconds * 1000))
            setDateEnd(new Date(data.dateEnd.seconds * 1000))
          } else {
            resetState()
          }
        })
    } else {
      resetState()
    }
  }, [editId])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (existing) {
      await db.doc(`events/${existing.id}`)
        .set({ description, dateStart, dateEnd }, { merge: true })
    } else {
      await db.collection('events').add({
        owner: user.uid,
        participants: [user.uid],
        description,
        dateStart,
        dateEnd
      })
    }
    resetState()
  }

  function handleClose() {
    resetState()
    setVisible(false)
  }

  return (
    <Transition.Root show={visible} as={React.Fragment}>
      <Dialog
        as={"div"}
        onClose={setVisible}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      { existing ? 'Edit Event' : 'Create Event' }
                    </Dialog.Title>
                    <div className="mt-2">
                      <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                        <div>
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="description"
                              name="description"
                              rows={3}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                              value={description}
                              onChange={e => setDescription(e.target.value)}
                              minLength={3}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Start Date
                          </label>
                          <DateTimePicker
                            name="startDate"
                            value={dateStart}
                            onChange={setDateStart}
                            minDate={new Date()}
                            maxDetail={"minute"}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            End Date
                          </label>
                          <DateTimePicker
                            name="endDate"
                            value={dateEnd}
                            onChange={setDateEnd}
                            minDate={dateStart}
                            maxDetail={"minute"}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    type={"submit"}
                  >
                    { existing ? 'Save' : 'Create' }
                  </button>
                  <button
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
