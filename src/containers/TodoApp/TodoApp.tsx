import { Button, Tabs } from 'antd';
import Todo from '../../components/TodoContent/TodoContent'
import './TodoApp.scss'
import React, { useEffect, useState } from 'react';
import TaskModal from '../../components/TaskModal/TaskModal';
import { openNotificationWithIcon } from '../../utils/Notification';
import TodoHeader from '../../components/TodoHeader/TodoHeader';
import { TodoTask } from '../../components/TodoTask/Todo.interface';
import { addNewTodo, deleteTodo, getAllTodos, updateTodo } from '../../services/todo.services';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { setAllTodos, setCurrentTodo } from '../../redux/actions/todo.actions';
import { getItem, setItem } from '../../utils/Storage';




const { TabPane } = Tabs;

const TodoApp: React.FC = () => {

  const dispatch = useDispatch()

  const [tab, setTab] = useState(1)
  const [modalVisible, setModalVisible] = useState<boolean>(false)



  const getTodos = async () => {
    // await dispatch(getAllTodos())
    const tasks = getItem('Todos')
    dispatch(setAllTodos(tasks || []))
  }

  useEffect(() => {
    getTodos()
  }, [])

  const tasks = useSelector((state: RootStateOrAny) => state.todo.allTodos)
  const currentTask = useSelector((state: RootStateOrAny) => state.todo.currentTodo)
  const user = useSelector((state: RootStateOrAny) => state.user.currentUser)


  const onAddHandler = async (values: TodoTask) => {
    const task = { ...values, id: Math.random() * 10 * Date.now() }
    setItem('Todos', [...tasks, task])
    dispatch(setAllTodos([...tasks, task]))
    // await dispatch(addNewTodo({ ...values, isCompleted: false, user: user.id }, tasks))
    openNotificationWithIcon('success', 'Success!', 'Task Added Succesfuly')
  }

  const onUpdateHandler = async (values: TodoTask, tid: string) => {

    // await dispatch(updateTodo(tid, { ...values, user: user.id }, tasks))
    let newSource = [...tasks]
    newSource = newSource.map(o => {
      if (o.id === tid) {
        return { ...values, id: tid }
      }
      return o;
    })
    setItem('Todos', newSource)
    dispatch(setAllTodos(newSource))
    if (values.isCompleted) {
      openNotificationWithIcon('success', 'Success!', 'Task Completed Succesfuly')
    } else {
      openNotificationWithIcon('success', 'Success!', 'Task Updated Succesfuly')
    }
  }




  const onDeleteHandler = async (id: string) => {
    // await dispatch(deleteTodo(id, tasks))
    let newSource = [...tasks]
    newSource = newSource.filter(o => o.id !== id)
    dispatch(setAllTodos(newSource))
    setItem('Todos', newSource)
    openNotificationWithIcon('success', 'Success!', 'Task Deleted Succesfuly')
    // let newTasks = [...tasks]
    // newTasks = newTasks.filter(task => task.id !== id)
    // setTasks(newTasks)
    // setItem('tasks', newTasks)
  }

  return (
    <div className='todoApp'>
      <TodoHeader />
      <div className='tabsContainer'>
        <TaskModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          onAdd={onAddHandler}
          currentTask={currentTask}
          setCurrentTask={() => dispatch(setCurrentTodo())}
          onUpdate={onUpdateHandler}
          onDelete={onDeleteHandler}
        />
        <Tabs
          defaultActiveKey="1"
          onChange={tab => setTab(parseInt(tab))}
        >
          {/* <TabPane
            tab="Public"
            key="0">
            <Todo tasks={tasks} onClick={(values: TodoTask, id) => {
              console.log(values)
              dispatch(setCurrentTodo({ values, id }))
              setModalVisible(true)
            }} disabled />
          </TabPane> */}
          <TabPane
            tab="Pending"
            key="1">
            <Todo disabled={false} tasks={tasks.filter((t: { isCompleted: boolean; user: string }) => !t.isCompleted && t.user === user?.id)} onClick={(values: TodoTask, id) => {
              console.log(values)
              dispatch(setCurrentTodo({ values, id }))
              setModalVisible(true)
            }} />
          </TabPane>
          <TabPane
            tab="Completed"
            key="2">
            <Todo disabled={false} tasks={tasks.filter((t: { isCompleted: boolean; user: string }) => t.isCompleted && t.user === user?.id)} onClick={(values: TodoTask, id) => {
              console.log(values)
              dispatch(setCurrentTodo({ values, id }))
              setModalVisible(true)
            }} />
          </TabPane>
        </Tabs>
      </div>
      {tab === 1 ? <Button className='todo_add_button' onClick={() => setModalVisible(true)} type='primary' style={{}} >
        Add New Todo
      </Button> : null}
    </div>
  )
}

export default TodoApp