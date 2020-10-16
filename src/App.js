import React, { useState } from 'react';
import _ from 'lodash'
import ReactPaginate from 'react-paginate'
import Loader from './components/Loader/Loader';
import MainTable from './components/MainTable/MainTable'
import DetailRowView from './components/DetailRowView/DetailRowView'
import ModeSelector from './components/ModeSelector/ModeSelector'
import TableSearch from './components/TableSearch/TableSearch'
import TableNewData from './components/TableNewData/TableNewData';

function App() {

  // Initialization
  const initialSortDirection = 'asc'
  const initialSortField = 'id'
  const dataPerPage = 50 // when to start showing pagination

  //  State
  const [isModeSelect, setIsModeSelect] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState(initialSortDirection) // asc or desc
  const [sortField, setSortField] = useState(initialSortField)
  const [selectedRow, setSelectedRow] = useState(null)
  const [currentPage, setCurrentPage] = useState(0)

  //  Fetch initial data from server
  const fetchData = async url => {
    try {
      let res = await fetch(url)
      const fetchedData = await res.json()
      setLoading(false)
      setData(_.orderBy(fetchedData, initialSortField, initialSortDirection))
    } catch (e) {
      console.log('Сервер не возвращает нужные данные. Попробуйте позже ...')
    }
  }


  // Handlers 
  const onModeSelectHandler = (url) => () => {
    setIsModeSelect(true)
    setLoading(true)
    fetchData(url)
  }

  const onSortHandler = (sortField) => {
    // To avoid unnecessary requests to the server the cloneData variable has been created
    const clonedData = data
    const sortDirection = sort === 'asc' ? 'desc' : 'asc'
    const orderedData = _.orderBy(clonedData, sortField, sortDirection)

    setData(orderedData)
    setSort(sortDirection)
    setSortField(sortField)
  }

  const onRowSelectHandler = (item) => {
    setSelectedRow(item)
  }

  const onPageChangeHandler = ({ selected }) => {
    setCurrentPage(selected)
  }

  const onSearchHandler = (search) => {
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

  return (
    <div className="container d-flex flex-column justify-content-beetwen align-items-center mt-5 mb-5">
      {
        !isModeSelect
          ? <ModeSelector onSelect={onModeSelectHandler} />
          : loading
            ? <Loader />
            :
            <div>
              <TableNewData data={data} setData={setData} />
              <TableSearch onSearch={onSearchHandler} />
              <MainTable
                data={displayData}
                sort={sort}
                sortField={sortField}
                onSort={onSortHandler}
                onRowSelect={onRowSelectHandler}
              />
            </div>


      }
      {
        data.length > dataPerPage
          ? <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={4}
            marginPagesDisplayed={2}
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            containerClassName={'pagination'}
            activeClassName={'page-item active'}
            previousClassName="page-item"
            nextClassName="page-item"
            pageLinkClassName="page-link"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
            onPageChange={onPageChangeHandler}
            forcePage={currentPage} // To go to the first pagination button after the search
          /> : null
      }
      {
        selectedRow
          ? <DetailRowView person={selectedRow} />
          : null
      }
    </div >
  )
}

export default App;
