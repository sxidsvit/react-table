
---

Исходный тест - https://github.com/fugr-ru/frontend-javascript-test

---

Инсталяция - npx create-react-app react-table

Удаляем лишние файлы из папки src.
Чистим App.js

---

Можно установить bootsrap - npm i bootstrap 
и затем подключить его в App.js:
import 'bootstrapp/dist/css/bootstrap.min.css'

Или можно установить пакеты npm install react-bootstrap bootstrap
Второй вариант предпостительнее. Так мы получаем доступ к react компонентам стилизованными с помощью bootstrap
Воспользуемся им.

Теперь мы получаем доступ к bootstrap componnents. Например: 
import { Button } from 'react-bootstrap'

Подключаем стили bootstrapp в App.js
import 'bootstrap/dist/css/bootstrap.min.css'

Также можно подключить стили с CDN(https://www.bootstrapcdn.com/) 
в файл-шаблон public/index.html :

```html
<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
  integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
  crossorigin="anonymous"
/>
```
===============================================================================

Формируем таблицу для загрузки данных с сервера 

URL для загрузки:

```js
http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}
```
---

Создаем лоадер - https://codepen.io/ste-vg/pen/OEbYqZ

Поскольку для стилизации лоадера используется scss, то устанавливаем 
node-sass 

Node-sass is a library that provides binding for Node.js to LibSass, the C version of the popular stylesheet preprocessor, Sass.

---

Сортировка 

Устанавливаем библиотеку Lodash -  npm i --save lodash

Используем функцию _.orderBy(collection, [iteratees=[_.identity]], [orders])
```js
  const onSortHandler = (sortField) => {
   // To avoid unnecessary requests to the server, create the cloneData variable
    const clonedData = data
    const sortDirection = sort === 'asc' ? 'desc' : 'asc'
    const orderedData = _.orderBy(clonedData, sortField, sortDirection)

    setData(orderedData)
    setSort(sortDirection)
    setSortField(sortField)
  }
  ```

---

Стилизации кнопки направления сортировки

В файле /public/index.html подключаем Material Icons From Google Fonts
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
```
---

Рефакторинг таблицы
```js
  if (!data?.[0]) { return <></> }
  const fields = Object.keys(data[0]).splice(0, 5)

    <Table striped bordered hover variant="dark" responsive="sm">
      <thead>
        <tr>
          {
            fields.map(field => (
              <th onClick={onSort.bind(null, field)} key={field}>
                <div className="th-arrow">{field}
                  <SortArrow
                    sortField={sortField}
                    collumnName={field}
                    sortDirection={sort}
                  />
                </div>
              </th>
            ))
          }

        </tr>
      </thead>
      <tbody>
        {
          data.map(item => (
            <tr key={item[fields[0]] + item[fields[fields.length - 1]]} onClick={onRowSelect.bind(null, item)}>
              { fields.map(field => (<td key={field}>{item[field]}</td>))}
            </tr>
          ))
        }
      </tbody>
    </Table>
```
---

Реализация кнопок для выбора количества загружаеммых данных 
```js
components/ModeSelector/ModeSelector.js 

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: ' 50px 0' }}>
      <button onClick={onSelect.bind(null, smallUrl)} className="btn btn-success mr-3">
        32 элемента</button>
      <button onClick={onSelect.bind(null, bigUrl)} className="btn btn-danger">
        1000 элементов</button>
    </div>
```
---

Пагинация - https://www.npmjs.com/package/react-paginate

ReactJS компонент для рендеринга и разбивки на страницы.
Установив этот компонент и написав лишь немного CSS можно получить удобную пагинацию.

npm install react-paginate --save

Название классов для стилизации элементов тегов li, a момно посмотреть 
в соответствующем компоненте Bootstrap:
https://getbootstrap.com/docs/4.5/components/pagination/ 

Вычисляем данные, которые нужно отобразить после выбора страницы пагинации:

```js
  const dataPerPage = 10 // when to start showing pagination
  const paginatedData = _.chunk(data, dataPerPage)
  const pageCount = paginatedData.length
  const displayData = paginatedData[currentPage]
```

Компонент пагинации: 

```js
<ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={4}
          marginPagesDisplayed={2}
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          containerClassName={'pagination'}
          activeClassName={'active'}
          previousClassName="page-item"
          nextClassName="page-item"
          pageLinkClassName="page-link"
          previousLinkClassName="page-link"
          nextLinkClassName="page-link"
          onPageChange={onPageChangeHandler}
          forcePage={currentPage}
/>
```

Не совсем понятен смысл поля forcePage ... 
[forcePage	- Number -	To override selected page with parent prop.]

Ответ: Поле необходимо чтобы перейти к первой кнопке пагинации после поиска

---

Поиск 

Нужен инпут для ввода строки поиска:
https://react-bootstrap.github.io/components/input-group/

Создаём отдельный компонент components/TableSearch/TableSearch.js
import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'

Получаем значение поля поиска - onClick={() => props.onSearch(value)}
и обрабатываем его в компененте App.js :

```js
(1) <TableSearch onSearch={onSearchHandler} />

(2)  const onSearchHandler = (search) => {
    setSearch(search)
    setCurrentPage(0)
  }
  const getFilteredData = () => {
    if (!search) {
      return data
    }
    return data.filter(item => {
      return item['firstName'].toLowerCase().includes(search.toLowerCase())
        || item['lastName'].toLowerCase().includes(search.toLowerCase())
        || item['email'].toLowerCase().includes(search.toLowerCase())
        || item['phone'].toLowerCase().includes(search.toLowerCase())
    })
  }

  // Getting filtered OR initial data to show in the table
  const filteredData = getFilteredData()
  const pageCount = Math.ceil(filteredData.length / dataPerPage)
  const displayData = _.chunk(filteredData, dataPerPage)[currentPage]
  ```

---

### Валидация

#### Есть разные подходы

(1) Валидация средствами HTML + Bootstrap 

Используются встроенные в браузер возможности и стили Bootstrap. 
Кнопка Submit не блокируется. 
В момент отправки формы (клик по кнопке) происходит валидация и подсвечиваются поля не прошедшие её.

(2) Библиотеки

Они есть разные. Например [react-validation]( https://www.npmjs.com/package/react-validation )
  
Другой пример - библиотека [Formik](https://github.com/formium/formik) и дополнение к ней schema builder [Yup](https://github.com/jquense/yup) для анализа и валидации полей формы

    npm install formik --save   npm install -S yup 

Применение библиотеки может быть не таким очевидным и простым.


(3)  Подход В.Минина 

Основан на написании функционала, выполняющего валидацию, что помогает лучше понять и прочувствовать её особенности

---

### Hiroku 

---

### Docker 