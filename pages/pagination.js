import React from 'react'
import ReactPaginate from 'react-paginate'

function pagination() {
    const handlePageClick = async(event) => {
        console.log('eve ',event.selected);
    }
    var max_num_pages = 10;
    var itemOffset = 24;
    return (
        <div>
            <ReactPaginate
							breakLabel="..."
							nextLabel="next >"
							onPageChange={handlePageClick}
							pageRangeDisplayed={2}
							pageCount={max_num_pages}
							previousLabel="< previous"
							renderOnZeroPageCount={null}
						/>
            <ReactPaginate
							breakLabel="..."
							nextLabel="next >"
							onPageChange={handlePageClick}
							pageRangeDisplayed={2}
							pageCount={max_num_pages}
							previousLabel="< previous"
							renderOnZeroPageCount={null}
							forcePage={itemOffset}
						/>
        </div>
    )
}

export default pagination
