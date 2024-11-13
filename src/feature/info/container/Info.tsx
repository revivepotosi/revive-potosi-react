import { Alert, Button } from '@mui/material';
import useInfo from '../hooks/useInfo';
import CardContainerSkeleton from '../../../components/cardContainer/CardContainerSkeleton';
import GeneralContainer from '../../../components/generalContainer/GeneralContainer';
import GeneralContainerSkeleton from '../../../components/generalContainer/GeneralContainerSkeleton';
import ButtonSkeleton from '../../../components/skeleton/ButtonSkeleton';
import CardContainer from '../../../components/cardContainer/CardContainer';
import Content from '../../../components/content/Content';
import { isImageContent, isTextContent } from '../../../utils/functions';
import infoStr from '../constants/infoStr';
import { hasInfoContent } from '../utils/functions';

interface Props {
  isAdmin?: boolean;
};

const Info = ({ isAdmin = false }: Props) => {
  const {
    language,
    loading,
    infos,
    goManageContent,
  } = useInfo();

  if (loading) return (
    <GeneralContainerSkeleton>
      <>
        { isAdmin ? ( <ButtonSkeleton /> ) : null }
        <CardContainerSkeleton />
      </>
    </GeneralContainerSkeleton>
  );

  const renderContent = (contents: any[]) => contents.map((content) => (
    <Content
      key={content.id}
      type={content.type}
      text={isTextContent(content.type) ? content?.text[language.prefix].text : undefined}
      imageSrc={isImageContent(content.type) ? content.image.url : undefined}
      alt={isImageContent(content.type) ? content.alt : undefined}
    />
  ));

  return (
    <GeneralContainer
      title={infoStr[language.prefix].title}
    >
      <>
        { isAdmin ? (
          <Button variant="contained" onClick={goManageContent}>
            {infoStr[language.prefix].manageContent}
          </Button>
        ) : null}
        { hasInfoContent(infos) ?
          (
            <CardContainer sx={{ marginTop: '1rem'}}>
              <>
                { renderContent(infos[0].contents ?? []) }
              </>
            </CardContainer>
          ) :
          (
            <Alert variant="filled" severity="info" sx={{ marginTop: '1rem' }}>
              { infoStr[language.prefix].emptyMessage }
            </Alert>
          )
        }
      </>
    </GeneralContainer>
  );
};

export default Info;
