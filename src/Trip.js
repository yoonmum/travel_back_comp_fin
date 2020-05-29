import React,{useEffect, useState} from 'react';
import './trip-style.css';
import Booking from './Booking.js';
import {useLocation} from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from 'axios';

function Trip(props) {
    const history = useHistory()
    const location = useLocation();
    const [pro_name,setName] = useState();
    const [pro_phone,setPhone] = useState();
        // console.log(location.state.data);
    // location.state.data.provi_id
    useEffect(() => {
        axios.get('http://localhost:5001/provider/'+location.state.data.provi_id)
          .then(response => {
              setName(response.data.provi_name);
              setPhone(response.data.provi_phone);
            //   console.log(response.data);
          })
      }, [])

    return (
        <>
            <div >
                {/* navbar */}
                <div className="uk-overflow-auto">
                    <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky; bottom: #transparent-sticky-navbar uk-position-relative">
                        <nav className="uk-navbar-container" style={{ backgroundColor: "rgb(32, 141, 241)", position: "relative", zIndex: "980" }}>
                            <div className="uk-navbar-left detail-navbar">
                                <ul className="uk-navbar-nav">
                                    <li ><a><img className="logo" src="images/logo2.png" width="100px" /></a></li>
                                    <li><a href="/" style={{ color: "white" }}>หน้าแรก</a></li>
                                    <li><a style={{ color: "white" }}><span uk-icon="bolt"></span>โปรโมชั่น</a></li>
                                </ul>
                                <div className="uk-navbar-right">
                                    <ul className="uk-navbar-nav">
                                        <li className="uk-active"><a style={{ color: "white" }}>ลงชื่อเข้าใช้</a></li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
                {/* จบ navber */}

                <div className="cover-detail"></div>
                {/* กรอบแรก: รูปภาพของทริป */}
                <div className="card-contain">

                    <div className="uk-card uk-card-default uk-card-body uk-width-auto uk-position-center" style={{ marginTop: "100px" }}>
                        <h3 className="uk-card-title" style={{ marginBottom: 5 }}>{location.state.data.trip_name}
                            <span className="uk-label" style={{ marginLeft: "10px" }}>{location.state.data.trip_type}</span>
                        </h3>
                        <p className="uk-text-muted	"><span uk-icon="location"></span>ที่อยู่ : {location.state.data.trip_district} {location.state.data.trip_province}</p>
                        <hr />

                        {/* แสดงรูป คลิกดูรูปใหญ่ได้*/}
                        <div className="uk-flex" uk-grid uk-lightbox="animation: slide">
                            <div className="uk-width-1-1 large-img" uk-lightbox>
                                <a className="uk-inline" href="images/cover5.jpg"><img src="images/cover5.jpg" /></a>
                            </div>
                            <div className="uk-width-auto medium-img" style={{ marginLeft: "1%" }}>
                                <div className="uk-margin" >
                                    <div className="uk-width-1-1" uk-lightbox >
                                        <a className="uk-inline" href="images/cover1.jpg"><img src="images/cover1.jpg" alt="" /></a>
                                    </div>
                                </div>
                                <div className="uk-margin">
                                    <div className="uk-width-1-1" uk-lightbox>
                                        <a className="uk-inline" href="images/cover2.jpg"><img src="images/cover2.jpg" alt="" /></a>
                                    </div>
                                </div>
                                <div className="uk-margin">
                                    <div className="uk-width-1-1" uk-lightbox>
                                        <a className="uk-inline" href="images/cover4.jpg" >
                                            <a className="uk-inline" href="images/cover7.jpg" >
                                                <img src="images/cover4.jpg" alt="" />
                                            </a>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* สิ้นสุดแสดงรูป */}
                    </div>
                </div>
                {/* จบกรอบแรก */}

                {/* กรอบที่2: รายละเอียดทริป เป็นตาราง */}
                <div className="uk-overflow-auto">
                    <div className="uk-flex uk-flex-center" style={{ margin: "20px" }}>
                        <div className="card-contain-margin uk-width-3-5@m uk-width-2-3@l">
                            <div className="uk-card uk-card-default uk-card-body">
                                {/* หัวตาราง */}
                                <h3 className="uk-card-title" style={{ marginBottom: 5 }}><span uk-icon="info"></span> ข้อมูล</h3>
                                <hr />

                                {/* เริ่มต้นตาราง */}
                                {/* <table class="uk-table uk-table-divider uk-table-hover uk-table-responsive"> */}

                                <table className="uk-table uk-table-small uk-table-divider uk-table-hover ">
                                    <thead >
                                        <tr>
                                            <th className="uk-text-primary uk-table-expand"><strong>ชื่อทริป</strong></th>
                                            <th className="uk-text-primary"><strong><span uk-icon="calendar"></span>วัน/เดือน/ปี</strong></th>
                                            <th className="uk-text-primary "><strong><span uk-icon="user"></span>ผู้ให้บริการ</strong></th>
                                            <th className="uk-text-primary"><strong><span uk-icon="credit-card"></span>ราคา (บาท)</strong></th>
                                            <th className="uk-text-primary"><strong><span uk-icon="receiver"></span>ข้อมูลติดต่อ</strong></th>
                                            <th className="uk-text-primary"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="uk-text-center">
                                            <td>{location.state.data.trip_name}</td>
                                            <td>{location.state.date}</td>
                                            {/* {list.provi_name} */}
                                            <td className="uk-text-nowrap">{pro_name}</td>
                                            <td className="uk-text-nowrap">{location.state.data.trip_price}</td>
                                            <td className="uk-text-nowrap">{pro_phone} <br/> {} </td>
                                            <td onClick={() => history.push("/trip",{data: location.state.data,date:location.state.date,proID:location.state.data.provi_id})}><Booking  /></td>
                                        </tr>
                                    </tbody>
                                </table>
                                {/* สิ้นสุดตาราง */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* จบกรอบที่2 */}

                {/* กรอบที่3: ความคิดเห็นจากผู้ใช้บริการ*/}
                <div className="uk-flex uk-flex-center">
                    <div className="uk-card uk-card-default uk-card-body uk-width-3-5@m uk-width-2-3@l">
                        <h3 className="uk-card-title" style={{ marginBottom: 5 }}>ความเห็นจากผู้ใช้บริการ</h3>
                        <hr />
                        <header className="uk-comment-header uk-grid-medium uk-flex-middle" uk-grid>
                            <div className="uk-width-auto">
                                <img className="uk-comment-avatar" src="images/cover1.jpg" width="80" height="80" alt="" />
                            </div>
                            <div className="uk-width-expand">
                                <h4 className="uk-comment-title uk-margin-remove"><a class="uk-link-reset" href="#">Author</a></h4>
                                <ul className="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                                    <li><a href="#">12 days ago</a></li>
                                    <li><a href="#">Reply</a></li>
                                </ul>
                            </div>
                        </header>
                        <div className="uk-comment-body">
                            <p>Lorlabore.</p>
                        </div>
                        <hr />
                       
                    </div>
                </div>
                {/* จบกรอบที่3 */}

            </div>
        </>
    );
}

export default Trip;
