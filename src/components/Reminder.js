import React from 'react'
import { useState, useEffect } from 'react';
import AllReminder from './AllReminder';

function Reminder({removeReminder}) {

    const second = new Date().getMilliseconds()   

    const rotateClock = () => {
        const minute_stick = document.querySelector('div .minute-stick')
        const hour_stick = document.querySelector('div .hour-stick')
        minute_stick.style.transform = `rotate(${second}deg)`
    }
    let count = 0
    setInterval(() => {
        const minute_stick = document.querySelector('div .minute-stick')
        minute_stick.style.transform = `rotate(${second}deg)`
    },1000)
    


    const [addReminderState, setAddReminderState] = useState(false)
    const [date, setDate] = useState()

    const toggleAddReminderForm = () => {
        setAddReminderState(!addReminderState)
    }

    function addReminder(){
        const hour = document.getElementsByClassName('hour')[0].innerHTML
        const minute = document.getElementsByClassName('minute')[0].innerHTML
        const time = `${hour} : ${minute}`
        const day = document.getElementById('date_picker').value
        console.log({day, time})
    }

    function setTime(e, displayer_class, type){

        let am_pm
        let am_pm_hr 
        const displayer = document.querySelector(`div .${displayer_class}`)

        if(type == 'Hour'){
            const stick = document.querySelector('div .hour-stick')
            stick.style.transform = `rotate(${e.target.value * 30}deg)`   

            if(e.target.value == 0){
                am_pm = 'a.m.'
                am_pm_hr = 12
            }else{
                am_pm = e.target.value < 12 ? 'a.m.' : 'p.m.'
                am_pm_hr = e.target.value > 12 ? e.target.value - 12 : e.target.value
            }
            displayer.innerHTML = `${type} : ${e.target.value} or ${am_pm_hr} ${am_pm}` 

            let reminder_hour_res = String(e.target.value).length <= 1 ? `0${e.target.value}` : e.target.value

            document.getElementsByClassName('hour')[0].innerHTML = reminder_hour_res
        }else{
            const stick = document.querySelector('div .minute-stick')
            stick.style.transform = `rotate(${e.target.value * 6}deg)`
            displayer.innerHTML = `${type} : ${e.target.value}` 

            let reminder_minute_res = String(e.target.value).length <= 1 ? `0${e.target.value}` : e.target.value

            document.getElementsByClassName('minute')[0].innerHTML = reminder_minute_res
        }

    }

  return (
    <div>

        <div className="go-back" onClick={removeReminder}>
            X
        </div>

        <div className="clock">
            <div className="hour-stick stick"></div>
            <div className="seconds-display">
                00
            </div>
           <div className="minute-stick stick"></div>
        </div>
        
        <button className='btn p-3 btn-primary m-3' onClick = {toggleAddReminderForm}>Add Reminder</button>


        {addReminderState ? <div className="set-reminder-cont">

            <div className="set-reminder">

                <div className="set-hour">
                    <h2>Set Hour</h2>
                    <div className="hour-displayer"></div>
                    <input type="range" className='hour-reminder-selector' defaultValue = '1' step = '1' min = '0' max = '23' list = 'hour-markers' onChange={
                        e => {setTime(e, 'hour-displayer', 'Hour')}
                    }/>
                    <datalist id="hour-markers">
                        <option value="01"></option>
                        <option value="02"></option>
                        <option value="03"></option>
                        <option value="04"></option>
                        <option value="05"></option>
                        <option value="06"></option>
                        <option value="07"></option>
                        <option value="08"></option>
                        <option value="09"></option>
                        <option value="10"></option>
                        <option value="11"></option>
                        <option value="12"></option>
                        <option value="13"></option>
                        <option value="14"></option>
                        <option value="15"></option>
                        <option value="16"></option>
                        <option value="17"></option>
                        <option value="18"></option>
                        <option value="19"></option>
                        <option value="20"></option>
                        <option value="21"></option>
                        <option value="22"></option>
                        <option value="23"></option>
                        <option value="23"></option>
                    </datalist> 
                </div>

                <div className="set-minute">

                    <h2>Set Minute</h2>
                    <div className = 'minute-displayer'></div>
                    <input type="range" className = 'minute-reminder-selector'  step = '1'min = '00' max = '59' onChange = {
                        (e) => {
                            setTime(e,'minute-displayer', 'Minute')
                        }
                    }/>
                    
                </div> 

                <div className="set-day">

                    <h2>Set Day</h2>

                    <input type="date" id='date_picker' onChange = {
                        e => {
                            const months =  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
                            
                            const date = e.target.value
                            let dateArr = date.split('-')
                            dateArr[1] = months[dateArr[1]-1]
                           
                            const day = `${dateArr[1]} ${dateArr[2]}, ${dateArr[0]}`
                            document.querySelector('div .date-displayer')
                            
                            const reminder_day_displayer = document.getElementsByClassName('day')[0]
                            reminder_day_displayer.innerHTML = day

                            setDate(day)
                        }
                    }/>
                    <div className="date-displayer"></div>
                    
                </div>  

                <button className="btn btn-primary p-3 rounded" onClick={addReminder} >Add Reminder</button>

            </div>

            <div className="reminder-display">
                <h2 className="day">Jan 03, 2023</h2>
                <h3 className="time"> 
                    <span className='hour'>00</span>:  
                    <span className='minute'>00</span>
                </h3>
            </div>
        </div> : ''}

        <AllReminder/>
    </div>
  )
}

export default Reminder
