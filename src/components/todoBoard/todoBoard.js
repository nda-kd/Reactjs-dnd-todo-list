import React, { Component, createRef } from 'react'
import './todoBoard.styles.css'

class TodoBoard extends Component {
    
  constructor (props) {
    super(props)

    this.item = createRef()

    this.state = {
      list: this.props.data,
      dragging: false,
      dragEnter: false
    }
  }

  handleDragStart (e, params) {
    this.item.current = params
    console.log('refs in dragStart', this.item)

    setTimeout(() => {
      this.setState({ dragging: true })
    }, 0)

    e.target.addEventListener('dragend', () => this.handleDragEnd())
  }

  handleDragEnter (params) {
    console.log('dragEnter in : ', params)

    const draged = this.item.current
    var newList = this.state.list

    newList = newList[params.catId].tasks.splice(params.taskId, 0, newList[draged.catId].tasks.splice(draged.taskId, 1))
    this.item.current = params

    this.setState({ dragEnter: true })
    console.log('dragEnter new List : ', newList)
  }

  handleDragEnd () {
    this.item.current = null
    this.setState({ dragging: false, dragEnter: false })
    console.log('drag has been ended...')
  }

  handleStyle (params) {
    const draged = this.item.current
    if (draged.catId === params.catId && draged.taskId === params.taskId) { return 'drag-bg tasks' } else return 'tasks'
  }

  render () {
    var { dragging, dragEnter, list } = this.state
    return (
      <div className='board-wrap'>
        {list.map((cat, catId) => (
          <div
            key={catId}
            onDragEnter={!cat.tasks.length ? () => this.handleDragEnter({ catId, taskId: 0 }) : null}
          >
            <div className='category'>
              <div className='category-card-wrap'>
                <div className='category-card-title'>
                  {cat.title}
                </div>
                <div className='tasks-wrap'>
                  {cat.tasks.map((task, taskId) => (
                    <div
                      key={taskId}
                      draggable
                      className={dragging && dragEnter ? this.handleStyle({ catId, taskId }) : 'tasks'}
                      onDragStart={(e) => this.handleDragStart(e, { catId, taskId })}
                      onDragEnter={() => this.handleDragEnter({ catId, taskId })}
                    >
                      {task}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default TodoBoard
