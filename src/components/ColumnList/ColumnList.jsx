import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import './ColumnList.css';
import { CreateColumnForm } from '../CreateColumnForm/CreateColumnForm';
import { ColumnItem } from '../ColumnItem/ColumnItem';

import { addColumn, removeColumn } from '../../store/column/action';
import { switchTasksOrderInTheSameColumn, switchTasksOrderInTheDifferentColumns } from '../../store/column/action';

export const ColumnList = () => {

  const [title, setTitle] = useState('');
  const [isCreateColumn, setIsCreateColumn] = useState(false);

  const dispatch = useDispatch();

  const columnList = useSelector(state => state.columns.columnList);
  const tasks = useSelector(state => state.tasks.tasks);

  const handleAddColumn = () => {
    if (title) {
      const column = {
        id: nanoid(),
        title,
        taskIds: []
      }

      dispatch(addColumn(column));
      setIsCreateColumn(false);
      setTitle('');
    }
  }

  const handleResetAddingColumn = () => setIsCreateColumn(false);

  const handleDeleteColumnItem = (id) => dispatch(removeColumn(id));

  const handleOnDragEnd = (result) => {

    const { destination, source, draggableId, type } = result;
    
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    const startColumn = columnList[source.droppableId];
    const finishColumn = columnList[destination.droppableId];

    if (type === 'column') {
      console.log(draggableId)
    }


    //   // Object.keys(columnTasks).map(item => {
    //   //   if (columnTasks[item].id === idTask) {
    //   //     task = columnTasks[item];
    //   //   }
    //   //   return false;
    //   // });

    if (startColumn === finishColumn) {
      const newTaskIds = [...startColumn.taskIds];
    
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      dispatch(switchTasksOrderInTheSameColumn(newColumn));
    } else {
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

      dispatch(switchTasksOrderInTheDifferentColumns(newStartColumn, newFinishColumn))
    }       
  }

  return <>
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId={'all-columns'} direction='horizontal' type='column'>
        {(provided) => (
          <div className='columns'
               {...provided.droppableProps}
               ref={provided.innerRef} >
            <ul className='ul_columns'>

              {Object.keys(columnList).length ?
              Object.keys(columnList).map((column, index) => {
                const columnTasks = columnList[column].taskIds.map(taskId => tasks[taskId] );
                
                return <li key={columnList[column].id} className='li_column'>

                  <ColumnItem title={columnList[column].title} 
                              deleteColumn={handleDeleteColumnItem} 
                              columnId={columnList[column].id}
                              columnTasks={columnTasks}
                              index={index} />
                </li>
              } ) : false }       

            </ul>

          {isCreateColumn && <CreateColumnForm value={title} setValue={setTitle} addColumn={handleAddColumn} 
          resetAddingColumn={handleResetAddingColumn} /> }
        
          {!isCreateColumn && <button onClick={() => setIsCreateColumn(true)} className='column_btn'>
            Add column +
          </button>}
          {provided.placeholder}
        </div>        
        )}
      </Droppable>
    </DragDropContext>
  </>
}