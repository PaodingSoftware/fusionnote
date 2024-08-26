import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';

import Header from './components/Header';
import Content from './components/Content';
import SubmitForm from './components/SubmitForm';
import NoteList from './components/NoteList';
import NoteItem from './components/NoteItem';
import { bindlocalStorageEventListener } from './slices/locationSlice';

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(bindlocalStorageEventListener)
  }, [])

  const displayName = useAppSelector((state) => state.location.displayName)
  const pageIndex = useAppSelector((state) => state.location.pageIndex)

  return (
    <>
      <Header displayName={displayName} pageIndex={pageIndex}></Header>
      <Content>
        <SubmitForm></SubmitForm>
        <NoteList></NoteList>
      </Content>
    </>
  );
}

export default App;