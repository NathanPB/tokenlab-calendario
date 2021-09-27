import React, {FormEvent} from "react";
import {useSignInWithEmailAndPassword} from "react-firebase-hooks/auth";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {auth} from "../../../services/firebase";
import { Link } from 'react-router-dom'
import {faLock} from "@fortawesome/free-solid-svg-icons";
import {EMAIL_REGEX} from "./AuthPageController";

export default function LoginPage() {
  const [email, setEmail] = React.useState('')
  const [pwd, setPwd] = React.useState('')

  const [signIn,, loading, error] = useSignInWithEmailAndPassword(auth)

  // https://firebase.google.com/docs/auth/admin/errors
  const errorString = (() => {
    switch (error?.code) {
      case undefined: return ""
      case "auth/wrong-password":
      case "auth/user-not-found": return "Your password seems invalid, are you having problems logging in?"
      default: return "Oops, I think something went wrong. Why don't you come back in a few minutes?"
    }
  })()

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (loading || !pwd || !EMAIL_REGEX.test(email)) return;

    signIn(email, pwd)
  }

  return (
    <>
      <a href="https://www.freepik.com/vectors/calendar" className="text-xs text-center block">Calendar vector created by rawpixel.com - www.freepik.com</a>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img className="mx-auto h-12 w-auto h-20" src="/calendar.png" alt="Calendar"/>
            <h2 className="mt-6 text-center text-2xl text-gray-900">Sorry, I don't remember you</h2>
            <h1 className="text-center text-3xl font-extrabold text-gray-900">Would you mind logging in?</h1>
            <p className="mt-2 text-center text-sm text-gray-600">
              Are you new around here? Why don't you {' '}
              <Link to={"/register"} className={"font-medium text-indigo-600 hover:text-indigo-500"}>
                create an account
              </Link>
              ?
            </p>
          </div>
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
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={pwd}
                  onChange={e => setPwd(e.target.value)}
                />
              </div>
            </div>

            <div className="text-sm text-red-500 text-center">
              { errorString }
            </div>

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <Link to={"/reset"} className={"font-medium text-indigo-600 hover:text-indigo-500"}>
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={loading}
              >

                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  {
                    loading ? (
                      <svg className="animate-spin h-5 w-5" viewBox={"0 0 24 24"}>
                        <circle cx="50" cy="50" fill="none" stroke="#F5F6F8" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138" transform="matrix(1,0,0,1,0,0)"/>
                      </svg>
                    ) : (
                      <FontAwesomeIcon
                        icon={faLock}
                        className={"h-5 w-5 text-indigo-500 group-hover:text-indigo-400"}
                        aria-hidden={true}
                      />
                    )
                  }
                </span>

                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
