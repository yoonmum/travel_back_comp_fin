import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Link as Scroll } from 'react-scroll';

function Search() {
  const [show, setShow] = useState(false);

  return (
    <>
      {/* cover */}
      <div class="uk-inline-block" id="search">
        <div class=" uk-background-cover uk-light">
          <img src="images/cover8.jpg" alt="" />
          <div class="uk-overlay-primary uk-position-cover"></div>

          {/* navbar */}
          <div className="uk-position-top">
            <nav className="uk-navbar-container uk-navbar-transparent uk-navbar" uk-navbar>
              <div className="uk-navbar-left">
                <ul className="uk-navbar-nav">
                  <li className="logoName"><h3>GOLOCAL</h3></li>
                </ul>
              </div>
              <div className="uk-navbar-right">
                <ul className="uk-navbar-nav">
                  <span class="vertical" />
                  <li className="uk-active login"><Link>ลงชื่อเข้าใช้</Link></li>
                </ul>
              </div>
            </nav>
            <hr style={{ width: "1000px", margin: "auto" }} />
          </div>
          {/* สิ้นสุด navbar */}

          <div class="uk-position-center">
            <h2>ค้นหาสถานที่ที่คุณอยากไปพักผ่อน</h2>
            <p>มากกว่า 100 สถานที่ทั่วประเทศ</p>
            {/*ใช้ฟอร์มนี้ตอนค้นหา*/}
            <form class="uk-form">
              <input type="text" placeholder="จังหวัด" />
              <input type="date" />
              <a type="button" onClick={() => setShow(true)} href="#target">ค้นหา</a>
            </form>
          </div>
        </div>
      </div>
      {/* end cover */}


      {/* หลังจากกดค้นหาใช้ตรงนี้แสดงน้อมูล */}
      <div className="uk-child-width-1-1 card" style={{ display: show ? "block" : "none" }} id="target" uk-grid>
        <h2 style={{ textAlign: "center" }}>ชื่อจังหวัดที่ค้นหา</h2>
        <h3 style={{ margin: " 0 20px 0 20px" }}> <span uk-icon="heart"></span> หัวข้อ</h3>

        <div className="uk-grid" style={{ margin: "auto" }}>

          {/* ดึงข้อมูลมา map ตรงนี้ */}
          <div className="each-card uk-width-1-4"> {/*ใส่ฟังก์ชันคลิกตรงนี้ */}
            <div className="uk-card uk-card-default uk-card-hover">
              <div className="uk-card-media-top">
                <img src="images/cover1.jpg" alt="" />
              </div>
              <div className="uk-card-body ">
                <h3 className="uk-card-title">ชื่อสถานที่XXXX</h3>
                <p>ราคาxxxบาท</p>
              </div>
            </div>
          </div>


        </div>
      </div>
      {/* สิ้นสุดการแสดงข้อมูล */}

      {/* <div className="uk-float-right">
        <Scroll activeClass="active" to="search" spy={true} smooth={true} offset={-70} duration={500}>เลื่อนขึ้น</Scroll>
      </div> */}
    </>
  );
}

export default Search;