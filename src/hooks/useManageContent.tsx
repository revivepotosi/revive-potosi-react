import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import Content from '../interfaces/content';
import { getContent } from '../utils/content/getContent';
import { arrayMove } from '@dnd-kit/sortable';
import { MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import replaceContent from '../utils/content/replaceContent';
import { closeLoader, openLoader } from '../redux/generalSlice';
import { getDeleteTitle } from '../utils/functions';
import manageContentStr from '../constants/manageContentStr';

interface Props {
  id?: string;
  type: string;
  onBack: () => void;
}

const useManageContent = ({ id, type, onBack }: Props) => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language.language);
  const [loading, setLoading] = useState<boolean>(true);
  const [contents, setContents] = useState<Content[]>([]);
  const [initContents, setInitContents] = useState<Content[]>([]);
  const [disableChangeButtons, setDisableChangeButtons] = useState<boolean>(true);

  useEffect(() => {
    const init = async () => {
      const respContents = await getContent(id ?? '', type);
      setContents(respContents);
      setInitContents(respContents);
      setLoading(false);
    };
    init().catch((error) => {
      console.log(error);
      onBack();
    });
  }, []);

  const onUndoChanges = () => {
    const isConfirmed = confirm(manageContentStr[language.prefix].undoConfirmLabel);
    if (!isConfirmed) return;
    setContents(initContents);
    setDisableChangeButtons(true);
  };

  const onConfirmChanges = () => {
    const isConfirmed = confirm(manageContentStr[language.prefix].confirmConfirmLabel);
    if (!isConfirmed) return;
    dispatch(openLoader());
    replaceContent(id ?? '', type, contents)
      .catch((error)  => console.log(error))
      .finally(() => {
        dispatch(closeLoader());
        onBack();
      })
  };

  const onDelete = (id: string) => {
    const isConfirmed = confirm(getDeleteTitle(language.prefix, manageContentStr[language.prefix].deleteConfirmLabel));
    if (!isConfirmed) return;
    if (disableChangeButtons) setDisableChangeButtons(false);
    const newContents = contents.filter((content) => content.id !== id);
    setContents(newContents);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!active.id !== over.id) {
      if (disableChangeButtons) setDisableChangeButtons(false);
      setContents((content) => {
        const oldIndex = content.findIndex((content) => content.id === active.id);
        const newIndex = content.findIndex((content) => content.id === over.id);

        return arrayMove(contents, oldIndex, newIndex);
      });
    }
  };
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
  );

  return {
    language,
    loading,
    contents,
    handleDragEnd,
    sensors,
    disableChangeButtons,
    onUndoChanges,
    onConfirmChanges,
    onDelete,
  };
};

export default useManageContent;
