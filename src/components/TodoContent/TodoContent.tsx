import TodoTask from "../TodoTask/TodoTask"
import proptypes from 'prop-types'
import './TodoContent.scss'

const Todo = ({ onClick, tasks, disabled }: { onClick: any, tasks: any, disabled: boolean }) => {
  const renderTasks = () => {
    if (tasks.length) {
      return tasks.map((task: any) => (
        <TodoTask
          key={task.id}
          onClick={() => disabled ? {} : onClick(task, task.id)}
          task={task.task}
          priority={task.priority}
          date={task.date}
          time={task.time}
          isMeeting={task.isMeeting}
        />
      ))
    } else {
      return <p>No Tasks</p>
    }
  }

  return (
    <div className='todo_task_container'>
      {renderTasks()}
    </div>
  )
}

Todo.propTypes = {
  tasks: proptypes.array.isRequired,
  onClick: proptypes.func.isRequired
};
export default Todo