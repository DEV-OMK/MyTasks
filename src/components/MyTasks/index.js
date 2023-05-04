import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTasks extends Component {
  state = {
    taskInput: '',
    tagsInput: tagsList[0].optionId,
    taskList: [],
    activeTagId: '',
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {taskInput, tagsInput} = this.state
    const tagsItem = tagsList.find(eachTag => eachTag.optionId === tagsInput)

    if (taskInput !== '') {
      const newTask = {
        id: uuidv4(),
        task: taskInput,
        tag: tagsItem,
      }

      this.setState(prevState => ({
        taskList: [...prevState.taskList, newTask],
        taskInput: '',
        tagsInput: tagsList[0].optionId,
      }))
    }
  }

  updateActiveTagId = event => {
    this.setState({
      activeTagId: event.target.id,
    })
  }

  onChangeTaskInput = event => {
    this.setState({taskInput: event.target.value})
  }

  onChangeTagsInput = event => {
    this.setState({tagsInput: event.target.value})
  }

  renderTaskInputField = () => {
    const {taskInput} = this.state

    return (
      <div className="input-container">
        <label htmlFor="taskInput" className="input-label">
          Task
        </label>
        <input
          type="text"
          id="taskInput"
          placeholder="Enter the task here"
          value={taskInput}
          className="input-field"
          onChange={this.onChangeTaskInput}
        />
      </div>
    )
  }

  renderTagsInputField = () => {
    const {tagsInput} = this.state

    return (
      <div className="input-container">
        <label htmlFor="tagsInput" className="input-label">
          Tags
        </label>
        <select
          id="tagsInput"
          className="input-field"
          onChange={this.onChangeTagsInput}
          value={tagsInput}
        >
          {tagsList.map(eachTag => (
            <option
              key={uuidv4()}
              value={eachTag.optionId}
              className="tags-option"
            >
              {eachTag.displayText}
            </option>
          ))}
        </select>
      </div>
    )
  }

  renderCreateTaskCard = () => (
    <div className="create-task-card">
      <h1 className="card-title">Create a task!</h1>
      <form className="form-container" onSubmit={this.onSubmitForm}>
        {this.renderTaskInputField()}
        {this.renderTagsInputField()}
        <button type="submit" className="add-task-button">
          Add Task
        </button>
      </form>
    </div>
  )

  renderTagsButtonField = () => {
    const {activeTagId} = this.state
    return (
      <>
        <h1 className="tags">Tags</h1>
        <ul className="tags-button-container">
          {tagsList.map(eachTag => {
            const isActive = eachTag.optionId === activeTagId
            const buttonClassName = isActive
              ? 'tag-button active'
              : 'tag-button'
            return (
              <li key={uuidv4()}>
                <button
                  type="button"
                  className={buttonClassName}
                  id={eachTag.optionId}
                  onClick={this.updateActiveTagId}
                >
                  {eachTag.displayText}
                </button>
              </li>
            )
          })}
        </ul>
      </>
    )
  }

  renderDisplayTasksField = () => {
    const {taskList, activeTagId} = this.state
    let filteredTaskList

    if (activeTagId !== '') {
      filteredTaskList = taskList.filter(
        eachTask => eachTask.tag.optionId === activeTagId,
      )
    } else {
      filteredTaskList = taskList
    }

    if (taskList.length === 0) {
      return <p className="no-task-title">No Tasks Added Yet</p>
    }

    return (
      <ul className="task-list-container">
        {filteredTaskList.map(eachTask => (
          <li key={eachTask.id} className="list-item">
            <p className="task-name">{eachTask.task}</p>
            <p className="task-tag-button">{eachTask.tag.displayText}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderDisplayTasksCard = () => (
    <div className="display-task-card">
      {this.renderTagsButtonField()}
      <h1 className="tags">Tasks</h1>
      {this.renderDisplayTasksField()}
    </div>
  )

  render() {
    return (
      <div className="main-container">
        <div className="responsive-container">
          {this.renderCreateTaskCard()}
          {this.renderDisplayTasksCard()}
        </div>
      </div>
    )
  }
}

export default MyTasks
