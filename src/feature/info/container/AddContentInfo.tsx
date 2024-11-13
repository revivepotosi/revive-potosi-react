import addContentInfoStr from '../constants/addContentInfoStr';
import useAddContentInfo from '../hooks/useAddContentInfo';
import AddContent from '../../../components/addContent/AddContent';
import collections from '../../../constants/collections';

const AddContentInfo = () => {
  const { language, backToManageContent } = useAddContentInfo();

  return (
    <AddContent
      type={collections.info}
      title={addContentInfoStr[language.prefix].title}
      backButtonTitle={addContentInfoStr[language.prefix].backButton}
      backButtonOnClick={backToManageContent}
    />
  );
};

export default AddContentInfo;
