import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


const UserDetail = () => {
    const { userid } = useParams();

    const [userdata, userdatachange] = useState({});

    useEffect(() => {
        fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json" + userid).then((res) => {
            return res.json();
        }).then((resp) => {
            userdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);
    return (
        <div>
            {/* <div className="row">
                <div className="offset-lg-3 col-lg-6"> */}

               <div className="container">
                
            <div className="card row" style={{ "textAlign": "left" }}>
                <div className="card-title">
                    <h2>User Details</h2>
                </div>
                <div className="card-body"></div>

                {userdata &&
                    <div>
                        <h2>User name : <b>{userdata.name}</b>  ({userdata.id})</h2>
                        <h3>Contact Details : </h3>
                        <h5>Email : {userdata.email}</h5>
                        <h5>Role : {userdata.role}</h5>
                        <Link className="btn btn-danger" to="/">Back to Listing</Link>
                    </div>
                }
            </div>
            </div>
            {/* </div>
            </div> */}
        </div >
    );
}

export default UserDetail;