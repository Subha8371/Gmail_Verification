import React from 'react'
import style from "./success.module.css"
const success = () => {
  return (
    <>
    <div class={style.successcontainer}>
    <div class={style.successicon}>✔</div>
    <div class={style.successmessage}>Success!</div>
    <div class={style.successdescription}>Your email has been successfully verified.</div>
  </div>
    </>
  )
}

export default success