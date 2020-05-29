import React, { useState, useEffect } from 'react';
import { Link as Scroll } from 'react-scroll';
import './search-style.css';
import { useHistory } from "react-router-dom";
import axios from 'axios';


function Search() {
  const history = useHistory()
  const [show, setShow] = useState(false);
  const [pro_name, setProName] = useState();
  const [box, setBox] = useState();
  const [list, setList] = useState();
  const [notFound, setFound] = useState(true);
  const [date, setDate] = useState();

  useEffect(() => {
    axios.get('http://localhost:5001/trip/')
      .then(response => {
        setList(response.data);
      })
  }, [])

  function searchTrip() {
    const result = list.filter((list) => {

      var da = new Date(list.trip_date);
      var month = da.getUTCMonth()+1;
      var day = da.getDate();
      var year = da.getUTCFullYear();
      var newdate1 = day+"-"+month+"-"+year;

      var da2 = new Date(date);
      var month2 = da2.getUTCMonth()+1;
      var day2 = da2.getDate();
      var year2 = da2.getUTCFullYear();
      var newdate2 = day2+"-"+month2+"-"+year2;

      setDate(newdate2);

      if (list.trip_province == pro_name && newdate1==newdate2) {
        setFound(false);
        return list;
      }

    })
    setBox(result);
  }

  // function showTrip(result){
  let cards;
  // if(box)
  if (box) {
    cards = box.map((data,i) => {
      return (
        <div className="each-card uk-width-medium" onClick={() => history.push("/trip",{data: data , date: date})} key={i} >
          <div className="uk-card uk-card-default uk-card-hover">
            <div className="uk-inline-clip uk-transition-toggle" tabIndex="0">
              <div className="uk-card-media-top">

                <img src="images/cover1.jpg" alt="" />
                <div className="uk-card-body ">
                  <h3 className="uk-card-title">
                    <div className="uk-panel uk-panel-box uk-text-truncate">{data.trip_name}</div>
                  </h3>
                  <p>ราคา {data.trip_price} บาท</p>
                </div>
              </div>
              <div className="uk-transition-fade uk-position-cover uk-overlay uk-overlay-primary uk-flex uk-flex-center uk-flex-middle">
                <p className="uk-h4 uk-margin-remove">คลิกเพื่อดูรายละเอียด</p>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }

  function CheckFound() {
    return (
      <h2 style={{ textAlign: "center"}}>ไม่พบสิ่งที่ท่านกำลังค้นหา</h2>
    )
}

  return (
    <>
      <div className="uk-overflow-auto">
        < div className="cover search" >
          <div className="img-container">
            <div className="image-wrapper">
              <img src="images/cover8.jpg" alt="" style={{ opacity: 0.85 }} />
            </div>
          </div>

          <div className="uk-position-top search-navbar">
            <nav className="uk-navbar-container uk-navbar-transparent uk-navbar">
              <div className="uk-navbar-left">
                <ul className="uk-navbar-nav">
                  <li className="logoName"><img className="logo" src="images/logo2.png" width="120px" style={{ position: "absolute", top: 0 }} /></li>
                </ul>
              </div>
              <div className="uk-navbar-right">
                <ul className="uk-navbar-nav">
                  <span className="vertical" />
                  <li className="uk-active"><a style={{ color: "white"}}>ลงชื่อเข้าใช้</a></li>
                  {/* <li><input className="uk-active login" type="button" value="ลงชื่อเข้าใช้" onClick={() => history.push("/admin")}/></li> */}
                </ul>
              </div>
            </nav>
            <hr className="horizontal" />
          </div>

          <div className="uk-position-center uk-light">
            <h2>ค้นหาสถานที่ที่คุณอยากไปพักผ่อน</h2>
            <p>มากกว่า 100 สถานที่ทั่วประเทศ</p>
            {/*ใช้ฟอร์มนี้ตอนค้นหา*/}
            <form className="uk-form">
              <input type="text" placeholder="จังหวัด" onChange={(e) => setProName(e.target.value)} />
              <input type="date" onChange={(e)=> setDate(e.target.value)}/>
              {/* <a type="button" onClick={() => setShow(true)} href="#target">ค้นหา</a> */}
              <Scroll activeClass="active" to="card-container" spy={true} smooth={true} offset={-70} duration={500} onClick={() => setShow(true)}>
                <input className="button-search" type="button" onClick={() => searchTrip()} value="ค้นหา" />
              </Scroll>
            </form>
          </div>
        </div>

        {/* หลังจากกดค้นหาใช้ตรงนี้แสดงข้อมูล */}

        <div className="card-container">
          <div className="uk-child-width-1-1 card" style={{ display: show ? "block" : "none" }}>
            <div className="div1">
              <h2 className="parent-colorless" style={{ textAlign: "center" }}><span style={{fontSize:"40px"}}>{pro_name}</span>
              <h2 className="colorless">{pro_name}</h2>
              </h2>
            </div>

            {/* <h3 style={{ margin: " 20px 0 20px 50px" }}> <span uk-icon="heart"></span> หัวข้อ</h3> */}

            <div className="uk-grid card-group" style={{ margin: "auto" }}>
              {/* ดึงข้อมูลมา map ตรงนี้ */}
              {cards}
              {notFound ? <CheckFound /> : ""}

            </div>
            <div style={{ display: "block" }}>
              {/* <Scroll activeClass="active" to="search" spy={true} smooth={true} offset={-70} duration={500} style={{ color: "white" }}> */}
              <input type="button" className="scroll-top" value="เลื่อนขึ้น" />
              {/* </Scroll> */}
            </div>
          </div>
        </div>
        {/* สิ้นสุดการแสดงข้อมูล */}

      </div>
    </>
  );
}

export default Search;