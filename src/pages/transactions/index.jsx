import React, { useState, useEffect } from 'react'
import { CiSearch } from 'react-icons/ci'
import ReactPaginate from 'react-paginate'

import * as XLSX from 'xlsx';

import Filter from "../../assets/svg/filter.svg"

import { api } from '../../services/api'
import { appUrls } from '../../services/urls'
import { Skeleton } from '@mui/material'

const Transactions = () => {
  const [allTransactions, setAllTransactions] = useState([])
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10)
  const [itemOffset, setItemOffset] = useState(0);
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")

  const getTransactionsList = async () => {
    setLoading(true)
    await api.get(appUrls?.TRANSACTION_URL)
    .then((res) => {
      setLoading(false)
          console.log(res, "res")
          setAllTransactions(res?.data?.data?.transactions)
    })
    .catch((err) => {
      setLoading(false)
      console.log(err, "err")
    })
  }

  useEffect(() => {
    getTransactionsList()
  }, [])

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(allTransactions);
    XLSX.utils.book_append_sheet(wb, ws, 'Transactions');
    XLSX.writeFile(wb, 'transactions.xlsx');
  };



  console.log(allTransactions, "allTransactions")

  const filteredData = allTransactions?.filter((item) => 
    item?.user?.name?.toLowerCase().includes(search?.toLowerCase()) || ""
)

const formatter = new Intl.NumberFormat('en-US');

  //Get Current data
  const endOffset = itemOffset + perPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentData = filteredData?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredData?.length / perPage);


  //Change Page 
  const handlePageClick = (event) => {
      const newOffset = (event.selected * perPage) % filteredData?.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

  return (
     <div className='p-4 flex flex-col mx-[33px] gap-[28px]'>
   
    <div className='bg-[#fff] p-[21px] h-[123px] rounded-lg flex items-center justify-between'>
      <div className='flex flex-col w-[161px] p-3 h-[81px]'>
        <p className='text-[12px] font-bold'>Total Transactions</p>
        <p className='text-[24px]'>{`${allTransactions?.length}`}</p>
      </div>
   
     
    </div>

    <div className='bg-[#fff] flex flex-col pt-[23px] pl-[33px] pr-[33px] pb-[76px] mt-[28px] rounded'>
      <div className='flex gap-3 items-center mb-[11px]'>
          <div className='w-full bg-[#F8F8FA] flex items-center gap-[10px] p-2  rounded-lg'>
            <CiSearch className='w-[24px] h-[24px] text-[#9A9AA6]'/>
            <input 
                name='search'
                placeholder='Search'
                onChange={(e) => setSearch(e.target.value)}
                className='outline-none w-full font-hanken bg-transparent text-[#8B8B8B] text-[11px]'
            />
            <div className=' cursor-pointer  flex justify-center gap-2 items-center '>
                <img src={Filter} alt='filter' />
                <p className='text-[#1C1C1CE5] font-mont font-semibold text-[11px] lg:text-sm '>Filter</p>
            </div>
          </div>
          <button 
            className='text-[#fff] font-inter text-xs w-[102px] h-[40px] bg-[#263238] rounded-lg' 
          >
            Search
          </button>
          <button 
            className='text-[#fff] font-inter text-xs w-[112px] h-[40px] bg-[#6FCF97] rounded-lg'
            onClick={exportToExcel} 
          >
            Export to CSV
          </button>
        </div>
        <hr />
        <>
        {
           loading 
           ?
             <Skeleton variant='rectangular' width="100%" height="400px" style={{ backgroundColor: 'rgba(0,0,0, 0.06)', borderRadius: "8px"}}/>
           :
          <table className='w-full '>
            <tr className='h-[50px] bg-[#FAFAFA] border-0' >
                <th className="font-medium px-2 text-[12px] text-[#B5B5C3] font-poppins text-left">
                    Name
                </th>
                <th className="font-medium px-2 text-[12px] text-[#B5B5C3] font-poppins text-left">
                    Email
                </th>
                <th className="font-medium px-2 text-[12px] text-[#B5B5C3] font-poppins text-left">
                    Amount
                </th>
                <th className="font-medium px-2 text-[12px] text-[#B5B5C3] font-poppins text-left">
                    Reference
                </th>
                <th className="font-medium px-2 text-[12px] text-[#B5B5C3] font-poppins text-left">
                    status
                </th>
                
              
            </tr>
            {currentData?.length > 0 ? currentData?.map((data, index) => (
                <tr key={index} className='bg-[#fff] h-[56px] border-t border-grey-100'>
                    <td className=" h-[70px] px-2 font-medium">
                      <p className='text-sm text-[#464E5F] font-medium font-poppins'>{data?.user?.name}</p>
                    </td>
                    <td className='h-[70px]  px-2 items-center justify-center cursor-pointer'>
                        <p className='text-sm text-[#464E5F] font-medium font-poppins'>{data?.user?.email}</p>
                    </td>
                    <td className='h-[70px]  px-2 items-center justify-center cursor-pointer'>
                        <p className='text-sm text-[#464E5F] font-medium font-poppins'>{`₦${formatter.format(data?.total_amount)}`}</p>
                    </td>
                    <td className='h-[70px]  px-2 items-center justify-center cursor-pointer'>
                        <p className='text-sm text-[#464E5F] font-medium font-poppins'>{data?.reference_code}</p>
                    </td>
                    <td className='h-[70px]  px-2 items-center justify-center cursor-pointer'>
                        <p className={`${data?.status === "Success" ? "text-[#27AE60]" : "text-[#f00]"} text-sm font-Mont text-left`}>
                            {`${data?.status}`}
                        </p>
                    </td>
                    
                </tr>
            )) : 
              <tr className='h-[654px] bg-white border-t border-grey-100'>
                <td colSpan="8" className="relative">
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='flex flex-col gap-2 items-center'>
                            {/* <img src={Empty} alt='empty' className='w-[159px] h-[103px]'/> */}
                            <p>Oops! Nothing to see here.</p>
                        </div>
                    </div>
                </td>
            </tr>
            }
          </table>
        }
          <div className='flex   mb-5'>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                className='w-full flex justify-end  gap-4 '
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
            />

            </div>
          
        </>
    </div>

  </div>
  )
}

export default Transactions