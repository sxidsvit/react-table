# Completed by me test task for frontend developer position

## The task

- It is necessary to develop a React application to display a table with data.
- An additional advantage will be the launch of the final build of the application from the __Docker container__ (with minimal configuration)

#### Required functionality

- Sort by columns: when you click on the name of a column, the table rows are sorted in ascending order, when you click again &mdash; in descending order. The sorting direction is indicated by a graphic element or a text message.
- Client-side pagination: data must be displayed per page, maximum 50 items per page. You must provide custom navigation to navigate through the pages.
- Filtering: the component provides a text field in which the user can enter text and table rows, the data of which does not contain the substring entered by the user, are hidden. Re-filtering is carried &mdash; ut by clicking on the "Find" button.
- By clicking on a row in the table, the field values ​​are displayed in an additional block below the table.
- Data is loaded into the table from the server. Download method from the server of your choice.
- Above the table there is a __Create new reccord__ button, by clicking on which the form for adding a row drops out

```js
	+------+------------+-----------------+-----------------+---------------+
	| id   | firstName  | lastName        | email           | phone         |
	+------+------------+-----------------+-----------------+---------------+
	|input | input      | input           | input           | input         |
	+------+------------+-----------------+-----------------+---------------+
```

- After filling in all inputs, the __Add new reccord__ button is activated, which inserts the filled row at the beginning of the table
  
---

To demonstrate how the component works, you need to create a simple HTML page:
the user is prompted to select a dataset: [little](http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}) or [large](http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}). 

---

#### Remarks

- Particular attention should be paid to the speed of work. Interface freezing during data loading, filtering, sorting operations is unacceptable.
- When loading data, it is worth showing some kind of indicator
- Using third-party libraries will be a plus only if it is justified and you can explain the reason for the choice. By showing your knowledge in the competent use of third-party ready-made solutions, you have a chance to increase your professional attractiveness for us.
- Write the code the way you would write it at work &mdash; the internals of the assignment will be assessed even more carefully than the external compliance with the assignment. The code should be organized so that it can be reused.
- Remember about error handling!
- The layout can be the simplest. Make visualization and decoration to your taste. We are not against using [Bootstrap](http://getbootstrap.com/) or a similar UI framework, but only for the UI presentation (you cannot use JS code to solve the problem, but you can use it for design effects (animations, etc.))!

---

#### Schema of visual presentation of data in a table

```
+------+------------+-----------------+-----------------+---------------+
| id ▲ | firstName ▼| lastName      ▼ | email          ▼| phone        ▼|
+------+------------+-----------------+-----------------+---------------+
| 101  | Sue        | Corson          | DWhalley@in.gov | (612)211-6296 |
+------+------------+-----------------+-----------------+---------------+
| 102  | Lor        | Ipsumd          | dwhalley@in.gov | (612)211-6296 |
+------+------------+-----------------+-----------------+---------------+
| 103  | Ips        | Umdolo          | dwhalley@in.gov | (612)211-6296 |
+------+------------+-----------------+-----------------+---------------+
```

If selected by the user with ʻid = 101`, then below the table we display the following information:

```html
	Выбран пользователь <b>Sue Corson</b>
	Описание:
	<textarea>
	et lacus magna dolor...
	</textarea>
	Адрес проживания: <b>9792 Mattis Ct</b>
	Город: <b>Waukesha</b>
	Провинция/штат: <b>WI</b>
	Индекс: <b>22178</b>
```

---

## During development libraries and frameworks were used

- [Bootstrap](https://getbootstrap.com/)
- [React-bootstrap](https://react-bootstrap.github.io/)
- [lodash](https://lodash.com/)
- [react-paginate](https://www.npmjs.com/package/react-paginate)
- [Formik](https://formik.org/)
- [Yup](https://github.com/jquense/yup#stringemailmessage-string--function-schema)
- [is_js](https://www.npmjs.com/package/is_js)


#### To test the results of the work were used:

- [Google DevTools](https://developers.google.com/web/tools/chrome-devtools) (mostly Console, Network tabs)
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=ru)
- Testing tools similar to the [Jest](https://jestjs.io/) framework were not used as unnecessary

---

## Deploy

- ###  [Codesandbox.io with site](https://codesandbox.io/s/musing-kapitsa-g7hsu) 

If, when working with the codesandbox site , loading data when clicking on one of the buttons does not happen, then you need to follow the link https://cors-anywhere.herokuapp.com/ and activate a proxy server for your PC.
After that, clicking on the buttons should work

- ### [DockerHub](https://hub.docker.com/r/sxidsvit/react-table)
- ### [DockerHub & GitHub](https://hub.docker.com/r/sxidsvit/react-table-git)
=======
