import useAddContentHistoricCenter from '../hooks/useAddContentHistoricCenter';
import AddContent from '../../../components/addContent/AddContent';
import collections from '../../../constants/collections';
import addContentHistoricCenterStr from '../constants/addContentHistoricCenterStr';

const AddContentHistoricCenter = () => {
  const { id, language, backToManageContentHistoricCenter } = useAddContentHistoricCenter();
  return (
    <AddContent
      id={id}
      type={collections.historicCenter}
      title={addContentHistoricCenterStr[language.prefix].title}
      backButtonTitle={addContentHistoricCenterStr[language.prefix].backButton}
      backButtonOnClick={backToManageContentHistoricCenter}
    /> 
  );
};

export default AddContentHistoricCenter;
