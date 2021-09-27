import React, {FormEvent} from "react";
import {auth} from "../../../services/firebase";
import {Link} from 'react-router-dom'

export default function ResetPasswordPage() {
  const [email, setEmail] = React.useState('')
  const [sent, setSent] = React.useState(false)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    auth.sendPasswordResetEmail(email)
      .then(() => setSent(true))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto h-20" src="/calendar.png" alt="Calendar"/>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">No problem, I got you</h2>
          {
            sent ? (
              <>
                <h1 className="text-center text-lg text-gray-900 mt-6">I have sent you an e-mail telling how to recover your password, you may want to take a look into your inbox.</h1>
                <h2 className="text-center text-sm text-gray-900 mt-6">PS: Sometimes the e-mail gnomes get a little lost delivering things, you may want to check your spam box too...</h2>
              </>
            ) : (
              <h1 className="text-center text-md text-gray-900">Just tell me your e-mail address and I will send you the recovering instructions</h1>
            )
          }
        </div>
        { sent ? (
          <Link className="font-medium text-indigo-600 hover:text-indigo-500 text-center block" to="/">Sure, now get me back to login.</Link>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        ) }
      </div>
    </div>
  )
}
