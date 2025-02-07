import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import { Navigate } from 'react-router-dom';
import { GoCheckCircleFill } from 'react-icons/go';
import { AiFillCloseCircle } from 'react-icons/ai';

const Dashboard = () => {

  const [appointments, setAppointments] = useState([]);
  const { isAuthenticated, user} = useContext(Context);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/appointment/doctor/all",
          {
            withCredentials: true
          }
        )
        setAppointments(data.appointment)
      } catch (error) {
        setAppointments([]);
        console.log("SOME ERROR OCCUR WHILE FETCHING APPOINTMENTS", error);
      }
    }
    fetchAppointment();
  }, [])

  if(!isAuthenticated){
    return <Navigate to={"/login"} />
  }

  return (
    <>
    <section className='dashboard page'>
      <div className="banner">
        <div className="firstBox">
          <img src={user.docAvatar} alt='docImg' />
          <div className="content">
            <div>
              <p>Hello,</p>
              <h5>{user && `${user.firstName} ${user.lastName}`}</h5>
            </div>
            <p>Welcome Back !</p>
          </div>
        </div>
        <div className="secondBox">
          <p>Total Appointments</p>
          <h3>{appointments.length}</h3>
        </div>
      </div>
      <div className="banner">
          <h5>Appointments</h5>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Slot</th>
                <th>Status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {
                appointments && appointments.length > 0 ?
                  (
                    appointments.map(appointment => {
                      return (
                        <tr key={appointment._id}>
                          <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                          <td>{appointment.appointmentDate.substring(0, 10)}</td>
                          <td>{appointment.appointmentTime}</td>
                          <td>{appointment.status}</td>
                          <td>
                            {appointment.hasVisited === true ? <GoCheckCircleFill className='green' /> : <AiFillCloseCircle className='red' />}
                          </td>
                        </tr>
                      )
                    }
                    )) : (<h1> NO APPOINTMENTS!</h1>)
              }
            </tbody>
          </table>
        </div>
    </section>
      
    </>
  )
}

export default Dashboard
