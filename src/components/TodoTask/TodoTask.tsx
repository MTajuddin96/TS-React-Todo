import proptypes from 'prop-types';
import moment from 'moment';
import './TodoTask.scss';

const TodoTask = ({ task, priority, date, time, onClick }: { task: string, priority: string, date: string, time: string, onClick: Function }) => {
  return (
    <div className='todo_task' onClick={() => onClick()}>
      <div className='decription_container'>
        <p className='todo_description'>{task}</p>
        <p className='todo_deadline'>{`Deadline ${moment(time).format('hh:mm  a')} | ${moment(date).format('DD MMM')}`}</p>
      </div>
      <div className='todo_priority' style={{ color: priority === 'High' ? '#e62e2e' : priority === 'Medium' ? '#1e79d8' : '#3ACC1E' }}>
        <div className='priority_icon' style={{ background: priority === 'High' ? '#e62e2e' : priority === 'Medium' ? '#1e79d8' : '#3ACC1E' }} />
        <p>{priority}</p>
      </div>
    </div>
  )
}

TodoTask.propTypes = {
  priority: proptypes.string.isRequired,
  task: proptypes.object.isRequired,
  date: proptypes.string.isRequired,
  time: proptypes.string.isRequired,
  onClick: proptypes.func.isRequired,
  isMeeting: proptypes.bool
};
export default TodoTask