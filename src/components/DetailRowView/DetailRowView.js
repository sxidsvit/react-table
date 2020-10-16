import React from 'react'

const DetailRowView = ({ person }) => {
  return (
    <div >
      <h3 className="mt-5 mb-3">
        Выбран пользователь <b>{person.firstName + ' ' + person.lastName}</b>
      </h3>
      <p className="mb-1">
        Описание: <br />
        <textarea className="mt-2" defaultValue={person.description}
          cols="90" rows="4" readOnly={true} />
      </p>
      <p className="mb-1">Адрес проживания: <b>{person.address.streetAddress}</b></p>
      <p className="mb-1">Город: <b>{person.address.city}</b></p>
      <p className="mb-1">Провинция/штат: <b>{person.address.state}</b></p>
      <p className="mb-1">Индекс: <b>{person.address.zip}</b></p>
    </div>
  )
}

export default DetailRowView
