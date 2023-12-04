import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { Navbar } from './c:/Users/prantik sarkar/myapp3/src/components/Navbar';
//import db from '../db.json'
//import { Input } from 'antd';

const UserListing = () => {
    const [userdata, userdatachange] = useState(null);
    const navigate = useNavigate();

    const LoadDetail = (id) => {
        navigate("/user/detail/" + id);
    }
    const LoadEdit = (id) => {
        navigate("/user/edit/" + id);
    }
    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }
    




    useEffect(() => {
        fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json").then((res) => {
            return res.json();
        }).then((resp) => {
            userdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    const [currentPage,setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = userdata && userdata.slice(firstIndex,lastIndex);
    const npage = Math.ceil(userdata && userdata.length / recordsPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1);


    const [search,setSearch] = useState('');


    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Users</h2>
                </div>
                <div className="card-body">
                <div className="divbtn">
                        <input placeholder="Search Names" onChange={(e) => setSearch(e.target.value)} className="form-control"></input>
                    </div>
                    <div className="divbtn">
                        <Link to="user/create" className="btn btn-success">Add New (+)</Link>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Role</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>

                            {records &&
                                records.filter((item)=>{
                                    return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search);
                                }).map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.role}</td>
                                        <td><a onClick={() => { LoadEdit(item.id) }} className="btn btn-success">Edit</a>
                                            <a onClick={() => { Removefunction(item.id) }} className="btn btn-danger">Remove</a>
                                            <a onClick={() => { LoadDetail(item.id) }} className="btn btn-primary">Details</a>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>
                    <nav>
                        <ul className="pagination" >
                            <li className="page-item">
                                <a href="#" className="page-link" onClick={prePage}>Prev

                                </a>

                            </li>
                            {
                                numbers.map((n,i) => (
                                    <li className={`page-item ${currentPage === n ? 'active' : ''}`} key = {i}>
                                        <a href="#" className="page-link" onClick={()=>changeCPage(n)}>{n}

                                        </a>

                                    </li>
                                ))
                            }
                            <li className="page-item">
                                <a href="#" className="page-link" onClick={nextPage}>Next</a>

                            </li>

                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );

    function prePage(){
        if(currentPage !== 1){
            setCurrentPage(currentPage - 1)
        }
    }
    function changeCPage(id){
        setCurrentPage(id)
    }
    function nextPage(){
        if(currentPage !== npage){
            setCurrentPage(currentPage + 1)
        }
    }
}

export default UserListing;