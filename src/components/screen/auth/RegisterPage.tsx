import React, {FormEvent} from "react";
import {Link} from "react-router-dom";
import classNames from "classnames";
import {registerWithEmailPwd} from "../../../services/firebase";
import {EMAIL_REGEX, STRONG_PWD_REGEX, WEAK_PWD_REGEX} from "./AuthPageController";

export default function RegisterPage() {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [emailConfirm, setEmailConfirm] = React.useState('')
  const [pwd, setPwd] = React.useState('')

  const isntEmailMatching = React.useMemo(() => email && emailConfirm && emailConfirm !== email, [email, emailConfirm])
  const pwdStrength = React.useMemo(() => {
    if (STRONG_PWD_REGEX.test(pwd)) {
      return 2
    } else if (WEAK_PWD_REGEX.test(pwd)) {
      return 1
    } else {
      return 0
    }
  }, [pwd])

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (name && email && pwdStrength && EMAIL_REGEX.test(email) && email === emailConfirm) {
      registerWithEmailPwd(name, email, pwd)
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Oh, welcome around</h1>
          <h2 className="text-center text-lg text-gray-900">Please fill this out so I will know how to reach you</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            You already have an account? Why don't you {' '}
            <Link to={"/"} className={"font-medium text-indigo-600 hover:text-indigo-500"}>
              login
            </Link>
            {' '} instead?
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-x">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Name"
                maxLength={64}
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
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
              <label htmlFor="email-confirm" className="sr-only">
                Confirm the email address
              </label>
              <input
                id="email-confirm"
                type="email"
                required
                className={
                  classNames(
                    "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm",
                    { "border-red-500": isntEmailMatching }
                  )
                }
                placeholder="Confirm the e-mail address"
                value={emailConfirm}
                onChange={e => setEmailConfirm(e.target.value)}
              />
            </div>
          </div>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type="password"
                autoComplete="current-password"
                required
                className={classNames(
                  "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm",
                  {
                    "border-red-500": pwd && pwdStrength === 0,
                    "border-yellow-500": pwd && pwdStrength === 1,
                    "border-green-500": pwd && pwdStrength === 2
                  }
                )}
                placeholder="Password"
                value={pwd}
                onChange={e => setPwd(e.target.value)}
              />
            </div>
            <div className="text-sm margin-0">
              { (pwd && pwdStrength === 0) && "Too weak, this ain't gonna work!" }
              { (pwd && pwdStrength === 1) && "Fine, but can't you try something more secure?" }
              { (pwd && pwdStrength === 2) && "Safe enough..." }
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )

}
