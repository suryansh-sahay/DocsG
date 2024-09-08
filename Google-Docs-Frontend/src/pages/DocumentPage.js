import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import TextEditor from '../components/TextEditor'
import { useParams } from 'react-router-dom'
import axios from 'axios'
export default function DocumentPage() {
  const {documentId} = useParams();
  const [document,setDocument] = useState('');
  useEffect(()=>{
   const getDocument = async()=>{
    const response = await axios.get(`http://localhost:3002/${documentId}`);
    console.log(response.data);
    setDocument(response.data);
   }
   getDocument();
  },[])
  return (
    <div className='documentpage'>
      <Navbar document={document}/>
      <TextEditor />
    </div>
  )
}
