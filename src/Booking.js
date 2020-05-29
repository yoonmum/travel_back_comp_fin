import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useLocation } from "react-router-dom";

const customStyles = {
    content: {
        top: '55%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
};

function Booking() {
    const location = useLocation();
    var subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [cus_name, setName] = useState();
    const [cus_email, setEmail] = useState();
    const [cus_phone, setPhone] = useState();
    const [total, setTotal] = useState(0);
    const [vat, setVat] = useState(0);
    const [tom, setTom] = useState(0);

    useEffect(() => {
        var price = location.state.data.trip_price;
        var v = (price - ((price / 1.07).toFixed(2))).toFixed(2);
        setVat(v);
        var t = (price * 0.1).toFixed(2);
        setTom(t);
        var total = parseInt(t) + parseInt(price);
        setTotal(total.toFixed(2));
    }, [])

    return (

        <div uk-sticky="top:100">
            <button onClick={() => setIsOpen(true)} className="uk-button-primary" style={{ padding: "5px 15px 5px 15px", cursor: "pointer" }}>จอง</button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={() => setIsOpen(true)}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <div className="uk-panel uk-panel-scrollable" style={{ width: "1000px", height: "400px" }}>
                    <div>
                        <h2 ref={_subtitle => (subtitle = _subtitle)}>ข้อมูลติดต่อ</h2>
                        <p className="uk-text-primary"><strong>ทริปที่เลือก</strong><br />{location.state.data.trip_name} {location.state.date}</p>
                    </div>
                    <form>
                        <div className="uk-margin">
                            <label className="uk-form-label" for="form-stacked-text">ชื่อผู้จอง</label>
                            <div className="uk-form-controls">
                                <input style={{borderRadius: 0}} className="uk-input uk-form-width-large" type="text" placeholder="ชื่อนามสกุล" name="cusName" onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="uk-column-1-2">
                                <label className="uk-form-label" for="form-stacked-text">โทรศัพท์มือถือ</label>
                                <div className="uk-form-controls">
                                    <input style={{borderRadius: 0}} className="uk-input uk-form-width-medium" type="text" placeholder="โทรศัพท์มือถือ" name="cusPhone" onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <label className="uk-form-label" for="form-stacked-text">อีเมลของผู้จอง</label>
                                <div className="uk-form-controls">
                                    <input style={{borderRadius: 0}} className="uk-input" type="text" placeholder="อีเมลของผู้จอง" name="cusMail" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>
                        </div>

                    </form>
                    <hr />
                    <form>
                        <div>
                            <h2 ref={_subtitle => (subtitle = _subtitle)}>รายละเอียดราคา</h2>
                            <div className="uk-column-1-2">
                                <div>
                                    <p style={{ margin: 0 }}>ทริปที่เลือก</p>
                                    <p style={{ margin: 0 }}>ราคาทริป</p>
                                    <p style={{ margin: 0 }}>อัตราภาษี(7%)</p>
                                    <p style={{ margin: 0 }}>ค่าธรรมเนียม Goalocal(10%)</p>
                                    <p style={{ margin: 0 }}><strong>รวม</strong></p>
                                </div>
                                <div>
                                    {/* {setTotal(total+location.state.data.trip_price)} */}
                                    <p style={{ margin: 0 }}>{location.state.data.trip_name}</p>
                                    <p style={{ margin: 0 }}>{(location.state.data.trip_price).toFixed(2)} บาท</p>
                                    <p style={{ margin: 0 }}>{vat} บาท</p>
                                    <p style={{ margin: 0 }}>{tom} บาท</p>
                                    <p style={{ margin: 0 }}><strong>{total} บาท</strong></p>
                                </div>
                            </div>
                        </div>
                        <div className="uk-modal-footer  uk-text-right">
                            <button className="uk-button uk-button-default uk-modal-close" onClick={() => setIsOpen(false)}>ยกเลิก</button>
                            <input type="button" className="uk-button uk-button-primary" onClick={() => createCustomer()} value="ยืนยัน" style={{ marginLeft: "20px" }} />
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );

    function createCustomer() {

        const cus = {
            "cus_name": cus_name,
            "cus_email": cus_email,
            "cus_phone": cus_phone,
        }

        axios.post('http://localhost:5001/customer/add', cus)
            .then(response => {

                const book = {
                    "bk_status": "true",
                    "trip_id": location.state.data._id,
                    "cus_id": response.data
                }

                axios.get('http://localhost:5001/provider/' + location.state.proID)
                    .then(res => {
                        const pro = {

                            "cus_email": res.data.provi_email + "," + cus.cus_email
                        }
                        axios.post('http://localhost:5001/sendEmail/send', pro);
                    })

                axios.post('http://localhost:5001/booking/add', book)
                    .then(res => { })
            })

        alert("การจองสำเร็จ")
        setIsOpen(false)
    }

}
export default Booking;