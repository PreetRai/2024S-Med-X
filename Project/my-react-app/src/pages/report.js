import React from "react";
import { useLocation } from "react-router-dom";
import { Page, Text, View, Document, StyleSheet, Image} from '@react-pdf/renderer';


//settign styles for the pdf document
const styles = StyleSheet.create({
  page:{
    flexDirection: 'column',
    backgroundColor: '#ffff',
    padding: 10,
  },

  section:{
    margin:10,
    padding:10,
    flexGrow:1
  },
  image:{
    width:'100%',
    height:'auto',
  }
});

//For rendering the pdf
const MyDocument = ({result, url, formattedDate} )=>(
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Result: {result}</Text>
        <Text>Date: {formattedDate}</Text>
      </View>
      <View style={styles.section}>
        <Text>Image:</Text>
        <Image style={styles.image}src={url} />
      </View>
    </Page>
  </Document>
);


const Report = () => {
  const location = useLocation();
  const result = location.state ? location.state.result: "" ;
  const url = location.state? location.state.img: "";
  

  const currentDate = new Date();

  // Get the current date in a desired format (e.g., "18th January 2014 4:30pm")
  const formattedDate = currentDate.toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }
  );

  //to handle sumbission to pdf file
    const handleSubmit = () =>{

      const blob = new Blob([<MyDocument result={result} url={url} formattedDate={formattedDate}/>],{type:"application/pdf"});

      const newLink =  window.URL.createObjectURL(blob);
      const newWindow = window.open(newLink);

      newWindow.print();

      console.log(result);
      console.log(url);
      console.log(formattedDate);
  };
  return (

    <div
      className=" h-full flex-col   inline-flex gap-10 pl-5 pr-5 pt-5">
      <div className='flex-col  items-start inline-flex gap-5'>
        <div className="text-center text-white text-4xl font-normal font-['Inter']">Report</div>

      </div>
      <div className="justify-center items-center gap-10 inline-flex p-5">

        <div className="self-stretch flex-col justify-start items-start inline-flex">

          <div
            className="flex-col justify-center items-start gap-5 flex w-[200px] h-[300px]">

            <img
              className="rounded-[10px] object-cover w-full h-full"
              src={url}
              alt="Placeholder" />
          </div>
        </div>
        <div
          className="grow shrink basis-0 self-stretch flex-col justify-center items-center gap-5 inline-flex">
          <div
            className=" w-1/2 self-stretch h-12 justify-between items-center inline-flex">
            <div className="text-center  text-white text-xl font-normal font-['Inter']">Results</div>

            <div className=" text-customGreen font-normal font-['Inter']">{formattedDate}</div>
          </div>
          <div className="self-stretch  flex-col justify-start items-start  flex">
            <div
              className="text-center text-customPurple  text-3xl font-normal font-['Inter']">{result}</div>
          </div >
          <div className="group ">
           <button className="group-hover:bg-slate-700 px-5 py-2.5 text-primary bg-white bg-opacity-80 rounded-[5px] justify-start items-start gap-2.5 inline-flex active:bg-green-700 focus:ring focus:ring-gray-700" onClick={handleSubmit}>
           <div className='group-hover:text-white'>Print Report</div>
           </button>
          </div>
           
        </div>
      </div>
    </div>

  );
};

export default Report;
