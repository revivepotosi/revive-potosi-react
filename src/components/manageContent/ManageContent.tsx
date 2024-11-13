import { Alert, Box, Button } from '@mui/material';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import collections from '../../constants/collections';
import useManageContent from '../../hooks/useManageContent';
import GeneralContainerSkeleton from '../generalContainer/GeneralContainerSkeleton';
import ButtonSkeleton from '../skeleton/ButtonSkeleton';
import CardContainerSkeleton from '../cardContainer/CardContainerSkeleton';
import DragContent from '../dragContent/DragContent';
import { isImageContent, isTextContent } from '../../utils/functions';
import GeneralContainer from '../generalContainer/GeneralContainer';
import manageContentStr from '../../constants/manageContentStr';
import CardContainer from '../cardContainer/CardContainer';

interface Props {
  id?: string;
  type?: string;
  onBack: () => void;
  onAddContent: () => void;
}

const ManageContent = ({
  id,
  type = collections.historicCenter,
  onBack,
  onAddContent,
}: Props) => {
  const { 
    language,
    loading,
    contents,
    handleDragEnd,
    sensors,
    disableChangeButtons,
    onUndoChanges,
    onConfirmChanges,
    onDelete,
  } = useManageContent({id, type, onBack});

  if (loading) return (
    <GeneralContainerSkeleton hasBackButton>
      <>
        <ButtonSkeleton /> 
        <CardContainerSkeleton />
      </>
    </GeneralContainerSkeleton>
  );

  const renderContent = (contents: any[]) => (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={contents}
        strategy={verticalListSortingStrategy}
      >
        {contents.map((content) => (
          <DragContent
            key={content.id}
            id={content.id}
            type={content.type}
            text={isTextContent(content.type) ? content?.text[language.prefix].text : undefined}
            imageSrc={isImageContent(content.type) ? content.image.url : undefined}
            alt={isImageContent(content.type) ? content.alt : undefined}
            onDelete={() => onDelete(content.id)}
          />
        ))}
      </SortableContext>
    </DndContext>
  );

  return (
    <GeneralContainer
      title={manageContentStr[language.prefix].title}
      backButton={{
        title: manageContentStr[language.prefix].backButton,
        onClick: onBack,
      }}
    >
      <>
        <Box sx={{ whiteSpace: 'nowrap', overflow: 'auto' }}>
          <Button variant="contained" onClick={onAddContent} sx={{ marginRight: '0.5rem' }}>
            {manageContentStr[language.prefix].addContent}
          </Button>
          <Button
            variant="contained"
            color="warning"
            disabled={disableChangeButtons}
            onClick={onUndoChanges}
            sx={{ marginRight: '0.5rem' }}
          >
            {manageContentStr[language.prefix].undo}
          </Button>
          <Button
            variant="contained"
            color="success"
            disabled={disableChangeButtons}
            onClick={onConfirmChanges}
            sx={{ marginRight: '0.5rem' }}
          >
            {manageContentStr[language.prefix].confirm}
          </Button>
        </Box>
        <CardContainer sx={{ marginTop: '1rem'}}>
          <>
            {
              !(contents) || (Array.isArray(contents) && contents.length === 0) ?
              (
                <Alert variant="filled" severity="info" sx={{ marginY: '0.5rem' }}>
                  { manageContentStr[language.prefix].emptyMessage }
                </Alert>
              ) :  renderContent(contents)
            }
          </>
        </CardContainer>
      </>
    </GeneralContainer>
  );
};

export default ManageContent;
