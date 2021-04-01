import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import './ColumnList.css';
import { CreateColumnForm } from '../CreateColumnForm/CreateColumnForm';
import { ColumnItem } from '../ColumnItem/ColumnItem';

import { addColumn, removeColumn, removeTaskIdFromColumn, switchTasksOrderInTheSameColumn, switchTasksOrderInTheDifferentColumns } from '../../store/column/action';
import { removeTask } from '../../store/task/action';
import { addColumnOrder, removeColumnOrder, switchColumnOrder } from '../../store/columnOrder/action';

export const ColumnList = () => {

  const [title, setTitle] = useState('');
  const [isCreateColumn, setIsCreateColumn] = useState(false);

  const dispatch = useDispatch();

  const columnList = useSelector(state => state.columns.columnList);
  const tasks = useSelector(state => state.tasks.tasks);
  const columnOrder = useSelector(state => state.columnOrder.columnOrder);

  const handleAddColumn = () => {
    if (title) {
      const column = {
        id: nanoid(),
        title,
        taskIds: []
      }

      dispatch(addColumn(column));
      dispatch(addColumnOrder(column.id));
      setIsCreateColumn(false);
      setTitle('');
    }
  }

  const handleResetAddingColumn = () => setIsCreateColumn(false);

  const handleDeleteColumnItem = (id) => {
    columnList[id].taskIds.map(taskId => dispatch(removeTask(taskId)) && dispatch(removeTaskIdFromColumn(taskId, id)));
    dispatch(removeColumn(id));
    dispatch(removeColumnOrder(id));
  }

  const handleOnDragEnd = (result) => {

    const { destination, source, draggableId, type } = result;
    
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    if (type === 'column') {
      const newColumnOrder = [...columnOrder];
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      dispatch(switchColumnOrder(newColumnOrder));
      return;
    }

    const startColumn = columnList[source.droppableId];
    const finishColumn = columnList[destination.droppableId];

    if (startColumn === finishColumn) {
      const newTaskIds = [...startColumn.taskIds];
    
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      dispatch(switchTasksOrderInTheSameColumn(newColumn));
      return;
    }

    const startColumnTaskIds = [...startColumn.taskIds];
  
    startColumnTaskIds.splice(source.index, 1);

    const newStartColumn = {
      ...startColumn,
      taskIds: startColumnTaskIds,
    };

    const finishColumnTaskIds = [...finishColumn.taskIds];
    finishColumnTaskIds.splice(destination.index, 0, draggableId);

    const newFinishColumn = {
      ...finishColumn,
      taskIds: finishColumnTaskIds
    };

    dispatch(switchTasksOrderInTheDifferentColumns(newStartColumn, newFinishColumn));      
  }

  return <>
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId='all-columns' direction='horizontal' type='column'> 
      {provided => (
        <div className='columns'
            {...provided.droppableProps}
            ref={provided.innerRef}>
          
          <ul className='ul_columns'>

            {columnOrder.length ?
            columnOrder.map((columnId, index) => {
              const column = columnList[columnId];
              const columnTasks = column.taskIds.map(taskId => tasks[taskId] );
              
              return <li key={column.id} className='li_column'>

                <ColumnItem title={column.title} 
                            deleteColumn={handleDeleteColumnItem} 
                            columnId={column.id}
                            columnTasks={columnTasks}
                            index={index} />
              </li>
            } ) : false }       
            {provided.placeholder}
          </ul>

          {isCreateColumn && <CreateColumnForm value={title} setValue={setTitle} addColumn={handleAddColumn} 
          resetAddingColumn={handleResetAddingColumn} /> }
        
          {!isCreateColumn && <button onClick={() => setIsCreateColumn(true)} className='column_btn'>
            Add column +
          </button>}
            
        </div>
      )}
      </Droppable>
    </DragDropContext>
  </>
}