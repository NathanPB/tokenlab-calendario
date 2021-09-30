import React, {CSSProperties} from "react";
import { Wrapper } from './UserAvatarList.module.scss'

export type UserAvatarListArgs = {
  users: { uid: string, name: string, email: string }[]
  extraIconsStart?: (()=>any)[]
  extraIconsEnd?: (()=>any)[]
  wrapperStyle?: CSSProperties
}

export default function UserAvatarList({ users, extraIconsEnd, extraIconsStart, wrapperStyle }: UserAvatarListArgs) {
  const icons = [
    ...extraIconsStart?.map(it => it()) || [],
    ...users.map(user =>
      (
        <img
          alt={user.name}
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
        />
      )
    ),
    ...extraIconsEnd?.map(it => it()) || [],
  ]

  return (
    <ul className={Wrapper} style={wrapperStyle}>
      { icons.map(icon => <li>{icon}</li>) }
    </ul>
  )
}
