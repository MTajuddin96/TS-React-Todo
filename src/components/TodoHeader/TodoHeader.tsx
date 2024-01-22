import moment from "moment";
import './TodoHeader.style.scss'

const TodoHeader = () => {
  return (
    <div className='todo_header'>
      <div className='header_date'>
        <p className='header_day'>
          {moment().format('DD')}
        </p>
        <div className='header_month_year_container'>
          <p className='header_month_year'>
            {moment().format('MMM')}
          </p>
          <p className='header_month_year'>
            {moment().format('YYYY')}
          </p>
        </div>
      </div>
      <div>
        <p className='header_day_name'>
          {moment().format('dddd')}
        </p>
      </div>
    </div>
  )
}
export default TodoHeader