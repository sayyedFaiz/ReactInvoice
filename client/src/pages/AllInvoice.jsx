import {getAllInvoice} from "../api/invoiceApi.js"
import { useState, useEffect } from "react"

const AllInvoice = ()=> {
  const [invoiceList, setInvoiceList] = useState([])

  useEffect( ()=>{
    const fetchInvoiceList = async () =>{
      try{
        const invoiceData  = await getAllInvoice()
        console.log(invoiceData)
        setInvoiceList([invoiceData])
      }catch(err){
        console.error("failed to get all the invoices",err)
      }
    }
    fetchInvoiceList()
  },[])

  return (
    <>
    {console.log(invoiceList)}
    {invoiceList.map((data)=>
     <p key={Math.random()}>{data.Result}</p>
    )}

    </>
  )
}

export default AllInvoice