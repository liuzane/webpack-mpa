// 基础模块
import React, { useState, useEffect, useRef, useMemo, useCallback, useLayoutEffect, useReducer } from 'react';

// 布局组件
import { LayContent } from '@-react/layouts/LayMain';

const filterList: <T, >(list: T[]) => T[] = (list) => {
  return list.filter(item => Number(item) <= 3);
};

function tasksReducer(tasks: { id: number, text: string, done: boolean }[], action: { [key: string]: any }) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }

    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }

    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const Desktop: React.FC = () => {
  const [ imString, setImString ] = useState<string>('');
  const [ imNumber, setImNumber ] = useState<number>(0);
  const [ imBoolean, setImBoolean ] = useState<boolean>(false);

  const [ count, setCount ] = useState<number>(0);
  const [ list, setList ] = useState<number[]>([]);
  const [ nextId, setNextId ] = useState<number>(3);
  const initialTasks = [
    { id: 0, text: 'Visit Kafka Museum', done: true },
    { id: 1, text: 'Watch a puppet show', done: false },
    { id: 2, text: 'Lennon Wall pic', done: false },
  ];
  const [ tasks, dispatch ] = useReducer(tasksReducer, initialTasks);

  const theListDom = useRef<any>(null);

  const cachedList = useMemo(() => {
    console.log('calculate list', filterList(list));
    return filterList(list);
  }, [ list ]);

  useEffect(() => {
    console.log('useEffect Mounted');
    console.log('useEffect theListDom:', theListDom);
    return () => {
      console.log('useEffect Mounted destoryed');
    };
  }, []);

  useEffect(() => {
    console.log('useEffect Updated');
    return () => {
      console.log('useEffect Updated destoryed');
    };
  });

  useEffect(() => {
    console.log('useEffect Updated by count:' + count);
    return () => {
      console.log('useEffect Updated by count destoryed');
    };
  }, [ count ]);

  useLayoutEffect(() => {
    console.log('useLayoutEffect Mounted');
  }, []);

  useLayoutEffect(() => {
    console.log('useLayoutEffect Updated');
  });

  useLayoutEffect(() => {
    console.log('useLayoutEffect Updated by count:' + count);
  }, [ count ]);

  const handleCount = useCallback((isAdd: boolean): void => {
    setCount(count + (isAdd ? 1 : -1));
  }, [ count ]);

  console.log('function render');
  
  const handleList = (): void => {
    setList(list.concat(Math.floor(Math.random() * 10)));
  };


  const handleAddTask = useCallback(function (text) {
    console.log('nextId', nextId);
    setNextId(nextId + 1);
    dispatch({
      type: 'added',
      id: nextId,
      text: text,
    });
  }, [ tasks, nextId ]);
  // function handleAddTask(text) {
  //   dispatch({
  //     type: 'added',
  //     id: nextId++,
  //     text: text,
  //   });
  // }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

  return (
    <LayContent>
      <h3>basic-types:</h3>
      <ul ref={theListDom}>
        <li>string: { typeof imString }</li>
        <li>number: { typeof imNumber }</li>
        <li>boolean: { typeof imBoolean }</li>
        <li>Current count number: { count }</li>
      </ul>
      <div>list: { list.toString() } <button onClick={ handleList }>Add</button></div>
      <div>cachedList: { cachedList.toString() }</div>
      <button onClick={ handleCount.bind(this, true) }>Add</button>
      <button onClick={ handleCount.bind(this, false) }>Minus</button>
      <AddTask onAddTask={ handleAddTask } />
      <TaskList
        tasks={ tasks }
        onChangeTask={ handleChangeTask }
        onDeleteTask={ handleDeleteTask }
      />
    </LayContent>
  );
};

function AddTask({ onAddTask }) {
  const [ text, setText ] = useState('');
  return (
    <div>
      <input
        placeholder="Add task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          setText('');
          onAddTask(text);
        }}
      >
        Add
      </button>
    </div>
  );
}

function TaskList({ tasks, onChangeTask, onDeleteTask }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Task 
            task={task} 
            onChange={onChangeTask} 
            onDelete={onDeleteTask}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ task, onChange, onDelete }) {
  const [ isEditing, setIsEditing ] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={(e) => {
            onChange({
              ...task,
              text: e.target.value,
            });
          }}
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          onChange({
            ...task,
            done: e.target.checked,
          });
        }}
      />
      {taskContent}
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </label>
  );
}

export default Desktop;